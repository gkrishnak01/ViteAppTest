import * as THREE from 'three';

export const initThreeScene = (canvas: HTMLCanvasElement) => {
  // Get canvas dimensions
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Create scene
  const scene = new THREE.Scene();
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Create particle system for stars
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Create particle material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x3a86ff,
    transparent: true,
  });
  
  // Create particle system
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  // Handle window resize
  const handleResize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  window.addEventListener('resize', handleResize);
  
  // Animation loop
  let animationFrameId: number;
  
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Cleanup function to remove event listeners and cancel animation
  const cleanup = () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
    scene.remove(particlesMesh);
    particlesGeometry.dispose();
    particlesMaterial.dispose();
  };
  
  return cleanup;
};
