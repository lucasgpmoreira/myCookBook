import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Container, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import BotaoReceita from "../../Components/botaoReceita";
import NavbarLayout from "../../Components/Navbar/Navbar";
import api from "../../services/api";

const Perfil = () => {

    const [dadosUsuario, setDadosUsuario] = useState({});
    const [receitasSalvas, setReceitasSalvas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const {id} = useParams();

    useEffect(() => (() => {

        api.get(`/usuario/${localStorage.getItem("userID")}`)
            .then((response) => {
                console.log("RESPONSE", response);
                const username = response.data.data.usuario.username
                const email = response.data.data.usuario.email
                let array = []
                response.data.data.usuariosQueSalvaramReceita.map(e => {
                    array.push(e.id)
                })
                setReceitasSalvas(array);
                setDadosUsuario({id: id, nomeDeUsuario: username, email: email})
                console.log("DADOS DO USUARIO", dadosUsuario)
                setCarregando(false);
            }).catch(e => {
            console.log(e)
            setCarregando(false)

        })
    }), [id, carregando])


    const navigate = useNavigate();
    useParams()
    return !carregando && (
        <>

            <div>
                <NavbarLayout/>
                <Container>
                    <div className={"d-flex align-items-center p-4 my-4 mx-2 gap-4 bg-secondary"}>
                        <img
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${dadosUsuario.nomeDeUsuario}&backgroundColor=ef476f,ffd166,06d6a0,118ab2,073b4c&fontWeight=800&fontFamily=Courier%20New&fontSize=60&radius=50`}
                            style={{width: "100px"}}/>
                        <div>
                            <h1 className={"textoSerif textoBold textoBlack mb-0"}>{dadosUsuario.nomeDeUsuario}</h1>
                            <span className={"textoSansSerif text-info"}>{dadosUsuario.email}</span>
                        </div>
                        <Button className={"botaoSairSite ms-auto"} onClick={() => {
                            localStorage.removeItem("userID")
                            localStorage.removeItem("token")
                            navigate("/login")
                        }}>Sair</Button>

                        <Button className={"botaoExcluirPerfil"} onClick={() => {
                            api.delete(`/usuario/${id}`).then(() => {
                                localStorage.removeItem("userID")
                                localStorage.removeItem("token")
                                navigate("/login")
                            })
                        }}>Excluir perfil </Button>
                    </div>

                    <h3 className={"textoSerif"}>Receitas salvas no seu livro de receitas:</h3>


                    {receitasSalvas.map((el) => (
                        <>
                            <BotaoReceita idReceita={el}/>
                        </>
                    ))}

                </Container>
            </div>
        </>
    );
};

export default Perfil;