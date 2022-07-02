import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import * as S from './styles'
import { AiOutlineSearch } from 'react-icons/ai'

//TYPES
import { ItemListType } from '../../types/itemListTypes'
import { EditStatusType } from '../../types/editStatusType'
import { DetailedStoreTypes } from '../../types/detailedStore'

//ENDPOINTS
import { EDIT_STATUS } from '../../endpoints/editStatus'
import { REQUEST_BY_NAME } from '../../endpoints/requesByName'
import { GET_STORES } from '../../endpoints/getStores'

//HTTP-OPTIONS
import { FetchAllDataOptions } from '../../api-options/fetchAllData'
import { EditStatusOptions } from '../../api-options/editStatus'
import { GetByNameOptions } from '../../api-options/getByName'
import { LoginContext } from '../../context/loginContext'

const Home = () => {
  //LISTA  GERAL
  const [stores, setStores] = useState<ItemListType[]>([])
  //STORE QUE IRÁ SER PEGO NO INPUT DE PESQUISA
  const [detailedStore, setDetailedStore] = useState<DetailedStoreTypes>({
    id: 0,
    name: '',
    active: false,
    address: '',
  })

  //PARAMETRO PARA FAZER REQUISICAO PELO INPUT DE NOME DESEJADO
  const [param, setParam] = useState<number>(0)

  //OBJETO QUE IRÁ FAZER  A REQUISICAO PUT PARA ATIVAR OU DESATIVAR ITEMS
  let selectedItems: EditStatusType = {
    ids: [],
    active: false,
  }

  //PEGANDO OS DADOS ---> GET <---- PARA PREENCHER A LISTA
  function FetchData() {
    //PEGANDO O TOKEN DE AUTORIZACAO
    const token = localStorage.getItem('token')?.toString()

    //VALIDANDO PARA NAO TER PERIGO DE TENTAR FAZER REQUISICAO SEM TOKEN
    if (token != null) {
      const myOptions = FetchAllDataOptions(GET_STORES, token)
      //REQUISICAO
      axios
        .request(myOptions)
        .then(function (response) {
          setStores(response.data.data)
          console.log(stores)
        })
        .catch((err) => console.log(err))
    }
  }

  //ESSA FUNCAO IRA ADMINISTRAR OS NUMEROS DO ARRAY PARA FAZER O PUT
  function GetCheckedItems(item: number) {
    //CONDICAO PARA NAO TER ID'S REPETIDOS NO ARRAY DO BODY
    if (selectedItems.ids.includes(item)) {
      //PEGANDO O INDEX PARA REMOVER DO ARRAY CASO CLICADO DNV EM UM CHECKBOX MARCADO
      let index = selectedItems.ids.findIndex((el) => el == item)
      //REMOVENDO
      selectedItems.ids.splice(index, 1)
      console.log(selectedItems.ids)
      return true
    }
    //SE O ITEM AINDA NAO TIVER NO ARRAY DE IDS, SERA ACRESCENTADO COM O METODO PUSH
    selectedItems.ids.push(item)
    console.log(selectedItems.ids)
  }

  function HandleEditStatus() {
    //PEGANDO TOKEN
    const token = localStorage.getItem('token')?.toString()

    if (token != null) {
      const myOptions = EditStatusOptions(EDIT_STATUS, token, selectedItems)
      //REQUISICAO
      axios
        .request(myOptions)
        .then(function (response) {
          console.log(response)
        })
        .catch((err) => console.log(err))
    }
  }

  //HOOK PARA PEGAR O ID DO NOME DIGITADO NO INPUT => O PARAM IRA SER USADO NA FUNCAO REQUESTBYNAME LOGO ABAIXO
  function GetId(e: string) {
    stores.map((item) => {
      if (item.name.includes(e)) {
        setParam(item.id)
      }
    })
  }

  //FAZENDO REQUISICAO PELO  NOME NO INPUT
  function RequestByName(param: number) {
    const token = localStorage.getItem('token')?.toString()

    if (token != null) {
      const myOptions = GetByNameOptions(REQUEST_BY_NAME, token, param)

      //REQUISICAO
      axios
        .request(myOptions)
        .then(function (response) {
          setDetailedStore(response.data)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    FetchData()
  }, [])

  return (
    <S.Home>
      <S.Table>
        <S.Header>
          <S.SearchContainer>
            <div onClick={() => RequestByName(param)}>
              <AiOutlineSearch size={30} color="white" />
            </div>
            <input
              placeholder="Procure pelo nome"
              onChange={(e) => GetId(e.target.value)}
            />
          </S.SearchContainer>

          <S.Buttons>
            <S.Action color={'green'} onClick={() => HandleEditStatus()}>
              Ativar
            </S.Action>
            <S.Action color="red" onClick={() => HandleEditStatus()}>
              Desativar
            </S.Action>
          </S.Buttons>
        </S.Header>

        <S.List>
          {detailedStore.name !== '' ? (
            <S.ItemList>
              <div>
                <em>Nome: {detailedStore.name}</em>
                <em>
                  Status: {detailedStore.active == 1 ? 'Active' : 'Inactive'}
                </em>
              </div>
              <input
                type="checkbox"
                value={detailedStore.id}
                onClick={() => GetCheckedItems(detailedStore.id)}
              />
            </S.ItemList>
          ) : (
            stores.map((item) => {
              return (
                <S.ItemList>
                  <div>
                    <em>Nome: {item.name}</em>
                    <em>Status: {item.active == 1 ? 'Active' : 'Inactive'}</em>
                  </div>
                  <input
                    type="checkbox"
                    value={item.id}
                    onClick={() => GetCheckedItems(item.id)}
                  />
                </S.ItemList>
              )
            })
          )}
        </S.List>
      </S.Table>
    </S.Home>
  )
}

export default Home
