import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange( () =>{
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// Texture

const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
// if the lights intesity its in the middle of the gradient it will take the closest one withouth mixing
gradientTexture.magFilter = THREE.NearestFilter 
gradientTexture.colorSpace = THREE.SRGBColorSpace
// Material
const material = new THREE.MeshToonMaterial()
material.color = new THREE.Color(parameters.materialColor)
material.gradientMap = gradientTexture

//Meshes
const objectDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16,60),
    material
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2,32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8,0.35,100,16),
    material
)
// - per posizionarli verso il basso se no si impilavano verso l'altro
mesh1.position.y = - objectDistance * 0 
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2
scene.add(mesh1,mesh2,mesh3)

const sectionMeshes = [mesh1,mesh2,mesh3]

/**
 * Particles
 */
// Geometry
const particleCount = 200
const positions = new Float32Array(particleCount*3)

for (let i = 0; i< particleCount ; i++){
    positions[i*3+0] = (Math.random() - 0.5) *10
    positions[i*3+1] = objectDistance * 0.5 - Math.random() *objectDistance * sectionMeshes.length
    positions[i*3+2] = (Math.random() - 0.5) *10

}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
// Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.color = new THREE.Color(parameters.color)
particlesMaterial.sizeAttenuation = true
particlesMaterial.size = 0.03

// Points geometry + material

const particles = new THREE.Points(particlesGeometry,particlesMaterial)
scene.add(particles)


/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff',3)
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)

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
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

let scrollY = window.scrollY
let currentSection = 0
window.addEventListener ('scroll', () =>{

    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)
    // console.log(newSection) // 0, 1, 2 per ogni sezione mentre scrolliamo

    if(newSection != currentSection){
        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation,{
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }

        )
    }
})

/**
 * Cursor
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5  // in questo modo abbiamo valori uguale per ogni dispositivo e non in base alla risoluzione di ogni client
    cursor.y = event.clientY / sizes.height - 0.5
    // console.log(cursor)
})
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // Animate camera
    camera.position.y = -scrollY / sizes.height * objectDistance
    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 1 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 1 * deltaTime

    // Animate meshes
    for(const mesh of sectionMeshes){
        mesh.rotation.x += deltaTime * 0.1 // we add a value instead of assigning the rotation
        mesh.rotation.y += deltaTime * 0.12
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()