import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../Layout/DefaultLayout'
import * as rxjs from 'rxjs'
import { click } from '@testing-library/user-event/dist/click'

const CanvasContainer = styled.div`
  height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background-color: green;
`

export default function DrawContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const painting = new rxjs.BehaviorSubject<CanvasRenderingContext2D>(null)
  const [context, setContext] = useState(null)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.lineWidth = 3
      context.strokeStyle = 'white'
      context.font = '16px sans-serif'
      painting.next(context)
      DrawController(canvasRef.current)
    }
  }, [canvasRef])

  const DrawController = (canvasRef: HTMLCanvasElement) => {
    rxjs
      .fromEvent(canvasRef, 'click')
      .pipe(
        rxjs.map((e: any) => {
          return {
            x: e.x,
            y: e.y,
          }
        }),
        rxjs.startWith({ x1: 0, y1: 0, x2: null, y2: null }),
        rxjs.scan((acc: any, cur: any) => {
          return { x1: acc.x2, y1: acc.y2, x2: cur.x, y2: cur.y }
        }),
        rxjs.switchMap(xy =>
          rxjs.interval(10).pipe(
            rxjs.startWith({ x1: xy.x1, y1: xy.y1, x2: xy.x1, y2: xy.y1 }),
            rxjs.scan((acc: any, cur: any) => {
              return {
                x1: acc.x1,
                y1: acc.y1,
                x2: acc.x2 + (xy.x2 - xy.x1) / 100,
                y2: acc.y2 + (xy.y2 - xy.y1) / 100,
              }
            }),
            rxjs.take(100)
          )
        )
      )
      .subscribe(DrawLine)
  }
  function DrawLine(xy: any) {
    painting
      .pipe(
        rxjs.map(context => {
          context.beginPath()
          context.moveTo(xy.x1, xy.y1)
          context.lineTo(xy.x2, xy.y2)
          context.closePath()
          context.stroke()
        })
      )
      .subscribe()
  }

  return (
    <Wrapper>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
    </Wrapper>
  )
}
