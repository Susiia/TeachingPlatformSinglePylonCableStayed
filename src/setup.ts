/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-09 14:35:54
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-09 14:36:52
 */
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  FogExp2,
  ACESFilmicToneMapping
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 初始化场景、渲染器、相机和控制器
export function setup() {
  // 创建场景并添加雾效
  const scene = new Scene();
  scene.fog = new FogExp2(0xa3adb7, 0.002);

  // 创建渲染器并设置相关属性
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => {});
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  document.body.appendChild(renderer.domElement);

  // 创建相机并设置位置
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.5,
    5000
  );
  camera.position.x = 50;
  camera.position.y = 50;
  camera.position.z = 50;

  // 创建相机控制器并设置属性
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.rotateSpeed = 0.5;
  controls.zoomSpeed = 1.2;
  controls.minDistance = 0.1;
  controls.maxDistance = 100;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.1;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enableDamping = true;

  return { scene, renderer, camera, controls };
}