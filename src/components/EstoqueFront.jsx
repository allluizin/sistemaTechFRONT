import Estoque from './components/Estoque'
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

<div className="alo">
<h1>TECHFLEX INDUSTRIA</h1>
<BrowserRouter>

<Nav variant='tabs'>
  <Nav.Link as={Link} to="/">Pagina inicial</Nav.Link>
  <Nav.Link as={Link} to="/estoque">Cadastro Estoque</Nav.Link>
  
</Nav>

<Routes>
  <Route path="/estoque" element={<Estoque/>}></Route>
</Routes>
</BrowserRouter>
</div>