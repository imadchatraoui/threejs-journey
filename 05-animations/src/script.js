import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Time
//let time = Date.now()
// Animations
// da rivedere

// Clock
//const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1 ,delay: 1, x:2})
gsap.to(mesh.position, { duration: 1 ,delay: 2, x:0})
gsap.to(mesh.rotation, { duration: 1 ,delay: 3, y:Math.PI *2})
const tick = () =>{

// Time
//const currentTime = Date.now()
//const delta = currentTime - time
//time = currentTime
//console.log(delta)

// Clock
//const elapsedTime = clock.getElapsedTime() // it starts always from 0 the time we initialize it
//console.log(elapsedTime)  


// Update objects

    //mesh.position.y = Math.sin(elapsedTime)
    //mesh.position.x = Math.cos(elapsedTime)
    //mesh.rotation.y += 0.001      *delta// essendo che ho più fps il mio cubo gira più velocemente
    //now its rotating a the same speen regardlees of the fps of different devices
   //qcamera.lookAt(mesh.position)
// Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick) // we dont call the funciont here, we just pass the reference



}
tick() // at least once in the end