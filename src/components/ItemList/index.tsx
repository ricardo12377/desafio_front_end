import * as S from './styles'

type ItemTypes = {
  index?: number
  name: string
  active: boolean | number
  id: number
  func: any
}

export default function ItemList({ index, name, active, id, func }: ItemTypes) {
  return (
    <S.ItemList key={index}>
      <S.Infos>
        <em>Nome: {name}</em>
        <em>Status: {active == 1 ? 'Active' : 'Inactive'}</em>
      </S.Infos>
      <input type="checkbox" value={id} onClick={func} />
    </S.ItemList>
  )
}
