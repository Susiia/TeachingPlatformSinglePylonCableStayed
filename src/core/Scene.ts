import { Scene, WebGLRenderer, PerspectiveCamera, FogExp2, ACESFilmicToneMapping } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneManager {
  public scene: Scene;
  public camera: PerspectiveCamera;
  public renderer: WebGLRenderer;
  public controls: OrbitControls;

  constructor() {
    // 创建场景
    this.scene = new Scene();
    this.scene.fog = new FogExp2(0xa3adb7, 0.002);

    // 创建渲染器
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    document.body.appendChild(this.renderer.domElement);

    // 创建相机
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      5,
      5000
    );
    this.camera.position.set(50, 50, 50);

    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.setupControls();

    // 添加窗口大小变化监听
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private setupControls(): void {
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.rotateSpeed = 0.5;
    this.controls.zoomSpeed = 1.2;
    this.controls.minDistance = 0.1;
    this.controls.maxDistance = 100;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.1;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public update(): void {
    this.controls.update();
  }
} 