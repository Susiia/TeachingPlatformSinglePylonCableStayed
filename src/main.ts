import { SceneManager } from './core/Scene';
import { LightManager } from './managers/LightManager';
import { PostProcessingManager } from './managers/PostProcessingManager';
import { ResourceManager } from './managers/ResourceManager';

class Application {
  private sceneManager: SceneManager;
  private lightManager: LightManager;
  private postProcessingManager: PostProcessingManager;
  private resourceManager: ResourceManager;

  constructor() {
    // 初始化场景管理器
    this.sceneManager = new SceneManager();
    
    // 初始化光照管理器
    this.lightManager = new LightManager(this.sceneManager.scene);
    
    // 初始化后期处理管理器
    this.postProcessingManager = new PostProcessingManager(
      this.sceneManager.scene,
      this.sceneManager.camera,
      this.sceneManager.renderer
    );
    
    // 初始化资源管理器
    this.resourceManager = new ResourceManager(this.sceneManager.scene);
    
    // 加载资源
    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.resourceManager.loadResources();
      this.animate();
    } catch (error) {
      console.error('Failed to initialize application:', error);
    }
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    
    // 更新场景
    this.sceneManager.update();
    
    // 更新光照
    this.lightManager.update();
    
    // 更新资源
    this.resourceManager.update();
    
    // 渲染场景
    this.postProcessingManager.render();
  }
}

// 启动应用
new Application();
