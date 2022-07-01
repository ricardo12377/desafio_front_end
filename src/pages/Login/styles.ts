import styled from 'styled-components'

export const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #020923;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  background-color: #323345;
  height: 50%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: bolder;
`

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 25px;
`

export const InputValue = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
`

export const Button = styled.button`
  background-color: #020923;
  color: white;
  width: 40%;
  height: 35px;
  font-size: 20px;
  border: 2px solid white;
  border-radius: 15px;
`
