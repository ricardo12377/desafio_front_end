import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/loginContext'
import PagesRoutes from './routes'
import './globalstyles/globalStyles.css'

const App = () => {
  return (
    //ENCAPSULANDO O APLICATIVO COM O REACT-ROUTER-DOM E O CONTEXTO
    <BrowserRouter>
      <LoginProvider>
        <PagesRoutes />
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
