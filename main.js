import * as THREE from "three";
import * as THREEx from "./node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const arjs = new THREEx.LocationBased(scene, camera);
  const cam = new THREEx.WebcamRenderer(renderer);

  //camera.position.set(0, -3, 6);
  /*  var controls = new OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = Math.PI / 2;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minAzimuthAngle = -(5 / 12) * Math.PI;
  controls.maxAzimuthAngle = (5 / 12) * Math.PI;
  controls.enableZoom = false;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };
  controls.addEventListener("change", renderControls);
  camera.position.set(0, -3, 10);
  controls.target.set(0, -3, 0);
  controls.update(); */
  //camera.position.set(0, 50, 0);
  //camera.up.set(0, 0, 1);
  //camera.lookAt(0, 0, 0);

  // AR

  // Карниз
  const geometry = new THREE.BoxGeometry(10, 0.1, 0.15);

  //контур
  /* const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
scene.add(line); */

  const material = new THREE.MeshPhongMaterial({
    color: 0xffa8a8a8,
    flatShading: true,
    shininess: 100,
    //shading: THREE.FlatShading,
  });
  const cube = new THREE.Mesh(geometry, material);
  arjs.add(cube);

  // ручка
  const geometryCylinder = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 20);
  const materialCylinder = new THREE.MeshPhongMaterial({
    color: 0xffa8a8a8,
    shininess: 100,
  });
  const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
  //cylinder.position.set(-4.7, -5, 0);
  arjs.add(cylinder, -4.7, -5);

  // нитка к ручке
  const geometryLine = new THREE.CylinderGeometry(0.01, 0.01, 4.3, 6);
  const materialLine = new THREE.MeshPhongMaterial({
    color: 0xffa8a8a8,
    shininess: 100,
  });
  const line = new THREE.Mesh(geometryLine, materialLine);
  //line.position.set(-4.7, -2.1, 0);
  arjs.add(line, -4.7, -2.1);

  //фиксатор полотна
  const geometryFix = new THREE.BoxGeometry(8.52, 0.15, 0.1);

  const fix1 = new THREE.Mesh(geometryFix, material);
  //fix1.position.set(-0.1, -3.05, 0);
  arjs.add(fix1, -0.1, -3.05);
  const fix2 = new THREE.Mesh(geometryFix, material);
  //fix2.position.set(-0.1, -5.19, 0);
  arjs.add(fix2, -0.1, -5.19);

  // полотно
  const geometryPanel = new THREE.BoxGeometry(8.5, 2, 0.01);
  const materialPanel = new THREE.MeshPhongMaterial({
    color: 0xffdfdfdf,
    flatShading: true,
    shininess: 100,
  });
  const panel = new THREE.Mesh(geometryPanel, materialPanel);
  //panel.position.set(-0.1, -4.12, 0);
  arjs.add(panel, -0.1, -4.12);

  //нитка к полотну
  const geometryLinePanel = new THREE.CylinderGeometry(0.01, 0.01, 2.9, 6);
  const linePanel1 = new THREE.Mesh(geometryLinePanel, materialLine);
  //linePanel1.position.set(-3.7, -1.45, 0);
  arjs.add(linePanel1, -3.7, -1.45);
  const linePanel2 = new THREE.Mesh(geometryLinePanel, materialLine);
  //linePanel2.position.set(3.4, -1.45, 0);
  arjs.add(linePanel2, 3.4, -1.45);

  //крепление к полотну
  const geometryCP = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 20);
  const materialCP = new THREE.MeshPhongMaterial({
    color: 0xffa8a8a8,
    shininess: 100,
  });
  const cp1 = new THREE.Mesh(geometryCP, materialCP);
  //cp1.position.set(-3.7, -2.95, 0);
  arjs.add(cp1, -3.7, -2.95);
  const cp2 = new THREE.Mesh(geometryCP, materialCP);
  //cp2.position.set(3.4, -2.95, 0);
  arjs.add(cp2, 3.4, -2.95);

  //свет
  const light = new THREE.DirectionalLight(0xffffff, 1);
  //light.position.set(-10, 5, 7);
  //light.target.position.set(-5.5, 1, 0);
  arjs.add(light, -10, 5);
  arjs.add(light.target, -5.5, 1);

  const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
  //light2.position.set(-2, 0, 6);
  //light2.target.position.set(-5.5, 10, -8);
  arjs.add(light2, -2, 0);
  arjs.add(light2.target, -5.5, 10);
  /* const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 0, 0);
scene.add(light); */

  arjs.fakeGps(0, 10);
  requestAnimationFrame(render);

  function render() {
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    /* controls.update();
  renderer.render(scene, camera); */
  }

  function renderControls() {
    renderer.render(scene, camera);
  }
}

main();
