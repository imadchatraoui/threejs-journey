import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/*
 * Objects
 */

const group = new THREE.Group()
scene.add(group) // importante!

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube2);

cube2.position.x = -2


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube3);
cube3.position.x = 2
cube3.scale
group.rotation.y = 1
/*

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// position

// 1 metodo
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1

// 2 metodo
mesh.position.set(0.7, -0.6, 1) //stessa cosa della tre righe sopra

scene.add(mesh)

// scale

mesh.scale.x = 1.4
mesh.scale.y = 0.5
mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5) //stessa cosa della tre righe sopra

// rotation
mesh.rotation.reorder('YXZ') // gli diamo l'ordine di rotazione degli assi, esempio degli fps
mesh.rotation.x = Math.PI / 4
mesh.rotation.y = Math.PI / 4
//abbiamo anche i quaternon che non spiega, mate avanzata (Un quaternione è espresso come \(a+bi+cj+dk\), dove \(a,b,c,d\) sono numeri reali e \(i,j,k\) sono unità immaginarie speciali.)
*/


//axes helper
const axesHelper = new THREE.AxesHelper(1) //come parametro si mette la lunghezza degli assi
//è un oggetto quindi va aggiunto alla scena
scene.add(axesHelper)


//console.log(mesh.position.length())  //distaza dall'origine
//mesh.position.normalize() //riduce il vettore ponendo x y z a 1
//infatti se facciamo console.log(mesh.position.length()) ora la distanza dall'origine sara 1


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 0
camera.position.x = 0

//camera.lookAt(mesh.position)
//console.log(mesh.position.distanceTo(camera.position)) //distanca tra il mesh(cubo) e la camera

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)