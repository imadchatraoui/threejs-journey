import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

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

// Floor
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp")

const floorColorTexture = textureLoader.load("./floor/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.webp")
const floorARMTexture = textureLoader.load("./floor/forest_leaves_02_1k/forest_leaves_02_arm_1k.webp")
const floorNormalTexture = textureLoader.load("./floor/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.webp")
const floorDisplacementTexture = textureLoader.load("./floor/forest_leaves_02_1k/forest_leaves_02_disp_1k.webp")


floorColorTexture.colorSpace = THREE.SRGBColorSpace
floorColorTexture.repeat.set(8,8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.repeat.set(8,8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8,8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8,8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall

const wallARMTexture = textureLoader.load('./wall/damaged_plaster_1k/damaged_plaster_arm_1k.webp')
const wallColorTexture = textureLoader.load('./wall/damaged_plaster_1k/damaged_plaster_diff_1k.webp')
const wallDisplacementTexture = textureLoader.load('./wall/damaged_plaster_1k/damaged_plaster_disp_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/damaged_plaster_1k/damaged_plaster_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Floor

const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// da rivedere, non credo sia necessario
bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping


// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('/door/color.webp')

const doorAlphaTexture = textureLoader.load('/door/alpha.webp')
const doorNormalTexture = textureLoader.load("/door/normal.webp")
const doorHeightTexture = textureLoader.load('/door/height.webp')
const doorAmbientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.webp')
const doorMetalnessTexture = textureLoader.load('/door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('/door/roughness.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,50,50),
    new THREE.MeshStandardMaterial()

)

floor.material.transparent = true
floor.material.alphaMap = floorAlphaTexture

floor.material.map = floorColorTexture

floor.material.aoMap = floorARMTexture
floor.material.roughnessMap = floorARMTexture
floor.material.metalnessMap = floorARMTexture

floor.material.normalMap = floorNormalTexture
floor.material.displacementMap = floorDisplacementTexture
floor.material.displacementScale = 0.4
floor.material.displacementBias = -0.114
//gui for displacement
gui.add(floor.material,"displacementScale").min(0).max(2).step(0.001).name("displacementScale")
gui.add(floor.material,"displacementBias").min(-2).max(2).step(0.001).name("displacementBias")

floor.rotation.x = -Math.PI /2
floor.material.side = THREE.DoubleSide
scene.add(floor)

// House container
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4,50,50),
    new THREE.MeshStandardMaterial()
)
walls.material.wireframe = false
walls.material.aoMap = wallARMTexture
walls.material.roughnessMap = wallARMTexture
walls.material.metalnessMap = wallARMTexture
walls.material.map = wallColorTexture
walls.material.normalMap = wallNormalTexture
walls.material.displacementMap = wallDisplacementTexture
walls.material.displacementScale = 0.197 
walls.material.displacementBias = -0.176
walls.position.y = 1.26
house.add(walls)
gui.add(walls.material,"displacementScale").min(-3).max(3).step(0.001).name("displacementScale")
gui.add(walls.material,"displacementBias").min(-2).max(2).step(0.001).name("displacementBias")


// roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial()
)
roof.material.aoMap = roofARMTexture
roof.material.roughnessMap = roofARMTexture
roof.material.map = roofColorTexture
roof.material.normalMap = roofNormalTexture
roof.position.y = 3.25
roof.rotation.y = Math.PI /4
house.add(roof)

// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,50,50),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 1.75 +0.25
house.add(door)


// bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})


const bush1 = new THREE.Mesh(bushGeometry,bushMaterial)
bush1.position.set(0.8,0.2,2.2)
bush1.scale.set(0.5,0.5,0.5)
// or 
//bush1.position.setScalar(0.5)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
bush2.position.set(1.4,0.1,2.1)
bush2.scale.setScalar(0.25)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
bush3.position.set(-0.8,0.1,2.2)
bush3.scale.setScalar(0.4)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
bush4.position.set(-1,0.05,2.6)
bush4.scale.setScalar(0.15)
house.add(bush1,bush2,bush3,bush4)
bush4.rotation.x = -0.75


// graves
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    normalMap: graveNormalTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture
})


// graves group

const graves = new THREE.Group()
scene.add(graves)
for(let i = 0; i < 40; i++){

    const angle = Math.random() * Math.PI *2
    const radius = 3 + Math.random() * 4 // va da 3 min a max 7 (7 se math.random è 1 -> 1*4 = 4 +3 = 7)

    // Mesh
    const grave = new THREE.Mesh(graveGeometry,graveMaterial)
    grave.position.x = Math.cos(angle) * radius
    grave.position.z = Math.sin(angle) * radius
    grave.position.y = Math.random() * 0.4
    grave.rotation.x = (Math.random() -0.5) * 0.4 // Math.random() -0.5, va da -0.5 a 0.5
    grave.rotation.y = (Math.random() -0.5) * 0.4
    grave.rotation.z = (Math.random() -0.5) * 0.4

    graves.add(grave)
    
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light - Point Light

const doorLight = new THREE.PointLight("#ff7d46", 10)
doorLight.position.set(0,2.2,2.5)
house.add(doorLight)

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight("#8800ff",100)
const ghost2 = new THREE.PointLight("#ff0088",10)
const ghost3 = new THREE.PointLight("#ff0000",10)

const pointLightHelper = new THREE.PointLightHelper(ghost1,0.2)
pointLightHelper.visible = false
scene.add(ghost1,ghost2,ghost3,pointLightHelper)

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
const camera = new THREE.PerspectiveCamera(110, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}
// Mapping of the camera of the shadow( the one doing the render before)

directionalLight.shadow.mapSize.set(256,256)
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.set(256,256)
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.set(256,256)
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.set(256,256)
ghost3.shadow.camera.far = 10



// house.castShadow = true
// house.receiveShadow = true
// console.log(house)

/**
 * Sky
 */

const sky  = new Sky()
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.setScalar(100)

/**
 * Fog
 */

scene.fog = new THREE.FogExp2("#13333E",0.1)
/**
 * Animate
 */
const timer = new Timer() // we always used clock, now we use timer, its just an alternative that fixes some bugs

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()