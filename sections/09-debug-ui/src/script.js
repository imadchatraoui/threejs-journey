import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui' //or import * as dat from 'lil-gui'
// const gui = new dat.GUI()



/**
 * Debug 
 */
const gui = new GUI({
    width:300,
    title:" Nice debug UI",
    closeFolders: false
})
gui.close()
//gui.hide()

window.addEventListener('keydown', (event)=> {
    if(event.key == "0"){
        gui.show(gui._hidden)
    }
})
const debugObject = {

}
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
debugObject.color ="#00ff00"
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Folders for gui U CAN NEST THEM TO HAVE FOLDER INSIDE A FOLDER

const cubeTweaks = gui.addFolder("First folder")
//cubeTweaks.close() // by default si chiude
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01)
//gui.add(mesh.position, 'y',-3,3,0.01)
cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material,'wireframe')

cubeTweaks.addColor(debugObject, 'color') // the colors displayed in the tweak are not the same one that are being used inside three.js
    .onChange( ( value) => { //value sarebbe come fare mesh.material
        material.color.set(debugObject.color)
    })



/*let MyVariable = 3337; // qui non abbiamo l'oggetto da passare a gui.add, abbiamo solo la proprieta

const object = { 
    MyVariable: 0,
    
}
gui.add(object,'MyVariable').min(-100).max(100).step(1).name("numero")*/
debugObject.spin = () =>{
    gsap.to(mesh.rotation, {y:mesh.rotation.y + Math.PI * 2})
}
cubeTweaks.add(debugObject, 'spin')

debugObject.subdivision = 2
cubeTweaks.add(debugObject, 'subdivision').min(1).max(20).step(1)
    /*.onChange( () => { //non usiamo onChange perchè senno farebbe fare troppi calcoli alla cpu (ricordarsi quando hai provato con il console log che sono arrivato a 200 messaggi nella console)
        console.log("Sub changed")
    })*/
    .onFinishChange(() =>{
        //console.log("Sub changed")
         // le altre geometrie con le vecchie suddivisioni sono ancora presenti nella memoria quindi
        mesh.geometry.dispose()// frees the GPU-related resources allocated by this instance.
        mesh.geometry = new THREE.BoxGeometry(1,1,1,debugObject.subdivision,debugObject.subdivision,debugObject.subdivision)
    })
/* 
gui.add(geometry, 'widthSegments').min(1).max(30).step(1) 
errore perchè widthSegments non è una propietà di geometry
è solo un parametro che passiamo a BoxGeometry quando lo instanziamo
*/

//DA RIVEDERE PERCHE' W H D SI RIMETTONO A 1 non rimangono salvata le ultime grandezze
/* 
debugObject.height = 1
cubeTweaks.add(debugObject, 'height').min(0.5).max(3).step(0.01)
    .onFinishChange( () => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(mesh.geometry.width,debugObject.height,mesh.geometry.depth, 2, 2,2)
    })

debugObject.width = 1
cubeTweaks.add(debugObject, 'width').min(0.5).max(3).step(0.01)
    .onFinishChange( () => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(debugObject.width,mesh.geometry.height,mesh.geometry.depth, 2, 2,2)
    })

debugObject.depth = 1
cubeTweaks.add(debugObject, 'depth').min(0.5).max(3).step(0.01)
    .onFinishChange( () => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(mesh.geometry.width,mesh.geometry.height,debugObject.depth, 2, 2,2)
    })
*/



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
camera.position.z = 2
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