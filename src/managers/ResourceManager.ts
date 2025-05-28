import { TextureLoader, EquirectangularReflectionMapping, SRGBColorSpace, MeshStandardMaterial, Mesh, Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ResourceManager {
  private scene: Scene;
  private textureLoader: TextureLoader;
  private gltfLoader: GLTFLoader;
  private oceanMaterial?: MeshStandardMaterial;

  constructor(scene: Scene) {
    this.scene = scene;
    this.textureLoader = new TextureLoader();
    this.gltfLoader = new GLTFLoader();
  }

  public async loadResources(): Promise<void> {
    await Promise.all([
      this.loadSkybox(),
      this.loadModel()
    ]);
  }

  private loadSkybox(): Promise<void> {
    return new Promise((resolve) => {
      const texture = this.textureLoader.load("/Textures/SkyBox.jpg", () => {
        texture.mapping = EquirectangularReflectionMapping;
        texture.colorSpace = SRGBColorSpace;
        this.scene.background = texture;
        this.scene.environment = texture;
        this.scene.environmentIntensity = 1.5;
        resolve();
      });
    });
  }

  private loadModel(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        "/Models/TeachingPlatformSinglePylonCableStayedModel.glb",
        (gltf) => {
          gltf.scene.traverse((child) => {
            if (child instanceof Mesh && child.material.name === "Ocean") {
              this.oceanMaterial = child.material;
            }
          });
          this.scene.add(gltf.scene);
          resolve();
        },
        undefined,
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  public update(): void {
    if (this.oceanMaterial) {
      const { map, normalMap } = this.oceanMaterial;
      map && (map.offset.y -= 0.0005);
      normalMap && (normalMap.offset.y += 0.0005);
    }
  }
} 