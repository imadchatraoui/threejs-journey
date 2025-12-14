import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl') //può rimanere anche solo canvas
//scene
const scene =  new THREE.Scene()

//object
const geometry = new THREE.BoxGeometry(2,2,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000,/*,wireframe: true*/})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Sizes
const sizes= {
    width: 800,
    height: 600
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = (5)
scene.add(camera) // can result in bugs

//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene,camera)