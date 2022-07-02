import * as S from './styles'
import { DetailedStoreTypes } from '../../types/detailedStore'

type ModalTypes = {
  id: number
  name: string
  address: string
  buttonName: string
  active: boolean | number
  closeModal?: any
}

export default function Modal({
  id,
  name,
  active,
  address,
  buttonName,
  closeModal,
}: ModalTypes) {
  return (
    <S.Modal>
      <S.Infos>Id: {id}</S.Infos>
      <S.Infos>Name: {name}</S.Infos>
      <S.Infos>Active: {active}</S.Infos>
      <S.Address>Address: {address}</S.Address>

      <S.Button onClick={closeModal}>{buttonName}</S.Button>
    </S.Modal>
  )
}
