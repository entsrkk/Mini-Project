import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Product from './pages/Product'
import Add from './pages/Add'
import Update from './pages/Update'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import AdminRoute from './pages/AdminRoute';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Product />}></Route>
          <Route path="/add" element={
            <AdminRoute>
              <Add />
            </AdminRoute>
          }></Route>
          <Route path='/update/:_id' element={<Update />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
