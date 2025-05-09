// 导入依赖
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  PerspectiveCamera,
  DirectionalLight,
  Vector2,
  WebGLRenderer,
  Scene,
  TextureLoader,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  MeshStandardMaterial,
  FogExp2
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SSAOPass } from "three/addons/postprocessing/SSAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { Mesh } from "three";


// 创建场景
const scene = new Scene();
// 添加雾，颜色为白色，近裁剪面为 10，远裁剪面为 1000，可根据实际需求调整参数
scene.fog = new FogExp2(0xA3ADB7, 0.002);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建相机
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  5000
);
camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;

// 创建相机控制器
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

// 添加天光
// const _AmbientLight = new AmbientLight(0xffffff, 1);
// scene.add(_AmbientLight);
// 添加太阳光
const _DirectionalLight = new DirectionalLight(0xffffff, 5);
_DirectionalLight.position.set(300, 100, 0);
scene.add(_DirectionalLight);
// 可视化位置
// const _DirectionalLightHelper = new THREE.DirectionalLightHelper(_DirectionalLight, 5);
// scene.add(_DirectionalLightHelper);

// 设置背景图
const _TextureLoader = new TextureLoader();
const texture = _TextureLoader.load("/public/Textures/SkyBox.jpg", () => {
  texture.mapping = EquirectangularReflectionMapping;
  texture.colorSpace = SRGBColorSpace;
  scene.background = texture;
  scene.environment = texture;
  scene.environmentIntensity = 1.5;
});

// 声明海洋材质
let oceanMaterial: MeshStandardMaterial | undefined;

// 导入模型
const _GLTFLoader = new GLTFLoader();
_GLTFLoader.load(
  "/public/Models/TeachingPlatformSinglePylonCableStayedModel.glb",
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child instanceof Mesh && child.material.name === "Ocean") {
        oceanMaterial = child.material;
      }
    });
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 循环
renderer.setAnimationLoop(update);

// 创建后期处理合成器
const composer = new EffectComposer(renderer);

// 创建渲染通道
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 创建 SSAO 通道
const ssaoPass = new SSAOPass(
  scene,
  camera,
  window.innerWidth,
  window.innerHeight
);
ssaoPass.kernelRadius = 16;
composer.addPass(ssaoPass);

// 创建虚幻辉光通道
const bloomPass = new UnrealBloomPass(
  new Vector2(window.innerWidth, window.innerHeight),
  0.2,
  0.4,
  0.8
);
composer.addPass(bloomPass);

// 创建 FXAA 通道
const fxaaPass = new ShaderPass(FXAAShader);
const pixelRatio = renderer.getPixelRatio();
fxaaPass.material.uniforms["resolution"].value.x =
  1 / (window.innerWidth * pixelRatio);
fxaaPass.material.uniforms["resolution"].value.y =
  1 / (window.innerHeight * pixelRatio);
composer.addPass(fxaaPass);

// 创建输出通道
const outputPass = new OutputPass();
composer.addPass(outputPass);

// 更新函数
function update() {
  controls.update();
  // renderer.render(scene, camera);
  composer.render();
  // 检查海洋材质是否存在
  if (oceanMaterial) {
    // 更新纹理偏移量
    const { map, normalMap } = oceanMaterial;
    map && (map.offset.y -= 0.0001);
    normalMap && (normalMap.offset.y += 0.0001);
  }
}
