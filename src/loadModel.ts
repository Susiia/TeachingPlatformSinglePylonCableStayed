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
  // 修改加载路径以加载 GLTF 模型，并添加加载进度回调
  _GLTFLoader.load(
    "/public/Models/GLTF/TeachingPlatformSinglePylonCableStayedModel.gltf",
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
    (xhr) => {
      if (xhr.lengthComputable) {
        const progress = (xhr.loaded / xhr.total) * 100;
        console.log(`模型加载进度: ${progress.toFixed(2)}%`);
      } else {
        console.log(`模型正在加载中，请稍候... 已加载 ${xhr.loaded} 字节`);
      }
    },
    (error) => {
      console.error(error);
    }
  );
  return oceanMaterial;
}