import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>{
    cursor.x = (event.clientX / sizes.width )-0.5 // il mouse andra da -0.5 a +0.5
    cursor.y = - (event.clientY / sizes.height -0.5) // il mouse andra da +0.5 a -0.5
    //console.log(cursor.x, cursor.y)
});


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)

/*const aspectRatio = sizes.width / sizes.height //aspect ration moltiplicata per la left right , quindi orizzonatale
const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1,-1,0.1,100)*/

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls

const controls = new OrbitControls(camera, canvas) //dobbiamo passare la camera che deve aggiornare e il dom element su cui deve ascoltare gli eventi (mouse move, clicks touch
//controls.target.y =2
//controls.update()
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime* cursor.x;
    //mesh.rotation.x = elapsedTime* cursor.y;

    //update camera
    /*camera.position.x = Math.sin(cursor.x * Math.PI *2) *3
    camera.position.z = Math.cos(cursor.x * Math.PI *2) *3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)*/
    controls.update() // per fare in modo che continui a muoversi dopo il rilascio del mouse   
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()