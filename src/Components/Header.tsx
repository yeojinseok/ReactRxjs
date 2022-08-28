import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useMatch, Link } from 'react-router-dom'

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  width: 1280px;
  top: 0;
  font-size: 24px;
  padding: 40px 60px;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgColor};
  margin: 0 auto;
  z-index: 10;
`

const Column = styled(motion.div)<{ isactive: boolean }>`
  margin: 0px 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.isactive && props.theme.accentBgColor};
  }
`

const hoverVariants = {
  hover: {
    scale: 1.3,
    color: 'rgb(250, 4, 80)',
    // backgroundColor: 'rgb(51,51,51)',
  },
}

function Header() {
  const mypageMatch = useMatch('/mypage')
  const signinMatch = useMatch('/signin')
  const drawMatch = useMatch('/draw')
  const homeMatch = useMatch('/')

  console.log(homeMatch, mypageMatch)
  return (
    <Nav>
      <Column
        variants={hoverVariants}
        whileHover="hover"
        isactive={homeMatch != null}
      >
        <Link to="/">HOME</Link>
      </Column>

      <Column
        variants={hoverVariants}
        whileHover="hover"
        isactive={drawMatch != null}
      >
        <Link to="/draw">Draw</Link>
      </Column>
    </Nav>
  )
}

export default Header
