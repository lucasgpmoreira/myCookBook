import bg from './bg.svg'
import illustration from '../Login/illustration.svg';
import {Button, Container, Form, Toast} from "react-bootstrap";
import api from "../../services/api";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function CadastroPage() {
    const navigate = useNavigate();

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [campoEmail, setCampoEmail] = useState("");
    const [campoSenha, setCampoSenha] = useState("");
    const [campoUsername, setCampoUsername] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        let dadosUsuario = {
            username: campoUsername,
            email: campoEmail,
            password: campoSenha
        }
        api.post("/usuario", dadosUsuario).then((response)=>{
            navigate('/login');
        }).catch((err)=>{

        })
    }


    return (
        <>
            <Toast className={"ms-auto mt-3 me-5 textoSansSerif"} show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">MyCookBook</strong>
                </Toast.Header>
                <Toast.Body>Não foi possível cadastrar</Toast.Body>
            </Toast>

            <img src={bg} className={"img-bg"}/>
            <Container className={"position-absolute top-50 start-50 translate-middle"}>
                <div className={"row"}>
                    <div className={"col-md-6 d-flex align-items-center justify-content-center"}>
                        <img src={illustration}/>
                    </div>
                    <div className={"col-md-6 d-flex align-items-center justify-content-center coluna-cartao"}>
                        <div className={"card-login d-flex align-items-center textoSansSerif"}>
                            <h1 className={"textoSerif textoBold"}>myCookBook</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange={e => setCampoEmail(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicUsername">
                                    <Form.Label>Nome de usuário</Form.Label>
                                    <Form.Control type="text" placeholder="Nome de usuário" onChange={e => setCampoUsername(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Senha" onChange={e => setCampoSenha(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-4  text-center" controlId="formBasicEnter">
                                    <Button className={"botaoEntrar"} type="submit">
                                        Cadastrar
                                    </Button>
                                </Form.Group>
                            </Form>


                        </div>
                    </div>
                </div>

            </Container>
        </>
    );
}

export default CadastroPage;