import * as S from './styles'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

interface HeaderTypes {
  ByName: () => void
  onChange: (string: number) => void
  Active: () => void
  Desactive: () => void
}

export default function Header({
  ByName,
  onChange,
  Active,
  Desactive,
}: HeaderTypes) {
  return (
    <S.Header>
      <S.SearchContainer>
        <div onClick={ByName}>
          <AiOutlineSearch size={30} color="white" />
        </div>
        <input
          placeholder="Procure pelo nome"
          type="text"
          onChange={() => onChange}
        />
      </S.SearchContainer>

      <S.Buttons>
        <S.Action color="green" onClick={Active}>
          Ativar
        </S.Action>
        <S.Action color="red" onClick={Desactive}>
          Desativar
        </S.Action>
      </S.Buttons>
    </S.Header>
  )
}
