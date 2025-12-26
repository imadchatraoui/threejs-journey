import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particlesTexture = textureLoader.load("./textures/particles/2.png")

/**
 * Particles
 */

// Geometry
//const particlesGeometry = new THREE.SphereGeometry(1,32,32)
const particlesGeometry = new THREE.BufferGeometry(1,32,32)

const count = 20000
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i< count * 3; i++){
    positions[i] = (Math.random() -0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3))
particlesGeometry.setAttribute("color",new THREE.BufferAttribute(colors,3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, // se true quando ci avviciniamo i points più vicini sono più grandi
    //color: "#ff88cc",
    transparent: true, // problema, dato che la gpu disegna le particles nell'ordine in cui sono state create
    alphaMap: particlesTexture,
    // problema, dato che la gpu disegna le particles nell'ordine in cui sono state create

    // 1 SOLUZIONE alpha Test
    //alphaTest: 0.001 //non fa renderizzare alla gpu quando dovrebbe essere trasparente lo ignora completamente, 
    // di default è 0 i pixel (neri) vengono renderizzati a priori, quindi lo impostiamo a 0.001

    // 2 SOLUZIONE depth test
    //depthTest: false // quando disegna webgl testa se quello che sta disegnando e di fronte ad altre particelle e lo disegna altrimenti no
    // disattivare depthtest(false) puo creare bug se abbiamo altri oggetti di colore diverso (esempio cubo bianco)

    //3 SOLUZIONE depth write
    depthWrite: false, // la profondita di quello che viene disegnato è salvato in un buffer, 
    // instead of not testing if the particle is closer than whats in this depth buffer, we can tell webgl not to write particles in that depth buffer with depthtest
    // 4 SOLUZIONE blending
    blending: THREE.AdditiveBlending, // it combines colors, somma i colori di tutto quello che ce indietro. effetto bianco 

    vertexColors: true
})  

// Points
const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for(let i = 0; i < count; i++){
        const i3 = i*3
        const x = particlesGeometry.attributes.position.array[i3+0] //x
        particlesGeometry.attributes.position.array[i3+1]= Math.sin(elapsedTime +x) //y

    }
    particlesGeometry.attributes.position.needsUpdate = true

    //Update Particles
    // particles.rotation.x = elapsedTime *0.1
    //particles.rotation.z = Math.cos(elapsedTime)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()