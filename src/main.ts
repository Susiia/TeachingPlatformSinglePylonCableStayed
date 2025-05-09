// 导入各模块功能函数
import { setup } from "./setup";
import { setupLights } from "./lights";
import { setupEnvironment } from "./environment";
import { loadModel } from "./loadModel";
import { setupPostProcessing } from "./postProcessing";
import { createUpdateFunction } from "./update";

// 初始化场景、渲染器、相机和控制器
const { scene, renderer, camera, controls } = setup();
// 设置场景灯光
setupLights(scene);
// 设置环境并获取海洋相关对象
const { water, oceanMaterial: envOceanMaterial } = setupEnvironment(scene);
// 加载模型并获取海洋材质
const oceanMaterial = loadModel(scene) || envOceanMaterial;
// 设置后期处理
const composer = setupPostProcessing(scene, camera, renderer);
// 创建更新函数
const update = createUpdateFunction(controls, composer, oceanMaterial, water);

// 设置渲染循环
renderer.setAnimationLoop(update);
// 将渲染器 DOM 元素添加到页面
document.body.appendChild(renderer.domElement);
