import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// --- Scene setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;
document.body.appendChild(renderer.domElement);

// --- Lighting ---
// --- Lighting ---
const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

const key = new THREE.DirectionalLight(0xffffff, 3.0);
key.position.set(5, 8, 5);
key.castShadow = true;
scene.add(key);

const fill = new THREE.DirectionalLight(0x8899ff, 1.2);
fill.position.set(-5, 2, -5);
scene.add(fill);

const bottom = new THREE.DirectionalLight(0xffffff, 0.8);
bottom.position.set(0, -5, 0);
scene.add(bottom);

const front = new THREE.DirectionalLight(0xffffff, 1.5);
front.position.set(0, 2, 8);
scene.add(front);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 20;

// --- Part info data ---
const partData = {
  default: {
    title: 'Component',
    desc: 'No service data available for this part.',
    status: 'UNKNOWN',
    statusColor: '#888'
  },
  Engine: {
    title: 'Engine',
    desc: 'V6 turbocharged unit. Check coolant levels and belt tension every 10,000 km. Last service flagged minor oil seep at rear main seal.',
    status: 'WARNING',
    statusColor: '#f44336'
  },
  BodyHood: {
    title: 'Hood Panel',
    desc: 'Aluminium hood with active venting. Inspect hinge torque (8 Nm) and latch engagement before road sign-off.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyHeadlights: {
    title: 'Headlight Assembly',
    desc: 'Full LED matrix array. Run diagnostic sequence via service tool before replacing — 80% of faults are connector-related.',
    status: 'INSPECT',
    statusColor: '#ff9800'
  },
  BodyTaillights: {
    title: 'Taillight Assembly',
    desc: 'OLED rear cluster. Replace as full unit only — individual elements are not field-serviceable.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyWindshield: {
    title: 'Windshield',
    desc: 'Acoustic laminated glass with embedded antenna. Use approved urethane adhesive only. Cure time 4 hours minimum.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyWindshieldWipers: {
    title: 'Wiper Blades',
    desc: 'Flat-blade aero wipers. Replace every 12 months or when streaking begins. Check park position sensor calibration after replacement.',
    status: 'INSPECT',
    statusColor: '#ff9800'
  },
  BodyDoorLColor1: {
    title: 'Left Door Panel',
    desc: 'Flush-handle door with soft-close mechanism. Lubricate latch assembly every 20,000 km. Window regulator rated 50,000 cycles.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyDoorRColor1: {
    title: 'Right Door Panel',
    desc: 'Flush-handle door with soft-close mechanism. Lubricate latch assembly every 20,000 km. Window regulator rated 50,000 cycles.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyDoorLMirror: {
    title: 'Left Mirror',
    desc: 'Heated, power-folding unit with blind spot sensor. Calibrate camera after any replacement. Heating element: 12V 8W.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyDoorRMirror: {
    title: 'Right Mirror',
    desc: 'Heated, power-folding unit with blind spot sensor. Calibrate camera after any replacement. Heating element: 12V 8W.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  InteriorSteeringWheel04: {
    title: 'Steering Wheel',
    desc: 'Heated leather-wrapped wheel with haptic controls. Torque sensor calibration required after column replacement. Do not autoclave.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  InteriorDashMid: {
    title: 'Centre Dashboard',
    desc: 'Houses infotainment unit and HVAC controls. ESD precautions required. Disconnect 12V before removal.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  WheelFrontLBrakeDisc: {
    title: 'Front Left Brake Disc',
    desc: 'Vented iron disc, 355mm diameter. Minimum thickness 28mm. Current measure: 29.1mm — approaching service limit.',
    status: 'WARNING',
    statusColor: '#f44336'
  },
  WheelFrontRBrakeDisc: {
    title: 'Front Right Brake Disc',
    desc: 'Vented iron disc, 355mm diameter. Minimum thickness 28mm. Measure before next service interval.',
    status: 'INSPECT',
    statusColor: '#ff9800'
  },
  WheelRearLBrakeDisc: {
    title: 'Rear Left Brake Disc',
    desc: 'Solid iron disc, 300mm diameter. Minimum thickness 10mm. Within service limits.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  WheelRearRBrakeDisc: {
    title: 'Rear Right Brake Disc',
    desc: 'Solid iron disc, 300mm diameter. Minimum thickness 10mm. Within service limits.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  WheelFrontLBrakePad: {
    title: 'Front Left Brake Pad',
    desc: 'Low-metallic compound pads. Minimum pad thickness 3mm. Wear sensor will trigger dash alert at 2mm.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  Axles: {
    title: 'Axle Assembly',
    desc: 'CV axle with grease-packed boots. Inspect boots for cracking or grease leakage at every tyre rotation.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  License_Plate: {
    title: 'License Plate Mount',
    desc: 'Integrated mount with rear parking sensor housing. Check sensor alignment if mount is disturbed.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
  BodyRoofPanel: {
    title: 'Roof Panel',
    desc: 'Panoramic glass roof with UV coating. Inspect seal perimeter for delamination. Drain channels must be clear.',
    status: 'NOMINAL',
    statusColor: '#4caf50'
  },
};

// --- UI refs ---
const panel = document.getElementById('info-panel');
const partTitle = document.getElementById('part-title');
const partName = document.getElementById('part-name');
const partDesc = document.getElementById('part-desc');
const badge = document.querySelector('.status-badge');
const loading = document.getElementById('loading');

// --- State ---
let hoveredMesh = null;
let selectedMesh = null;
const originalMaterials = new Map();
const allMeshes = [];

const highlightMat = new THREE.MeshStandardMaterial({
  color: 0x4488ff, emissive: 0x1133aa, emissiveIntensity: 0.4, roughness: 0.3
});
const selectedMat = new THREE.MeshStandardMaterial({
  color: 0xff4444, emissive: 0xaa1111, emissiveIntensity: 0.5, roughness: 0.3
});

function showPanel(mesh) {
  const key = mesh.name || 'default';
  const data = partData[key] || partData.default;
  partTitle.textContent = data.title;
  partName.textContent = mesh.name || 'unnamed';
  partDesc.textContent = data.desc;
  badge.textContent = data.status;
  badge.style.color = data.statusColor;
  badge.style.background = data.statusColor + '22';
  panel.classList.add('visible');
}

function resetMesh(mesh) {
  if (mesh && originalMaterials.has(mesh.uuid)) {
    mesh.material = originalMaterials.get(mesh.uuid);
  }
}

// --- Load model ---
const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(draco);

loader.load(
  '/3D-Demo/CarConcept.glb',
  (gltf) => {
    const model = gltf.scene;
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        originalMaterials.set(child.uuid, child.material);
        allMeshes.push(child);
      }
    });

    // Auto-center and scale
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    model.position.sub(center);
    model.scale.setScalar(2 / maxDim);

    scene.add(model);
    loading.style.display = 'none';
  },
  (xhr) => {
    const pct = Math.round((xhr.loaded / xhr.total) * 100);
    loading.textContent = `LOADING MODEL... ${pct}%`;
  },
  (err) => {
    loading.textContent = 'Failed to load model.';
    console.error(err);
  }
);

// --- Raycasting ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let mouseDownPos = { x: 0, y: 0 };

window.addEventListener('mousedown', (e) => {
  mouseDownPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', (e) => {
  const dx = e.clientX - mouseDownPos.x;
  const dy = e.clientY - mouseDownPos.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist > 5) return; // was a drag, ignore

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(allMeshes);

  if (selectedMesh) {
    resetMesh(selectedMesh);
    selectedMesh = null;
  }

  if (hits.length > 0) {
    const mesh = hits[0].object;
    selectedMesh = mesh;
    hoveredMesh = null;
    mesh.material = selectedMat;
    showPanel(mesh);
  } else {
    panel.classList.remove('visible');
  }
});

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(allMeshes);

  if (hoveredMesh && hoveredMesh !== selectedMesh) {
    resetMesh(hoveredMesh);
    hoveredMesh = null;
  }

  if (hits.length > 0) {
    const mesh = hits[0].object;
    if (mesh !== selectedMesh) {
      hoveredMesh = mesh;
      mesh.material = highlightMat;
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'pointer';
    }
  } else {
    hoveredMesh = null;
    document.body.style.cursor = 'default';
  }
});



// --- Resize ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Animate ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();