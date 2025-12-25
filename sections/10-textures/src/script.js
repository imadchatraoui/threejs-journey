import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */


/*const texture = textureLoader.load(
    '/textures/door/color.jpg',
    () =>
    {
        console.log("load")
    },
    () =>
    {
        console.log("progress")
    },
    () =>
    {
        console.log("error")
    }
)*/ //call back functions
const loadingManager = new THREE.LoadingManager()
/*
loadingManager.onStart = () =>
{
    console.log("onStart")
}
loadingManager.onLoad= () =>
{
    console.log("onLoad")
}
loadingManager.onProgress = () =>
{
    console.log("onProgress")
}
loadingManager.onError = () =>
{
    console.log("onError")
}*/
const textureLoader = new THREE.TextureLoader( loadingManager)

//const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
const colorTexture = textureLoader.load('/textures/minecraft.png')

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const normalTexture = textureLoader.load("/textures/door/normal.jpg")
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

//repeat property its a vector2
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredWrapping
// colorTexture.wrapT = THREE.MirroredWrapping

//colorTexture.offset.x = 0.5
//colorTexture.offset.y = 0.5

//its not a vector2, u have to provide radiants
//colorTexture.rotation = Math.PI/4

//center e vector2, modifichiamo il pivot point, non piu in basso a sinistras
//colorTexture.center.x = 0.5
//colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false //non genererà piu le mipmaps (solo se si usa nearestFiler con minFilter)
//colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter


colorTexture.colorSpace = THREE.SRGBColorSpace
/*
const image = new Image() // image is empty initially
const texture = new THREE.Texture(image)
texture.colorSpace = THREE.SRGBColorSpace

 image.onload = () =>{
   
    texture.needsUpdate = true; // hey the texture needs to be updated

 }
 image.src = '/textures/door/color.jpg'
*/



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
//console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()