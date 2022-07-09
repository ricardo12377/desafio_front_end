import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/loginContext'
import { AppProvider } from './context/appContext'
import { LayoutProvider } from './context/layoutContext'
import PagesRoutes from './routes'
import './globalstyles/globalStyles.css'

const App = () => {
  return (
    //ENCAPSULANDO O APLICATIVO COM O REACT-ROUTER-DOM E O CONTEXTO
    <BrowserRouter>
      <LoginProvider>
        <AppProvider>
          <LayoutProvider>
            <PagesRoutes />
          </LayoutProvider>
        </AppProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
