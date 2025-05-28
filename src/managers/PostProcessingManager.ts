/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2025-05-28 12:01:29
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2025-05-28 12:01:53
 */
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { Scene, Camera, WebGLRenderer, Vector2 } from 'three';

export class PostProcessingManager {
  private composer!: EffectComposer;
  private scene: Scene;
  private camera: Camera;
  private renderer: WebGLRenderer;

  constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.setupPostProcessing();
  }

  private setupPostProcessing(): void {
    // 创建后期处理合成器
    this.composer = new EffectComposer(this.renderer);

    // 创建渲染通道
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 创建 SSAO 通道
    const ssaoPass = new SSAOPass(
      this.scene,
      this.camera,
      window.innerWidth,
      window.innerHeight
    );
    ssaoPass.kernelRadius = 16;
    this.composer.addPass(ssaoPass);

    // 创建虚幻辉光通道
    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      0.2,
      0.4,
      0.8
    );
    this.composer.addPass(bloomPass);

    // 创建 FXAA 通道
    const fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = this.renderer.getPixelRatio();
    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (window.innerWidth * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (window.innerHeight * pixelRatio);
    this.composer.addPass(fxaaPass);

    // 创建输出通道
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
  }

  public render(): void {
    this.composer.render();
  }
} 