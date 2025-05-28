import { DirectionalLight, Scene } from 'three';

export class LightManager {
  private scene: Scene;
  private directionalLight: DirectionalLight = new DirectionalLight(0xffffff, 5);

  constructor(scene: Scene) {
    this.scene = scene;
    this.setupLights();
  }

  private setupLights(): void {
    // 添加太阳光
    this.directionalLight.position.set(300, 100, 0);
    this.scene.add(this.directionalLight);
  }

  public update(): void {
    // 可以在这里添加光照动画或更新逻辑
  }
} 