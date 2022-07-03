import styled from 'styled-components'

export const Modal = styled.div`
  width: 400px;
  height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  color: #020923;
  position: absolute;
  align-items: center;
  justify-content: center;
  gap: 1em;
`

export const Infos = styled.div`
  font-weight: bolder;
  display: flex;
  width: 90%;
  height: 25px;
  border: 2px solid black;
`

export const Address = styled.div`
  font-weight: bolder;
  display: flex;
  width: 90%;
  height: 70px;
  border: 2px solid black;
`

export const Button = styled.button`
  width: 60%;
  height: 30px;
  background-color: #020923;
  color: white;
  border: 2px solid black;
  border-radius: 15px;
  cursor: pointer;
`
