let items = document.querySelectorAll('.slider .list .item');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let lastPosition = items.length - 1;
let firstPosition = 0;
let active = 0;
let interval;

// 🔹 Function: Next Slide Button Click
nextBtn.onclick = () => {
    active = active + 1;
    setSlider();
    resetAutoSlide();
}

// 🔹 Function: Previous Slide Button Click
prevBtn.onclick = () => {
    active = active - 1;
    setSlider();
    resetAutoSlide();
}

// 🔹 Function: Set Active Slide
const setSlider = () => {
    let oldActive = document.querySelector('.slider .list .item.active');
    if(oldActive) oldActive.classList.remove('active');
    items[active].classList.add('active');

    // 🔸 Next/Prev Button Visibility
    nextBtn.classList.remove('d-none');
    prevBtn.classList.remove('d-none');
    if(active == lastPosition) nextBtn.classList.add('d-none');
    if(active == firstPosition) prevBtn.classList.add('d-none');
}

// 🔹 Function: Set Diameter (For Responsive View)
const setDiameter = () => {
    let slider = document.querySelector('.slider');
    let widthSlider = slider.offsetWidth;
    let heightSlider = slider.offsetHeight;
    let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
    document.documentElement.style.setProperty('--diameter', diameter+'px');
}

// 🔹 Function: Automatic Slide Change (Every 4 Sec)
const startAutoSlide = () => {
    interval = setInterval(() => {
        active = (active + 1) % items.length;
        setSlider();
    }, 5000); // 4 seconds
}

// 🔹 Function: Reset Auto Slide When Manually Clicked
const resetAutoSlide = () => {
    clearInterval(interval);
    startAutoSlide();
}

// Initial Setup
setSlider();
setDiameter();
startAutoSlide();

// 🔹 Window Resize Event (For Diameter Adjustment)
window.addEventListener('resize', () => {
    setDiameter();
});




  
  // Ensure Three.js, GLTFLoader, and GSAP are loaded before this script runs
  
  import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
  import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
  import { gsap } from 'https://cdn.skypack.dev/gsap';
  
  // Ensure Three.js, GLTFLoader, and GSAP are loaded before this script runs
  
  // Camera setup based on screen size
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  // Responsive Camera Position
  const updateCameraPosition = () => {
    if (window.innerWidth < 480) {      
      camera.position.set(5, 5, 30);  
    } else if (window.innerWidth < 768) {  
      camera.position.set(5, 5, 25);
    } else if (window.innerWidth < 1024) {  
      camera.position.set(0, 5, 22);
    } else {  
      camera.position.set(0, 5, 20);
    }
  };
  updateCameraPosition(); // Set initial camera position
  
  const scene = new THREE.Scene();
  let airplane, mixer;
  const loader = new GLTFLoader();
  
  // Load the 3D Model
  loader.load('/models/helicopter.glb', function (gltf) {
    airplane = gltf.scene;
  
    // Set model scale and position based on device width
    const setModelProperties = () => {
      if (window.innerWidth < 480) {
        airplane.scale.set(0.4, 0.4, 0.4);
        airplane.position.set(-2, 1, 0);
      } else if (window.innerWidth < 768) {
        airplane.scale.set(0.3, 0.3, 0.3);
        airplane.position.set(-4, 1, 0);
      } else if (window.innerWidth < 1024) {
        airplane.scale.set(0.4, 0.4, 0.4);
        airplane.position.set(-10, 10, 0);
      } else {
        airplane.scale.set(0.4, 0.4, 0.4);
        airplane.position.set(-25, 20, 0);
      }
      airplane.rotation.set(0, Math.PI / 2, 0);
    };
  
    setModelProperties();
    scene.add(airplane);
  
    // If the model has animations, play them
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(airplane);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }
  
    // Trigger the initial scroll animation
    modelMove();
  });
  
  // Create and configure the renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container3D').appendChild(renderer.domElement);
  
  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);
  
  // Rendering loop
  const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) {
      mixer.update(0.02);
    }
  };
  reRender3D();
  
  // Define scroll animation positions for different screen sizes
  const arrPositionModelDesktop = [
    { id: 'banner', position: { x: 0.7, y: 8.8, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
    { id: 'intro', position: { x: -35, y: 20, z: 0 }, rotation: { x: 0.1, y: Math.PI / 4, z: 0 } },
    //{ id: 'description', position: {x: -35, y: 20, z: 0 }, rotation: { x: 0, y: -Math.PI / 4, z: 0 } },
    //{ id: 'safari', position: {x: -35, y: 20, z: 0 }, rotation: { x: 0, y: Math.PI / 4, z: 0 } },
   //{ id: 'review', position: {x: -35, y: 20, z: 0 }, rotation: { x: 0, y: Math.PI / 4, z: 0 } },
    { id: 'footer', position: { x: 10, y : -1, z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
  ];
  
  const arrPositionModelMobile = [
    { id: 'banner', position: { x: 5, y: 11.3 , z: 0 }, rotation: { x: 0, y: Math.PI / 2, z: 0 } },
   { id: 'intro', position: { x: 25, y: -1, z: -4.5 }, rotation: { x: 0.1, y: Math.PI / 14, z: 0 } },
    { id: 'footer', position: { x: 2, y: -9, z: -6 }, rotation: { x: 0, y: Math.PI / -2, z: 0 } },
  ];
  
  // Choose correct model positions based on screen size
  let arrPositionModel = window.innerWidth < 768 ? arrPositionModelMobile : arrPositionModelDesktop;
     
  // Scroll animation function
  const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
  
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 3) {
        currentSection = section.id;
      }
    });
  
    const positionActive = arrPositionModel.findIndex(val => val.id === currentSection);
    if (positionActive >= 0 && airplane) {
      const newCoordinates = arrPositionModel[positionActive];
  
      gsap.to(airplane.position, {
        x: newCoordinates.position.x,
        y: newCoordinates.position.y,
        z: newCoordinates.position.z,
        duration: 5,
        ease: "power1.out"
      });
  
      gsap.to(airplane.rotation, {
        x: newCoordinates.rotation.x,
        y: newCoordinates.rotation.y,
        z: newCoordinates.rotation.z,
        duration: 5,
        ease: "power1.out"
      });
    }
  };
  
  // Event listeners for scroll and resize
  window.addEventListener('scroll', () => {
    if (airplane) {
      modelMove();
    }
  });
  
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
  
    // Update camera position on resize
    updateCameraPosition();
  
    camera.updateProjectionMatrix();
  
    // Update model properties if it's already loaded
    if (airplane) {
      airplane.scale.set(0.7, 0.7, 0.7);
    }
  
    // Recalculate the scroll animation positions
    arrPositionModel = window.innerWidth < 768 ? arrPositionModelMobile : arrPositionModelDesktop;
  });
  

