import axios from 'axios'
import { useContext, useState } from 'react'
import { AppContext } from '../../context/appContext'
import * as S from './styles'
import ReactLoading from 'react-loading'

//TYPES
import { EditStatusType } from '../../types/editStatusType'
import { DetailedStoreTypes } from '../../types/detailedStore'

//ENDPOINTS
import { EDIT_STATUS } from '../../endpoints/editStatus'

//HTTP-OPTIONS
import { EditStatusOptions } from '../../api-options/editStatus'

//COMPONENTS
import Modal from '../../components/modal'
import ItemList from '../../components/ItemList'
import Header from '../../components/header'
import { LayoutContext } from '../../context/layoutContext'

const Home = () => {
  const [actions, setActions] = useState(false)
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

  const { stores } = useContext(AppContext)
  const { setModal, setLoading, loading, modal } = useContext(LayoutContext)

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

  return loading === true ? (
    <S.LoadingPage>
      <ReactLoading type="spin" color="black" height={667} width={375} />
    </S.LoadingPage>
  ) : (
    <S.Home>
      <S.Table>
        <Header
          param={setParam}
          actions={actions}
          active={() => HandleEditStatus(true)}
          desactive={() => HandleEditStatus(false)}
        />
        <S.List>
          {stores
            .filter((item) => {
              if (param === '') {
                return item
              } else if (
                item.name.toLowerCase().includes(param.toLowerCase())
              ) {
                return item
              }
            })
            .map((item, index) => {
              return (
                <ItemList
                  id={item.id}
                  name={item.name}
                  index={index}
                  active={item.active}
                  setModalItem={setModalItem}
                  items={selectedItems}
                  actions={setActions}
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
