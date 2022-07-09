import axios from 'axios'
import { useContext } from 'react'
import { GetOneItemOptions } from '../../api-options/getOneItem'
import { LayoutContext } from '../../context/layoutContext'
import { GET_DETAILED_STORE } from '../../endpoints/detailedStore'
import { DetailedStoreTypes } from '../../types/detailedStore'
import { EditStatusType } from '../../types/editStatusType'
import * as S from './styles'

type ItemTypes = {
  index?: number
  name: string
  active: boolean | number
  id: number
  items: EditStatusType
  actions: (value: boolean) => void
  setModalItem: (value: DetailedStoreTypes) => void
}

export default function ItemList({
  index,
  name,
  active,
  id,
  items,
  actions,
  setModalItem,
}: ItemTypes) {
  const { setLoading, setModal } = useContext(LayoutContext)

  //ADICIONA OU REMOVE ITEMS DA LISTA DE IDS PARA REQUISICAO PUT
  function GetCheckedItems(item: number) {
    if (items.ids.includes(item)) {
      let index = items.ids.findIndex((el) => el == item)
      items.ids.splice(index, 1)
      return true
    }

    items.ids.push(item)
    if (items.ids.length > 0) actions(true)
  }

  //ATIVA O MODAL E PEGA AS INFORMACOES DO ITEM QUE IRÁ PARA O MODAL
  function HandleModalItem(id: number) {
    setLoading(true)
    const token = localStorage.getItem('token')?.toString()
    if (token != null) {
      const options = GetOneItemOptions(GET_DETAILED_STORE, token, id)

      axios
        .request(options)
        .then((response) => setModalItem(response.data.data))
        .then(() => setModal(true))
        .then(() => setLoading(false))
        .catch((err) => console.log(err))
    }
  }

  return (
    <S.ItemList key={index}>
      <S.Infos>
        <em>Nome: {name}</em>
        <em>Status: {active == 1 ? 'Active' : 'Inactive'}</em>
      </S.Infos>
      <input type="checkbox" onClick={() => GetCheckedItems(id)} />
      <S.Button onClick={() => HandleModalItem(id)}>Modal</S.Button>
    </S.ItemList>
  )
}
