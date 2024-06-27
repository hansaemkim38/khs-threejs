import * as THREE from "three";

// ------ 주제 : 배경색 세팅

export default function example() {
  // renderer

  const aspectRatio = window.innerWidth / window.innerHeight;
  const canvas = document.querySelector("#three-canvas");
  const pixelDensity = window.devicePixelRatio > 1 ? 2 : 1;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelDensity); // 고밀도 처리
  // renderer.setClearAlpha(0.3);
  // renderer.setClearColor(0x00ff00);
  // renderer.setClearColor("#00ff00");
  // renderer.setClearAlpha(0.5);

  // renderer는 아래 깔려 있고 scene이 덧칠 했다.

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue");

  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = 2;
  camera.position.x = 1;

  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener("resize", setSize);
}
