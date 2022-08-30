import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../Layout/DefaultLayout'
import * as rxjs from 'rxjs'

const CanvasContainer = styled.div`
  height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Canvas = styled.canvas`
  width: 80%;
  height: 80%;
  background-color: green;
`

export default function DrawContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const painting = new rxjs.BehaviorSubject(false)
  const [context, setContext] = useState(null)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.lineWidth = 3
      context.strokeStyle = 'blue'
      context.font = '16px sans-serif'
      setContext(context)
    }
  }, [canvasRef])

  const Draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    painting
      .pipe(
        rxjs.map(x => {
          if (!x) {
            context.beginPath()
            context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          } else {
            context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            context.stroke()
          }
        }),
        rxjs.delay(1000)
      )
      .subscribe()
  }
  return (
    <Wrapper>
      <CanvasContainer>
        <Canvas
          ref={canvasRef}
          onMouseDown={() => painting.next(true)}
          onMouseUp={() => painting.next(false)}
          onMouseLeave={() => painting.next(false)}
          onMouseMove={e => Draw(e)}
        />
      </CanvasContainer>
    </Wrapper>
  )
}
