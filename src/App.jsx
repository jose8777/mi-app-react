import './App.css'
import {HashRouter, Route, Routes, Link} from "react-router-dom"
import PaginaInicio from './paginaInicio'
import PaginaFavoritos from './paginaFavoritos'

function App() {
  

  return (

    <HashRouter>

      <nav>

        <Link to="/">Inicio</Link> | {""}
        <Link to="/favoritos">Tus favoritos</Link> | {""}
       

        <Routes>
            <Route path="/" element={<PaginaInicio/>}></Route>
            <Route path="/favoritos" element={<PaginaFavoritos/>}></Route>
        </Routes>

      </nav>
    </HashRouter>
  )
}

export default App
