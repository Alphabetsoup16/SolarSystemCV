import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 20, 20);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(250).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/Space.jpg');
scene.background = spaceTexture;


//earth
const earthTexture = new THREE.TextureLoader().load('/earth.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry( 4, 32, 32 ),
  new THREE.MeshBasicMaterial( {map: earthTexture} )

);
scene.add(earth);

// Mars
const marsTexture = new THREE.TextureLoader().load('/mars.jpg')
const marsNormalTexture = new THREE.TextureLoader().load('/mars_normal.jpg')

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32 ),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormalTexture
  })
);
scene.add(mars);

// Moon
const moonTexture = new THREE.TextureLoader().load('/moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry( 1, 32, 32 ),
  new THREE.MeshBasicMaterial( {map: moonTexture} )

);
scene.add(moon);

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('/jupiter.jpg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry( 10, 32, 32 ),
  new THREE.MeshBasicMaterial( {map: jupiterTexture} )

);
scene.add(jupiter);

jupiter.position.z = 40;
jupiter.position.setX(-60);

moon.position.z = -20;
moon.position.setX(20);

mars.position.z = 10; 
mars.position.setX(-25);

earth.position.z = -8;
earth.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // mars.rotation.x += 0.05;
  mars.rotation.y += 0.025;
  // mars.rotation.z += 0.05;

  moon.rotation.y += 0.03;

  earth.rotation.y += 0.01;
  // earth.rotation.z += 0.01;

  camera.position.z = t * -0.008;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}
document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  // space to animate objects
  
  // controls.update();
  renderer.render(scene, camera);
}
animate();