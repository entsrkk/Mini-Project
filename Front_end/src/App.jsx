import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Product from './pages/Product'
import Add from './pages/Add'
import Update from './pages/Update'


function App() {
  return (
    <BrowserRouter >
    <NavBar/>
      <div className="App">
        <Routes>
          <Route>
            <Route path='/' element={<Product />}></Route>
            <Route path='/add' element={<Add />}></Route>
            <Route path='/update/:_id' element={<Update />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
