import * as THREE from 'three'

export function CameraController(canvasRef:any,scene:any){ // any type 수정필요
    const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current.clientWidth / canvasRef.current.clientHeight,
        0.1,
        1000
      )
      // camera.position.y = 40.5
      // camera.position.z = 60
      // camera.position.x = 10
      camera.rotation.x = -0.7
      camera.position.set(0, 90, 210)
      scene.add(camera)

      return camera
}