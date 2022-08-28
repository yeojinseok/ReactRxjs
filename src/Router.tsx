import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Components/Header'
import DrawContainer from './Route/DrawContainer'
import Home from './Route/home'

const Wrap = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Wrap>
          <Header />
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/draw" element={<DrawContainer></DrawContainer>} />
          </Routes>
        </Wrap>
      </BrowserRouter>
    </>
  )
}
