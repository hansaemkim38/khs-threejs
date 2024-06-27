import * as THREE from "three";

// 동적으로 캔버스 조립하기.
// const renderer = new THREE.WebGLRenderer();
// const rendererDom = renderer.domElement;

// renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(rendererDom);

// document.body.appendChild(rendererDom);

// 직접 canvas로 넣기
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true, // 성능저하가 있을 수 있음.
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

//원근 카메라

// PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
// fov — 카메라 절두체 수직 시야. - 카메라 시야각도
// aspect — 카메라 절두체 종횡비. - 화면 비율
// near — 카메라 절두체 근평면. - 가까이 가면 안보이고
// far — 카메라 절두체 원평면. - 멀리가면 안보이는 설정
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;

// 직교 카메라

// OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
// left — 카메라 절두체 좌평면.
// right — 카메라 절두체 우평면.
// top — 카메라 절두체 상평면.
// bottom — 카메라 절두체 하평면.
// near — 카메라 절두체 근평면.
// far — 카메라 절두체 원평면.

// const camera = new THREE.OrthographicCamera(
//   -(window.innerWidth / window.innerHeight), // left
//   window.innerWidth / window.innerHeight, // right
//   1, // top
//   -1, // bottom
//   0.1,
//   1000
// );

// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 4;

// camera.lookAt(0, 0, 0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
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
