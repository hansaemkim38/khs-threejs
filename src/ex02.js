import * as THREE from "three";

// ------ 주제 : 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  // renderer

  const aspectRatio = window.innerWidth / window.innerHeight;
  const canvas = document.querySelector("#three-canvas");
  const pixelDensity = window.devicePixelRatio > 1 ? 2 : 1;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 성능저하가 있을 수 있음.
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelDensity); // 고밀도 처리

  const scene = new THREE.Scene();

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
