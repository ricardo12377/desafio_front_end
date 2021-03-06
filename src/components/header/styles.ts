import styled from 'styled-components'

export const Header = styled.div`
  height: 10%;
  border: 2px solid white;
  width: 98%;
  margin-top: 1em;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 40%;
  font-size: 20px;

  input {
    height: 35px;
    width: 70%;
    background-color: #323345;
    font-size: 18px;
  }

  div {
    cursor: pointer;
  }
`

export const Buttons = styled.div`
  width: 15%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const Action = styled.button`
  width: 40%;
  height: 100%;
  background-color: ${(props) => props.color};
  color: black;
  font-size: 15px;
  border: 2px solid white;
  cursor: pointer;
`
