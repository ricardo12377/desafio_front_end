import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import * as S from './styles'
import { AiOutlineSearch } from 'react-icons/ai'
import ReactLoading from 'react-loading'

//TYPES
import { ItemListType } from '../../types/itemListTypes'
import { EditStatusType } from '../../types/editStatusType'
import { DetailedStoreTypes } from '../../types/detailedStore'

//ENDPOINTS
import { EDIT_STATUS } from '../../endpoints/editStatus'
import { GET_STORES } from '../../endpoints/getStores'
import { GET_DETAILED_STORE } from '../../endpoints/detailedStore'

//HTTP-OPTIONS
import { FetchAllDataOptions } from '../../api-options/fetchAllData'
import { EditStatusOptions } from '../../api-options/editStatus'
import { GetByNameOptions } from '../../api-options/getByName'
import { GetOneItemOptions } from '../../api-options/getOneItem'

//COMPONENTS
import Modal from '../../components/modal'
import ItemList from '../../components/ItemList'

const Home = () => {
  const [actions, setActions] = useState(false)
  const [stores, setStores] = useState<ItemListType[]>([])
  const [filtredStore, setFiltredStore] = useState<ItemListType[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState<boolean>(false)
  const [param, setParam] = useState<string>('')
  const [modalItem, setModalItem] = useState<DetailedStoreTypes>({
    name: '',
    id: 0,
    address: '',
    active: 0,
  })
  const [selectedItems, setSelectedItems] = useState<EditStatusType>({
    ids: [],
    active: false,
  })

  //PEGANDO OS DADOS ---> GET <---- PARA PREENCHER A LISTA
  function FetchData() {
    const token = localStorage.getItem('token')?.toString()
    if (token != null) {
      const myOptions = FetchAllDataOptions(GET_STORES, token)

      axios
        .request(myOptions)
        .then((response) => setStores(response.data.data))
        .catch((err) => console.log(err))
    }
  }

  //ADICIONA OU REMOVE ITEMS DA LISTA DE IDS PARA REQUISICAO PUT
  function GetCheckedItems(item: number) {
    if (selectedItems.ids.includes(item)) {
      let index = selectedItems.ids.findIndex((el) => el == item)
      selectedItems.ids.splice(index, 1)
      return true
    }

    selectedItems.ids.push(item)
    if (selectedItems.ids.length > 0) setActions(true)
  }

  //FUNCAO PARA EDITAR OS STATUS DOS ITEMS SELECIONADOS PELO CHECKBOX
  function HandleEditStatus(status: boolean) {
    setLoading(true)
    const token = localStorage.getItem('token')?.toString()
    selectedItems.active = status

    if (token != null) {
      const myOptions = EditStatusOptions(EDIT_STATUS, token, selectedItems)

      axios
        .request(myOptions)
        .then((response) => console.log(response))
        .then(() => setLoading(false))
        .then(() => document.location.reload())
        .catch((err) => console.log(err))
    }
  }

  //FUNCAO PARA FAZER O RESQUEST NA API PELO NOME DO INPUT
  function RequestByName(value: string) {
    const token = localStorage.getItem('token')?.toString()
    if (token != null) {
      const options = GetByNameOptions(GET_STORES, value, token)

      axios
        .request(options)
        .then((response) => {
          setFiltredStore(response.data.data)
        })
        .catch((err) => console.log(err))
    }
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

  useEffect(() => {
    setTimeout(() => {
      FetchData()
    }, 200)
  }, [])

  return loading === true ? (
    <S.LoadingPage>
      <ReactLoading type="spin" color="black" height={667} width={375} />
    </S.LoadingPage>
  ) : (
    <S.Home>
      <S.Table>
        <S.Header>
          <S.SearchContainer>
            <div onClick={() => RequestByName(param)}>
              <AiOutlineSearch size={30} color="white" />
            </div>
            <input
              placeholder="Procure pelo nome"
              onChange={(e) => setParam(e.target.value)}
            />
          </S.SearchContainer>

          {actions ? (
            <S.Buttons>
              <S.Action color="green" onClick={() => HandleEditStatus(true)}>
                Ativar
              </S.Action>
              <S.Action color="red" onClick={() => HandleEditStatus(false)}>
                Desativar
              </S.Action>
            </S.Buttons>
          ) : null}
        </S.Header>

        <S.List>
          {filtredStore.length > 0
            ? filtredStore.map((item, index) => {
                return (
                  <ItemList
                    id={item.id}
                    name={item.name}
                    index={index}
                    active={item.active}
                    func={() => GetCheckedItems(item.id)}
                    modalFunc={() => HandleModalItem(item.id)}
                  />
                )
              })
            : stores.map((item, index) => {
                return (
                  <ItemList
                    id={item.id}
                    name={item.name}
                    index={index}
                    active={item.active}
                    func={() => GetCheckedItems(item.id)}
                    modalFunc={() => HandleModalItem(item.id)}
                  />
                )
              })}
        </S.List>
        {modal ? (
          <Modal
            name={modalItem?.name}
            active={modalItem.active}
            address={modalItem.address}
            id={modalItem.id}
            buttonName="Fechar"
            closeModal={() => setModal(false)}
          />
        ) : null}
      </S.Table>
    </S.Home>
  )
}

export default Home
