import React, {useEffect, useState} from 'react';
import "./receita.css"
import {Container, Nav, Tab, Form, Modal} from "react-bootstrap";
import NavbarLayout from "../../Components/Navbar/Navbar";
import api from "../../services/api";
import {useParams} from "react-router-dom";
import ModuloControle from "./ModuloControle/ModuloControle";
import ilustracao from "./ilustracao-escolha.svg";
import Button from "react-bootstrap/Button";
import Adicionar from "../Adicionar/Adicionar";

const formatarReceita = (receita) => {



    const receitaFormatada = [];

    // Primeira versão da receita
    const primeiraVersao = {
        titulo: receita.titulo,
        ingredientes: receita.ingredientes,
        instrucoes: receita.instrucoes
    };
    receitaFormatada.push(primeiraVersao);

    // Versões adicionais da receita
    for (const versao of receita.versoesReceita) {
        const titulo = versao.titulo_versao;
        const ingredientes = JSON.parse(versao.ingredientes);
        const instrucoes = JSON.parse(versao.instrucoes);

        const versaoFormatada = {
            titulo,
            ingredientes,
            instrucoes
        };
        receitaFormatada.push(versaoFormatada);
    }

    return receitaFormatada;
}

const NovaPagReceita = () => {
    const [showModalEdicao, setShowModalEdicao] = useState(false);
    const botaoSalvarBotaoEdicao = () => {
        setShowModalEdicao(false)
    };

    const {id} = useParams()

    const [tituloReceita, setTituloReceita] = useState("Hello");
    const [versoesReceita, setVersoesReceita] = useState([]);
    const [dadosQuemSalvouReceita, setDadosQuemSalvouReceita] = useState([]);
    const [numLikes, setNumLikes] = useState(null);


    const [paginaEstaCarregando, switchPaginaCarregando] = useState(true);
    const [activeTab, setActiveTab] = useState('home');



    useEffect(() => {
        const idNovo = parseInt(id);
        api.get(`/receita/${idNovo}`).then((res) => {
            console.log(res.data.data);
            const tituloResponse = res.data.data.receita.titulo
            setTituloReceita(tituloResponse)

            let receitaFormatada = formatarReceita(res.data.data.receita);
            setVersoesReceita(receitaFormatada);

            setNumLikes(res.data.data.receita.num_likes);

            setDadosQuemSalvouReceita(res.data.data.usuariosQueSalvaramReceita);

            console.log(dadosQuemSalvouReceita);


            switchPaginaCarregando(false)

        })
    }, [paginaEstaCarregando, id])

    return !paginaEstaCarregando && (
        <div>
            <NavbarLayout/>

            <Modal show={showModalEdicao} onHide={botaoSalvarBotaoEdicao} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar título da receita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Adicionar idReceita={id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"botaoSalvarModalEdicao"} variant="primary" onClick={botaoSalvarBotaoEdicao}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container className={"textoSansSerif"}>
                <h1 className={"textoBold textoBlack my-4"}>{tituloReceita}</h1>


                <ModuloControle dadosReceita={{id, numLikes}} dadosQuemSalvouReceita={dadosQuemSalvouReceita}
                                useEffectTitulo={{tituloReceita, setTituloReceita}}/>

                <div>
                    <Tab.Container activeKey={activeTab} onSelect={(eventKey) => (setActiveTab(eventKey))}>
                        <Nav variant="pills">
                            {versoesReceita.map((element) => {
                                return (
                                    <div key={element.titulo}>
                                        <Nav.Item>
                                            <Nav.Link
                                                className={"botaoVersionamento"} eventKey={element.titulo}>{element.titulo} </Nav.Link>
                                        </Nav.Item>
                                    </div>

                                )
                            })}
                        </Nav>
                        <br/>
                        <Tab.Content className={"card card-body"}>
                            <Tab.Pane eventKey={"home"}>
                                <div className={"d-flex flex-column align-items-center p-3"}
                                     style={{display: "none"}}>
                                    <span className={"mb-4 textoSansSerif textoBlack"}>Escolha acima uma versão da receita </span>
                                    {<img src={ilustracao} style={{width: "25%"}}></img>}
                                </div>
                            </Tab.Pane>

                            {versoesReceita.map((element) => {
                                return (
                                    <Tab.Pane key={element.titulo} eventKey={element.titulo}>
                                        <h4 className={"mb-3"}>Ingredientes: </h4>
                                        {
                                            element.ingredientes.map((ingrediente, ingredienteIndex) => {
                                                return (
                                                    <Form.Check
                                                        className="mb-3 campoIngrediente"
                                                        type="checkbox"
                                                        label={ingrediente}
                                                        key={ingredienteIndex}
                                                    />
                                                );
                                            })
                                        }
                                        <h4 className={"mb-3"}>Modo de preparo: </h4>
                                        {
                                            element.instrucoes.map((instrucao, instrucoesIndex) => {
                                                return (
                                                    <Form.Check
                                                        className="mb-3 campoInstrucao"
                                                        type="checkbox"
                                                        label={instrucao}
                                                        key={instrucoesIndex}
                                                    />
                                                );
                                            })
                                        }
                                    </Tab.Pane>
                                )

                            })}
                        </Tab.Content>
                    </Tab.Container>
                </div>
                <br/>
            </Container>
        </div>
    );
};

export default NovaPagReceita;