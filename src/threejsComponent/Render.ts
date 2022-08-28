import * as THREE from 'three'

export function RenderController(canvasRef:any){ // any type 수정필요
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      })
      renderer.setClearColor('white')
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      )
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
      canvasRef.current.appendChild(renderer.domElement)
    return renderer
}