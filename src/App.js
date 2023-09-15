import './Pages/Login/Login.css';
import LoginPage from "./Pages/Login/Login";
import CadastroPage from "./Pages/Cadastro/Cadastro";
import Homepage from "./Pages/Homepage/Homepage";
import {BrowserRouter, Route, Routes, Outlet, useNavigate} from "react-router-dom";
import Adicionar from "./Pages/Adicionar/Adicionar";
import Perfil from "./Pages/Perfil/Perfil";
import Receita from "./Pages/PagReceita/Receita";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import iconNavBar from './Pages/Homepage/icon-navbar.svg';
import PrivateRoute from "./Private/PrivateRoute";
import NovaPagReceita from "./Pages/PagReceita/NovaPagReceita";
import {useEffect} from "react";

function App() {

    return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/cadastro" element={<CadastroPage/>}/>
                <Route exact path='/' element={<PrivateRoute/>}>
                    <Route path="/homepage" element={<Homepage/>}/>
                    <Route path="/adicionar" element={<Adicionar/>}/>
                    <Route path="/usuario/:id" element={<Perfil/>}/>
                    <Route path="/receita/:id" element={<NovaPagReceita/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App;
