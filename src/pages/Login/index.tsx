import { useContext, useState } from 'react'
import * as S from './styles'
import * as yup from 'yup'
import { LoginContext } from '../../context/loginContext'
import { Validation } from '../../types/loginTypes'

const Login = () => {
  const { ValidateUser } = useContext(LoginContext)

  const [login, setLogin] = useState<Validation>({
    login: '',
    password: '',
  })

  //CRIANDO AS VALIDACOES DO LOGIN COM O YUP - CASO NAO VALIDE RETORNA UM ALERT NA FUNCAO LOGO ABAIXO
  const loginSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  })

  //PEGAR OS VALORES DOS INPUTS DE FORMA DINAMICA
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  //FUNCAO PARA PROSSEGUIR COM O LOGIN E RODAR A FUNCAO DO TOKEN OU LANCAR UM ALERTA NO SISTEMA
  function Execute() {
    loginSchema.isValid(login).then((response) => {
      if (response === true) {
        ValidateUser(login)
      } else {
        alert('LOGIN INVALIDO TENTE NOVAMENTE')
      }
    })
  }

  return (
    <S.LoginPage>
      <S.Form>
        <S.Title>Login</S.Title>
        <S.FieldLabel>
          <em>Usuário:</em>
          <S.InputValue
            type="text"
            name="login"
            value={login.login}
            onChange={(e) => HandleChange(e)}
          />
        </S.FieldLabel>

        <br />

        <S.FieldLabel>
          <em>Senha:</em>
          <S.InputValue
            type="password"
            name="password"
            value={login.password}
            onChange={(e) => HandleChange(e)}
          />
        </S.FieldLabel>

        <br />
        <S.Button type="submit" onClick={Execute}>
          Login
        </S.Button>
        <S.Button>teste</S.Button>
      </S.Form>
    </S.LoginPage>
  )
}

export default Login
