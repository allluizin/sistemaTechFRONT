import { useState } from 'react'
import Estoque from './components/Estoque'
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import {Nav} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    // <div className="alo">
    //   <h1>TECHFLEX INDUSTRIA</h1>
    //   <BrowserRouter>

    //   <Nav variant='tabs'>
    //     <Nav.Link as={Link} to="/">Pagina inicial</Nav.Link>
    //     <Nav.Link as={Link} to="/estoque">Cadastro Estoque</Nav.Link>
    //     <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
    //   </Nav>
    //   <Routes>

    //     <Route path="" element={<Home/>}></Route>
    //     <Route path="/estoque" element={<Estoque/>}></Route>
    //     <Route path="/sobre" element={<Sobre/>}></Route>

    //   </Routes>
    //   </BrowserRouter>
    //   </div>
    <div className="container">
      <header>
        <p>TECHFLEX</p>
      </header>
      <main>
        <section className='box-titulo'>
          <h1>TechFlex Industria e Comercio LTDA</h1>
          <p>Sistema de controle de estoque e entrada e saída de material</p>
          <div className="buttons">
            <a href="#login">Faça Login</a>
            <a href="#login">Cadastre-se</a>
          </div>
        </section>
        <section className='box-requisitos'>
          <h2>Instruções</h2>
          <p>Veja abaixo as instruções para usar o sistema:</p>
          <div className='box-cards'>
            <div className="card">
              <h3>Login específico</h3>
              <p>Cada área tem seu login</p>
            </div>
            <div className="card">
              <h3>Administrativo</h3>
              <p>Controle de estoque e entradas e saidas de material</p>
            </div>
            <div className="card">
              <h3>Operacional</h3>
              <p>Lançamentos de produção diária</p>
            </div>
            <div className="card">
              <h3>Chefia</h3>
              <p>Controle de todos os links</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
         <p>TechFlex Industria de Embalagens</p>
      </footer>
    </div>
  )
}

export default App;
