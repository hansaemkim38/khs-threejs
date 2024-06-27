import * as THREE from "three";

// ------ 주제 : 조명

export default function example() {
  // renderer

  const aspectRatio = window.innerWidth / window.innerHeight;
  const canvas = document.querySelector("#three-canvas");
  const pixelDensity = window.devicePixelRatio > 1 ? 2 : 1;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
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
  // scene.background = new THREE.Color("blue");

  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = 2;
  camera.position.x = 2;
  scene.add(camera);

  // 위에만 보이게끔 비춰지는 (예 : 태양빛)
  const light = new THREE.DirectionalLight(0xffffff, 20);
  light.position.z = 2;
  light.position.x = 1;

  // 무대에 넣어준다.
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    // 빛의 영향을 안받는 것
    color: "#ff0000",
  });

  // 빛의 영향을 안받는 것
  // const material = new THREE.MeshBasicMaterial({
  //   color: "#ff0000",
  // });

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
