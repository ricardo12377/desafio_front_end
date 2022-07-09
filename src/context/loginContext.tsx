import { createContext, ReactNode, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'
import { API_LOGIN } from '../endpoints/login'

//TIPAGEM PARA O LOGIN
import { Validation } from '../types/loginTypes'
//TIPAGEM PARA O  USUARIO COM TOKEN E ID
import { LoggedUserTypes } from '../types/loggedUserTypes'
import { LoginRequestOptions } from '../api-options/loginRequest'

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

  //FUNCAO PARA VALIDAR USUARIO NO LOCALSTORAGE
  const ValidateUser = ({ login, password }: Validation) => {
    const loggedUser: LoggedUserTypes = {
      id: '1',
      login,
      password,
    }

    const options = LoginRequestOptions(
      loggedUser.login,
      loggedUser.password,
      API_LOGIN
    )

    axios
      .request(options)
      .then(function (response) {
        localStorage.setItem('token', JSON.stringify(response.data.data.token))
        localStorage.setItem('user', JSON.stringify(loggedUser))
      })
      .catch(function (error) {
        console.error(error)
      })

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
