import { DirectionalLight, Scene } from "three";

// 设置场景灯光
export function setupLights(scene: Scene) {
  const _DirectionalLight = new DirectionalLight(0xffffff, 5);
  _DirectionalLight.position.set(300, 100, 0);
  scene.add(_DirectionalLight);
}