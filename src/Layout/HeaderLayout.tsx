import styled from 'styled-components'
import { animate, motion } from 'framer-motion'
import { theme } from './theme'

export const WhiteButton = styled(motion.button)`
  font: normal normal bold 16px/24px Noto Sans CJK KR;
  width: 240px;
  height: 60px;
  margin: 10px 0px;
  border-radius: 20px;
  background-color: ${theme.button.bgColor};
  color: ${theme.button.textColor};
  border: 1px solid #cccccc;
`
export const WhiteButtonVariants = {
  hover: {
    scale: 1.01,
    backgroundColor: 'rgb(244, 244, 244)',
    transition: { duration: 0.2 },
  },
}

export const Button = ({ children }: { children: string }) => {
  return (
    <WhiteButton variants={WhiteButtonVariants} whileHover="hover">
      {children}
    </WhiteButton>
  )
}
