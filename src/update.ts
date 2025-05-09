/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-09 14:35:54
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-09 14:42:42
 */
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { MeshStandardMaterial } from "three";

// 创建更新函数
export function createUpdateFunction(controls: OrbitControls, composer: EffectComposer, oceanMaterial: MeshStandardMaterial | undefined, water: any) {
  return function update() {
    // 更新相机控制器
    controls.update();
    // 执行后期处理渲染
    composer.render();
    // 更新海洋材质纹理偏移
    if (oceanMaterial) {
      const { map, normalMap } = oceanMaterial;
      map && (map.offset.y -= 0.0001);
      normalMap && (normalMap.offset.y += 0.0001);
    }
    // 更新海洋时间参数
    if (water) {
      water.material.uniforms["time"].value += 1.0 / 60.0;
    }
  };
}