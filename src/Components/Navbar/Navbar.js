import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import iconNavBar from "../../Pages/Homepage/icon-navbar.svg";
import Nav from "react-bootstrap/Nav";
import {Navbar} from "react-bootstrap";

const NavbarLayout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar bg="#00020F" className={"textoSansSerif"}>
                <Container fluid>
                    <Navbar.Brand className="navbar-logo align-items-center d-flex" style={{cursor: "pointer"}}>
                        <div onClick={() => (navigate("/homepage"))}>
                            <img
                                alt=""
                                src={iconNavBar}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <span className="me-3 textoSerif textoBold">myCookBook</span>
                        </div>

                        <Link
                            to="/adicionar"
                            className="btn btn-primary botaoNavBar botaoAdicionarReceita"
                            style={{textDecoration: 'none', color: 'inherit'}}
                        >
                            Adicionar Receita
                        </Link>
                    </Navbar.Brand>
                    <Nav>
                        <Link
                            to={`/usuario/${localStorage.getItem("userID")}`}
                            className="btn btn-secondary botaoNavBar botaoIrPerfilPessoal"
                            variant="secondary"
                        >
                            Ir para meu perfil
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarLayout;