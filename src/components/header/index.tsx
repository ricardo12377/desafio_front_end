import * as S from './styles'

interface HeaderProps {
  actions: boolean
  active: () => void
  desactive: () => void
  param: (value: string) => void
}

export default function Header({
  actions,
  active,
  desactive,
  param,
}: HeaderProps) {
  return (
    <S.Header>
      <S.SearchContainer>
        <input
          placeholder="Procure pelo nome"
          onChange={(e) => param(e.target.value)}
        />
      </S.SearchContainer>

      {actions ? (
        <S.Buttons>
          <S.Action color="green" onClick={active}>
            Ativar
          </S.Action>
          <S.Action color="red" onClick={desactive}>
            Desativar
          </S.Action>
        </S.Buttons>
      ) : null}
    </S.Header>
  )
}
