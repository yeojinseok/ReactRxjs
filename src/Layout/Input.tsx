import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'
import PwdViewIcon from '../assets/ico_view_grey_24_hs.png'
import PwdUnViewIcon from '../assets/ico_unview_grey_24_hs.png'
import { InputInterface } from '../TpyeInterface/Interface'

const InputContainer = styled(motion.div)`
  width: 240px;
  height: 55px;
  max-height: 55px;

  border-radius: 5px;
  padding: 10px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #000000;
  }

  input {
    border: 0px;
    width: 220px;
  }
  input:focus {
    outline: none;
    border-color: #000000;
  }
  img {
    padding-top: 5px;
  }
`

export function PwdInput({
  onFocus,
  refs,
  onChange,
  value,
  placeholder,
  onBlur,
  register,
}: InputInterface) {
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  })

  const handlePasswordType = (e: any) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true }
      }
      return { type: 'password', visible: false }
    })
  }

  return (
    <>
      <InputContainer transition={{ type: 'tween' }} whileHover="hover">
        <input
          {...register}
          placeholder={placeholder}
          type={passwordType.type}
        />
        <span onClick={handlePasswordType}>
          {passwordType.visible ? (
            <img src={PwdViewIcon} />
          ) : (
            <img src={PwdUnViewIcon} />
          )}
        </span>
      </InputContainer>
    </>
  )
}

export function CunstomInput({
  onFocus,
  refs,
  onChange,
  value,
  placeholder,
  onBlur,
  register,
}: InputInterface) {
  return (
    <>
      <InputContainer transition={{ type: 'tween' }} whileHover="hover">
        <input {...register} placeholder={placeholder} type="text" />
      </InputContainer>
    </>
  )
}
