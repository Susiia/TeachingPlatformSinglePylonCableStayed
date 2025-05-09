/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-09 14:35:54
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-09 14:36:52
 */
import {
  TextureLoader,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  RepeatWrapping,
  PlaneGeometry,
  Vector3,
  Scene,
  MeshStandardMaterial
} from "three";
import { Water } from "three/addons/objects/Water.js";

// 设置场景环境，包括背景和海洋
export function setupEnvironment(scene: Scene) {
  // 加载天空盒纹理并设置场景背景和环境
  const _TextureLoader = new TextureLoader();
  const texture = _TextureLoader.load("/public/Textures/SkyBox.jpg", () => {
    texture.mapping = EquirectangularReflectionMapping;
    texture.colorSpace = SRGBColorSpace;
    scene.background = texture;
    scene.environment = texture;
    scene.environmentIntensity = 1.5;
  });

  // 创建海洋几何体和对象并添加到场景
  const waterGeometry = new PlaneGeometry(10000, 10000);
  let water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new TextureLoader().load(
      "/public/Textures/waternormals.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
      }
    ),
    sunDirection: new Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x19386b,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  let oceanMaterial: MeshStandardMaterial | undefined;

  return { water, oceanMaterial };
}