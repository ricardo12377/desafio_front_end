import { Navigate, Route, Routes as RoutesSwitch } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

function PageRoutes() {
  return (
    <RoutesSwitch>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </RoutesSwitch>
  )
}

export default PageRoutes
