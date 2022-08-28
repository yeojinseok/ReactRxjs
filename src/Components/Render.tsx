import { RefObject, SetStateAction, useState } from 'react'
import * as THREE from 'three'

// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import lobbyGlb from '../assets/room.glb'
import { CameraController } from '../threejsComponent/Camera'
import { RenderController } from '../threejsComponent/Render'

export function Render(
  canvasRef: any
) {



  //Scene
  const scene = new THREE.Scene()
  // Camera
  const camera= CameraController(canvasRef,scene)
  // Render
  const renderer= RenderController(canvasRef)
  let doorController=false

  // Light```

  // const ambientLight = new THREE.AmbientLight('white', 30)
  // scene.add(ambientLight)

  // const directionalLight = new THREE.DirectionalLight('white', 30)
  // directionalLight.position.x = 1

  // directionalLight.position.y = 20

  // // directionalLight.rotateZ = 100

  // // scene.add(directionalLight)
  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5)
  scene.add(ambientLight)

  const light = new THREE.PointLight('white', 1, 100, 2)
  light.position.x = 15
  light.position.y = 110
  light.position.z = 35
  scene.add(light)

  // const lightHelper = new THREE.PointLightHelper(light)
  // scene.add(lightHelper)

  // 그림자 설정
  // light.castShadow = true
  // light.shadow.mapSize.width = 1024 // 기본값 512
  // light.shadow.mapSize.height = 1024
  // light.shadow.camera.near = 1
  // light.shadow.camera.far = 30
  // light.shadow.radius = 15; // 기본값인 THREE.PCFShadowMap에서만 적용


  const gltfLoader = new GLTFLoader()
  let mixer: THREE.AnimationMixer
  let actions: any[] = []
  // let mixer;
  let meshes: THREE.Object3D<THREE.Event>[]
  gltfLoader.load(lobbyGlb, gltf => {
    console.log(gltf)
    const glbmodel = gltf.scene
    scene.add(gltf.scene)
    meshes = gltf.scene.children
    mixer = new THREE.AnimationMixer(glbmodel)

    actions[0] = mixer.clipAction(gltf.animations[2])
    actions[1] = mixer.clipAction(gltf.animations[1])
    actions[0].clampWhenFinished = true
    actions[1].clampWhenFinished = true
    // console.log(meshes);

  })

  // function doorController() {
  //   if (Controller() === 'KeyW') {
  //     console.log(123)
  //     actions[1].stop()
  //     actions[0].repetitions = 1
  //     actions[0].play()
  //   } else if (Controller() === 'KeyE') {
  //     console.log(actions)

  //   }
  // }

  // mouse controller

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.maxDistance = 800
  controls.minDistance = 50
  // controls.enableRotate = false;
  controls.enableDamping = true
  // controls.minPolarAngle = Math.PI / 6 // 수직
  // controls.maxPolarAngle = Math.PI / 2
  controls.enablePan = false

  //     수평
  // controls.minAzimuthAngle = -Math.PI / 2
  // controls.maxAzimuthAngle = Math.PI / 2
  // controls.minAzimuthAngle =

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function checkIntersects() {
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(meshes)
    if (intersects[0]) {
      console.log(intersects[0].object.name)
      if(intersects[0].object.name.includes("평면")){
        if(doorController){
          actions[1].stop()
          actions[0].repetitions = 1
          actions[0].play()
          doorController = false
          console.log(doorController)
        }else{
          actions[0].stop()
          actions[1].repetitions = 1
          actions[1].play()
          doorController = true
          console.log(doorController)
        }
      }
    }
  }

  const clock = new THREE.Clock()
  let x = 0.05
  const animate = function () {
    controls.update()
    const delta = clock.getDelta()

    if (mixer) mixer.update(delta)
    // camera.position.set(0, 90, 210)
    renderer.render(scene, camera)
    renderer.setAnimationLoop(animate)
  }

  // 이벤트
  function setSize() {
    camera.aspect =
      canvasRef.current.clientWidth / canvasRef.current.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    )
    renderer.render(scene, camera)
  }
  window.addEventListener('resize', setSize)
  canvasRef.current.addEventListener(
    'click',
    (event: { clientX: number; clientY: number }) => {
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
      mouse.y = -((event.clientY / renderer.domElement.clientHeight) * 2 - 1)
      // console.log(mouse);
      checkIntersects()
    }
  )

  animate()

  // return () => canvasRef.current.removeChild(renderer.domElement)
}
