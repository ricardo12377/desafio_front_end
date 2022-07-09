import axios from 'axios'
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { FetchAllDataOptions } from '../api-options/fetchAllData'
import { GET_STORES } from '../endpoints/getStores'
import { ItemListType } from '../types/itemListTypes'

interface ProviderProps {
  children: ReactNode
}

interface AppProps {
  stores: ItemListType[]
}

export const AppContext = createContext({} as AppProps)

export function AppProvider({ children }: ProviderProps) {
  const [stores, setStores] = useState<ItemListType[]>([])

  //PEGANDO OS DADOS ---> GET <---- PARA PREENCHER A LISTA
  const data = useCallback(() => {
    const token = localStorage.getItem('token')?.toString()
    if (token != null) {
      const myOptions = FetchAllDataOptions(GET_STORES, token)

      axios
        .request(myOptions)
        .then((response) => setStores(response.data.data))
        .catch((err) => console.log(err))
    }
  }, [])

  useEffect(() => {
    data()
  }, [])

  return (
    <AppContext.Provider value={{ stores }}>{children}</AppContext.Provider>
  )
}
