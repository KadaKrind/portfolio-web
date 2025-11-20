// Three.js Configuration
let scene, camera, renderer, cube;
let currentConfig = {
    bodyColor: '#3498db',
    accentColor: '#e74c3c',
    material: 'plastic',
    reflectivity: 0.3,
    scale: 1,
    parts: {
        handle: false,
        wheels: false,
        stripe: false,
        lights: false
    }
};

// Initialize Three.js
function initThreeJS() {
    const canvas = document.getElementById('canvas3D');
    const container = document.getElementById('viewer3D');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    scene.fog = new THREE.Fog(0xf5f5f5, 100, 1000);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 3;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create cube
    createCube();

    // Mouse controls
    let mouseDown = false;
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;

    container.addEventListener('mousedown', (e) => {
        mouseDown = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (mouseDown) {
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            
            targetRotationY += deltaX * 0.005;
            targetRotationX += deltaY * 0.005;

            cube.rotation.y += deltaX * 0.005;
            cube.rotation.x += deltaY * 0.005;

            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });

    // Zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(1, Math.min(10, camera.position.z));
    });

    // Hide loading spinner
    document.getElementById('loadingSpinner').style.display = 'none';

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

function createCube() {
    if (cube) scene.remove(cube);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: currentConfig.bodyColor,
        metalness: currentConfig.material === 'metallic' ? 0.8 : 0.1,
        roughness: 1 - currentConfig.reflectivity / 100,
        envMapIntensity: 1
    });

    cube = new THREE.Mesh(geometry, material);
    cube.scale.set(currentConfig.scale, currentConfig.scale, currentConfig.scale);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Tab switching
function switchTab(tab) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
    });

    // Add active to current tab
    document.getElementById(`tab-${tab}`).classList.add('active');
    event.target.classList.add('active');
}

// Color management
function updateBodyColor(color) {
    currentConfig.bodyColor = color;
    if (cube) cube.material.color.set(color);
    document.getElementById('bodyColorName').textContent = getColorName(color);
    document.getElementById('summaryColor').textContent = getColorName(color);
}

function updateAccentColor(color) {
    currentConfig.accentColor = color;
    document.getElementById('accentColorName').textContent = getColorName(color);
}

function setQuickColor(color, name) {
    document.getElementById('bodyColor').value = color;
    updateBodyColor(color);
}

function getColorName(hex) {
    const colors = {
        '#000': 'Black',
        '#fff': 'White',
        '#34495e': 'Dark Gray',
        '#e74c3c': 'Red',
        '#3498db': 'Sky Blue',
        '#2ecc71': 'Green'
    };
    return colors[hex] || hex;
}

// Material management
function updateMaterial(material) {
    currentConfig.material = material;
    if (cube) {
        cube.material.metalness = material === 'metallic' ? 0.8 : 0.1;
    }
    document.getElementById('summaryMaterial').textContent = 
        material.charAt(0).toUpperCase() + material.slice(1);
}

function updateReflectivity(value) {
    currentConfig.reflectivity = value;
    if (cube) {
        cube.material.roughness = 1 - (value / 100);
    }
    document.getElementById('reflectivityValue').textContent = value + '%';
}

// Parts management
function togglePart(part) {
    currentConfig.parts[part] = !currentConfig.parts[part];
    updateSummary();
}

// Scale management
function updateScale(value) {
    currentConfig.scale = value;
    if (cube) {
        cube.scale.set(value, value, value);
    }
    document.getElementById('scaleValue').textContent = (value * 100).toFixed(0) + '%';
}

// Rotation
function rotateModel(angle, axis) {
    if (!cube) return;
    angle = angle * (Math.PI / 180);
    if (axis === 'x') cube.rotation.x += angle;
    if (axis === 'y') cube.rotation.y += angle;
}

// Lighting
function updateLighting(value) {
    scene.fog.far = 100 * value;
    document.getElementById('lightingValue').textContent = value.toFixed(1) + 'x';
}

// View controls
function resetView() {
    if (cube) {
        cube.rotation.set(0.5, 0.5, 0);
    }
    camera.position.z = 3;
}

function fullscreenView() {
    const container = document.getElementById('viewer3D');
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert('Fullscreen not supported');
        });
    } else {
        document.exitFullscreen();
    }
}

// Configuration management
function saveConfiguration() {
    const config = JSON.stringify(currentConfig, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-config.json';
    a.click();
}

function shareConfig() {
    const config = btoa(JSON.stringify(currentConfig));
    const url = `${window.location.href}?config=${config}`;
    navigator.clipboard.writeText(url);
    alert('Configuration link copied to clipboard!');
}

function orderNow() {
    alert('Proceeding to checkout with your custom configuration!');
}

// Summary update
function updateSummary() {
    const parts = Object.keys(currentConfig.parts)
        .filter(p => currentConfig.parts[p])
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(', ');
    
    document.getElementById('summaryParts').textContent = parts || 'None added';
}

// Help modal
function toggleHelp() {
    document.getElementById('helpModal').classList.toggle('active');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initThreeJS);
