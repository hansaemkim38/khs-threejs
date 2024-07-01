import * as THREE from "three";
import gsap from "gsap";

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
  scene.fog = new THREE.Fog("black", 3, 7);

  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 8;
  camera.position.x = 1;
  camera.position.y = 1;
  scene.add(camera);

  // 위에만 보이게끔 비춰지는 (예 : 태양빛)
  const light = new THREE.DirectionalLight(0xffffff, 20);
  light.position.z = 2;
  light.position.x = 1;
  light.position.y = 1;

  // 무대에 넣어준다.
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });

  // 빛의 영향을 안받는 것
  // const material = new THREE.MeshBasicMaterial({
  //   color: "#ff0000",
  // });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기

  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    // 라디안 값
    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.1;

    //시간차
    // const delta = clock.getDelta();

    // mesh.rotation.y += THREE.MathUtils.degToRad(2);
    mesh.rotation.y += deltaTime * 0.001;
    mesh.position.y += deltaTime * 0.001;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // vr이나 ar 컨텐츠를 만들때 꼭 써야함
  }

  function setSize() {
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  //이벤트
  window.addEventListener("resize", setSize);

  draw();
}
