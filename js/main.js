export function createStargateScene(THREE, OrbitControls, gsap) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);

  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  function createNode(label, position) {
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const node = new THREE.Mesh(geometry, glowMaterial.clone());
    node.position.set(...position);
    scene.add(node);

    const sprite = createLabel(label);
    sprite.position.set(...position.map((v, i) => i === 1 ? v + 1.2 : v));
    scene.add(sprite);

    return node;
  }

  function createLabel(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'cyan';
    ctx.font = '28px monospace';
    ctx.fillText(text, 10, 40);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    return new THREE.Sprite(material);
  }

  const nodes = [
    createNode("TRANSCENDENTALISM", [0, 5, 0]),
    createNode("AXIOMATIC REASONING", [0, 2.5, 0]),
    createNode("FIRST PRINCIPLES THINKING", [0, 0, 0]),
    createNode("SYSTEM-LEVEL ARCHITECTURE", [0, -2.5, 0]),
    createNode("FEEDBACK LOOP", [0, -5, 0])
  ];

  gsap.to(nodes.map(n => n.scale), {
    duration: 2,
    x: 1.3, y: 1.3, z: 1.3,
    yoyo: true,
    repeat: -1,
    stagger: 0.2,
    ease: "sine.inOut"
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
