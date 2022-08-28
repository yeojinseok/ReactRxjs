import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../Layout/DefaultLayout'
import * as rxjs from 'rxjs'

const Canvas = styled.canvas`
  width: 80%;
  height: 80%;
  background-color: 'red';
`

export default function DrawContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.lineWidth = 3
      context.strokeStyle = 'blue'
      context.font = '16px sans-serif'
      DrawController(canvasRef.current)
    }
  }, [canvasRef])

  // down$.pipe(rxjs.map(e => e))
  return (
    <Wrapper>
      <Canvas ref={canvasRef}> </Canvas>
    </Wrapper>
  )
}

function DrawController(canvasRef: HTMLCanvasElement) {
  const down$ = rxjs.fromEvent(canvasRef, 'mousedown').pipe(
    rxjs.map((x: any) => {
      return {
        type: 'down',
        position: {
          x: x.clientX,
          y: x.clientX,
        },
      }
    })
  )
  const up = rxjs.fromEvent(canvasRef, 'mouseup').pipe(
    rxjs.map((x: any) => {
      return {
        type: 'up',
        position: {
          x: x.clientX,
          y: x.clientX,
        },
      }
    })
  )
  rxjs.merge(down$, up).subscribe(Draw)
}

function Draw(x: any) {
  switch (x.type) {
    case 'down':
      console.log(x.position)
      break
    case 'up':
      console.log(x.position)
      break
    default:
      console.log('xxxx')
  }
}
