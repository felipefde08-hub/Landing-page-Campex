import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const root = document.querySelector('[data-machine-view]');
const viewer = document.querySelector('[data-machine-viewer]');
const canvas = document.querySelector('[data-machine-canvas]');

if (root && viewer && canvas) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const modelPath = './campex-landing/assets/section-3d/real_time_simulation_robot_machine.glb';

  // Model attribution required:
  // Model: Real time Simulation, Robot Machine
  // Creator: Beutler Engineering
  // License: Creative Commons Attribution
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.AmbientLight(0xffffff, 0.42));

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.55);
  rimLight.position.set(-5, 2, -3);
  scene.add(rimLight);

  const modelRoot = new THREE.Group();
  scene.add(modelRoot);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  // Zoom is only enabled while a touch gesture is active (pinch). Mouse wheel / trackpad
  // never reach OrbitControls' zoom, so the landing scroll is never trapped.
  controls.enableZoom = false;
  controls.zoomToCursor = false;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0;
  controls.minPolarAngle = Math.PI * 0.22;
  controls.maxPolarAngle = Math.PI * 0.62;

  // OrbitControls forces touch-action: none on the canvas; restore vertical page scroll.
  canvas.style.touchAction = 'pan-y';

  const AUTO_ROTATE_SPEED = 0.38;
  const MODEL_SIZE = 4;
  let frameId = 0;
  let baseDistance = 7;
  let boundingRadius = MODEL_SIZE / 2;
  let isVisible = false;
  let isReady = false;
  const activeTouches = new Set();
  let interactionTimer = 0;
  let resizeObserver;

  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x11110f,
    roughness: 0.72,
    metalness: 0.18,
    envMapIntensity: 0,
    // Push the solid slightly back so the edge lines don't z-fight with the faces.
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xd8d6ce,
    transparent: true,
    opacity: 0.34,
    depthTest: true,
  });

  const markInteraction = () => {
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0;
    window.clearTimeout(interactionTimer);
  };

  const scheduleAutoRotate = () => {
    window.clearTimeout(interactionTimer);
    if (reducedMotion) return;
    interactionTimer = window.setTimeout(() => {
      controls.autoRotate = true;
    }, 3600);
  };

  const zoomTo = (multiplier) => {
    markInteraction();
    const direction = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    const currentDistance = camera.position.distanceTo(controls.target);
    const nextDistance = THREE.MathUtils.clamp(currentDistance * multiplier, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).addScaledVector(direction, nextDistance);
    controls.update();
    scheduleAutoRotate();
  };

  viewer.querySelector('[data-machine-zoom="in"]')?.addEventListener('click', () => zoomTo(0.82));
  viewer.querySelector('[data-machine-zoom="out"]')?.addEventListener('click', () => zoomTo(1.18));

  controls.addEventListener('start', markInteraction);
  controls.addEventListener('end', scheduleAutoRotate);

  // Pinch zoom: enable zoom only while touch pointers are down (capture phase runs
  // before OrbitControls' own pointerdown handler on the canvas).
  const releaseTouch = (event) => {
    if (event.pointerType !== 'touch') return;
    activeTouches.delete(event.pointerId);
    if (activeTouches.size === 0) controls.enableZoom = false;
  };
  viewer.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return;
    activeTouches.add(event.pointerId);
    controls.enableZoom = true;
  }, { capture: true });
  viewer.addEventListener('pointerup', releaseTouch, { capture: true });
  viewer.addEventListener('pointercancel', releaseTouch, { capture: true });

  // Distance that fits the model's bounding sphere in both the vertical and horizontal FOV.
  const computeFitDistance = () => {
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    return (boundingRadius / Math.sin(Math.min(vFov, hFov) / 2)) * 0.72;
  };

  const updateDistanceLimits = () => {
    const previousBase = baseDistance;
    baseDistance = computeFitDistance();
    controls.minDistance = baseDistance * 0.6;
    controls.maxDistance = baseDistance * 1.5;
    camera.near = Math.max(baseDistance / 100, 0.01);
    camera.far = baseDistance * 12;
    camera.updateProjectionMatrix();

    if (isReady && previousBase > 0) {
      const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
      const distance = THREE.MathUtils.clamp(
        offset.length() * (baseDistance / previousBase),
        controls.minDistance,
        controls.maxDistance
      );
      camera.position.copy(controls.target).addScaledVector(offset.normalize(), distance);
    }
  };

  const fitCameraToObject = (object) => {
    // Normalize scale so the largest dimension is MODEL_SIZE, then center on the origin.
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    object.scale.multiplyScalar(MODEL_SIZE / maxDim);
    object.updateMatrixWorld(true);

    box.setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    object.updateMatrixWorld(true);

    box.setFromObject(object);
    boundingRadius = box.getBoundingSphere(new THREE.Sphere()).radius;

    controls.target.set(0, 0, 0);
    updateDistanceLimits();
    const direction = new THREE.Vector3(0.62, 0.34, 1).normalize();
    camera.position.copy(direction.multiplyScalar(baseDistance));
    camera.lookAt(controls.target);
    controls.update();
  };

  const addTechnicalEdges = (object) => {
    object.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      child.material = solidMaterial;
      child.castShadow = false;
      child.receiveShadow = false;

      // Threshold of 30° keeps hard mechanical edges and skips smooth-surface triangulation.
      const edges = new THREE.EdgesGeometry(child.geometry, 30);
      const lines = new THREE.LineSegments(edges, edgeMaterial);
      lines.name = 'campex-technical-edges';
      lines.renderOrder = 2;
      child.add(lines);
    });
  };

  // clientWidth/Height ignore the reveal-scale transform applied by main.js.
  const resize = () => {
    const safeWidth = Math.max(1, viewer.clientWidth);
    const safeHeight = Math.max(1, viewer.clientHeight);
    renderer.setSize(safeWidth, safeHeight, false);
    camera.aspect = safeWidth / safeHeight;
    updateDistanceLimits();
    if (isReady && !frameId) renderer.render(scene, camera);
  };

  const render = () => {
    // Ease autoRotate back in instead of snapping to full speed.
    const targetSpeed = controls.autoRotate ? AUTO_ROTATE_SPEED : 0;
    controls.autoRotateSpeed += (targetSpeed - controls.autoRotateSpeed) * 0.02;
    controls.update();
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(render);
  };

  const start = () => {
    if (!isReady || !isVisible || frameId) return;
    frameId = window.requestAnimationFrame(render);
  };

  const stop = () => {
    window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  // Only render while the section is on screen.
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) start();
    else stop();
  }, { rootMargin: '120px 0px' });
  visibilityObserver.observe(viewer);

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      addTechnicalEdges(model);
      modelRoot.add(model);
      resize();
      fitCameraToObject(model);
      isReady = true;
      renderer.render(scene, camera);
      start();
      root.dataset.viewerReady = 'true';
      window.campexMachineViewerReady = true;
    },
    undefined,
    (error) => {
      root.dataset.viewerReady = 'false';
      console.error('Campex machine viewer failed to load GLB:', error);
    }
  );

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewer);
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('pagehide', () => {
    stop();
    visibilityObserver.disconnect();
    resizeObserver?.disconnect();
    renderer.dispose();
  }, { once: true });
}
