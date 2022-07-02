import React from 'react'
import * as S from './styles'

type LoginButtonProps = {
  name: string
  func: () => void
}

export default function LoginButton({ name, func }: LoginButtonProps) {
  return (
    <S.Button type="submit" onClick={func}>
      {name}
    </S.Button>
  )
}
