import styled from 'styled-components'
import { animate, motion } from 'framer-motion'
import { theme } from './theme'

export const WhiteButtonVariants = {
  hover: {
    scale: 1.01,
    backgroundColor: 'rgb(244, 244, 244)',
    transition: { duration: 0.2 },
  },
}

export const variants = {
  hover: {
    scale: 1.01,
    backgroundColor: 'rgb(60, 60, 60)',
    transition: { duration: 0.2 },
  },
}

interface ButtonLayoutInterface {
  width: string
  bgColor: string
  textColor: string
}

interface ButtonInterface {
  color?: string
  children?: any
  width?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonLayout = styled(motion.button)<ButtonLayoutInterface>`
  font: normal normal bold 16px/24px Noto Sans CJK KR;
  width: ${props => (props.width ? `${props.width} ` : '240px;')};
  height: 60px;
  border-radius: 5px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border: 1px solid #cccccc;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export function Button({ color, children, width, onClick }: ButtonInterface) {
  let bgColor, textColor
  if (color === 'white') {
    variants.hover.backgroundColor = 'rgb(244, 244, 244)'
    bgColor = theme.button.bgColor
    textColor = theme.button.textColor
  } else if (color === 'black') {
    variants.hover.backgroundColor = 'rgb(60, 60, 60)'
    bgColor = theme.button.textColor
    textColor = theme.button.bgColor
  }
  return (
    <ButtonLayout
      onClick={onClick}
      width={width}
      bgColor={bgColor}
      textColor={textColor}
      variants={variants}
      whileHover="hover"
    >
      {children}
    </ButtonLayout>
  )
}
