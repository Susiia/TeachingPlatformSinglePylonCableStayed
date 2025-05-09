/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-09 14:35:54
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-09 14:36:52
 */
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Mesh, Scene, MeshStandardMaterial } from "three";

// 加载模型并尝试获取名为 "Ocean" 的材质
export function loadModel(scene: Scene) {
  let oceanMaterial: MeshStandardMaterial | undefined;
  const _GLTFLoader = new GLTFLoader();
  // 加载 GLB 模型
  _GLTFLoader.load(
    "/public/Models/TeachingPlatformSinglePylonCableStayedModel.glb",
    (gltf) => {
      // 遍历模型子对象
      gltf.scene.traverse((child) => {
        // 查找名为 "Ocean" 的材质
        if (child instanceof Mesh && child.material.name === "Ocean") {
          oceanMaterial = child.material;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
  return oceanMaterial;
}