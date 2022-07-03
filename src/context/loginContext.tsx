import { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'
import { API_LOGIN } from '../endpoints/login'

//TIPAGEM PARA O LOGIN
import { Validation } from '../types/loginTypes'
//TIPAGEM PARA O  USUARIO COM TOKEN E ID
import { LoggedUserTypes } from '../types/loggedUserTypes'

//TIPAGEM DA PROPS DO PROVIDER - > USADO NA LINHA 24
type UserContextProps = {
  children: ReactNode
}

//TIPAGEM DE TODAS AS FUNÇÔES E ESTADOS QUE IRÂO SER PASSADAS NO VALUE DO PROVIDER
type ContextType = {
  user: LoggedUserTypes
  ValidateUser: ({ login, password }: Validation) => void
}

export const LoginContext = createContext<ContextType>({} as ContextType)

export const LoginProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState({} as LoggedUserTypes)

  const navigate = useNavigate()

  //ESSE USE EFFECT IRA CHECAR SE O LOCAL STORAGE  TEM UM USUARIO, SE  NAO TIVER ELE  VOLTA PRA PAGINA DE LOGIN
  //SE TIVER UM USUARIO ELE IRA APENAS SETAR O USUARIO CASO QUEIRA INTERAGIR COM O USUARIO ATUAL
  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    } else {
      navigate('/login')
    }
  }, [])

  const ValidateUser = ({ login, password }: Validation) => {
    //CRIANDO O USUARIO QUE IRÁ SER LOGADO
    const loggedUser: LoggedUserTypes = {
      id: '1',
      login,
      password,
    }

    //CONFIGURAÇOES DA REQUISIÇAO PARA OBTER O TOKEN
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: API_LOGIN,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: { username: loggedUser.login, password: loggedUser.password },
    }

    //FAZENDO A REQUISIÇAO PARA RECEBER O TOKEN E ATRIBUIR AO USUARIO QUE SERA LOGADO
    axios
      .request(options)
      .then(function (response) {
        //PEGANDO O TOKEN E ADICIONANDO  NO LOCAL STORAGE JUNTO COM O USUARIO ATUAL
        localStorage.setItem('token', JSON.stringify(response.data.data.token))
        localStorage.setItem('user', JSON.stringify(loggedUser))
      })
      .catch(function (error) {
        console.error(error)
      })

    //localStorage.setItem('user', JSON.stringify(loggedUser))
    if (loggedUser) {
      //APENAS  SETANDO UM USER GLOBAL CASO QUEIRA FAZER INTERAÇÔES COM ELE EM OUTRAS PAGINAS
      setUser(loggedUser)
      //REDIRECIONANDO O USUARIO PARA A PAGINA PRINCIPAL
      navigate('/home')
    }
  }

  return (
    <LoginContext.Provider
      value={{
        user,
        ValidateUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
