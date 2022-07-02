import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { AiOutlineSearch } from 'react-icons/ai'

//TYPES
import { ItemListType } from '../../types/itemListTypes'
import { EditStatusType } from '../../types/editStatusType'
import { DetailedStoreTypes } from '../../types/detailedStore'

//ENDPOINTS
import { EDIT_STATUS } from '../../endpoints/editStatus'
import { GET_STORES } from '../../endpoints/getStores'

//HTTP-OPTIONS
import { FetchAllDataOptions } from '../../api-options/fetchAllData'
import { EditStatusOptions } from '../../api-options/editStatus'
import { GetByNameOptions } from '../../api-options/getByName'
import ItemList from '../../components/ItemList'

const Home = () => {
  //LISTA  GERAL
  const [stores, setStores] = useState<ItemListType[]>([])
  //STORE QUE IRÁ SER PEGO NO INPUT DE PESQUISA
  const [detailedStore, setDetailedStore] = useState<ItemListType[]>([])

  //PARAMETRO PARA FAZER REQUISICAO PELO INPUT DE NOME DESEJADO
  const [param, setParam] = useState<string>('')

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

  function HandleEditStatus(status: boolean) {
    //PEGANDO TOKEN
    const token = localStorage.getItem('token')?.toString()

    selectedItems.active = status

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

  //FAZENDO REQUISICAO PELO  NOME NO INPUT
  function RequestByName(value: string) {
    const token = localStorage.getItem('token')?.toString()

    if (token != null) {
      const options = GetByNameOptions(GET_STORES, value, token)

      //REQUISICAO
      axios
        .request(options)
        .then((response) => {
          setDetailedStore(response.data.data)
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
              onChange={(e) => setParam(e.target.value)}
            />
          </S.SearchContainer>

          <S.Buttons>
            <S.Action color="green" onClick={() => HandleEditStatus(true)}>
              Ativar
            </S.Action>
            <S.Action color="red" onClick={() => HandleEditStatus(false)}>
              Desativar
            </S.Action>
          </S.Buttons>
        </S.Header>

        <S.List>
          {detailedStore.length > 0
            ? detailedStore.map((item, index) => {
                return (
                  <ItemList
                    id={item.id}
                    name={item.name}
                    index={index}
                    active={item.active}
                    func={() => GetCheckedItems(item.id)}
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
                  />
                )
              })}
        </S.List>
      </S.Table>
    </S.Home>
  )
}

export default Home
