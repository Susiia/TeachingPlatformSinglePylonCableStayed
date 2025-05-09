/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-09 14:35:54
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-09 14:36:52
 */
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { SSAOPass } from "three/addons/postprocessing/SSAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { Scene, Camera, WebGLRenderer, Vector2 } from "three";

// 设置后期处理
export function setupPostProcessing(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
  const composer = new EffectComposer(renderer);

  // 添加渲染通道
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 添加 SSAO 通道
  const ssaoPass = new SSAOPass(
    scene,
    camera,
    window.innerWidth,
    window.innerHeight
  );
  ssaoPass.kernelRadius = 16;
  composer.addPass(ssaoPass);

  // 添加虚幻辉光通道
  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    0.2,
    0.4,
    0.8
  );
  composer.addPass(bloomPass);

  // 添加 FXAA 通道
  const fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (window.innerWidth * pixelRatio);
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (window.innerHeight * pixelRatio);
  composer.addPass(fxaaPass);

  // 添加输出通道
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  return composer;
}