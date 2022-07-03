import * as S from './styles'

type ItemTypes = {
  index?: number
  name: string
  active: boolean | number
  id: number
  func?: any
  modalFunc?: any
}

export default function ItemList({
  index,
  name,
  active,
  func,
  modalFunc,
}: ItemTypes) {
  return (
    <S.ItemList key={index}>
      <S.Infos>
        <em>Nome: {name}</em>
        <em>Status: {active == 1 ? 'Active' : 'Inactive'}</em>
      </S.Infos>
      <input type="checkbox" onClick={func} />
      <S.Button onClick={modalFunc}>Modal</S.Button>
    </S.ItemList>
  )
}
