import React, {useEffect, useState} from 'react';
import {Container, Form, Modal, Nav, Tab} from "react-bootstrap";
import ilustracao from "./ilustracao-escolha.svg"
import "./receita.css"

import dadosReceita from "../../receitas.json"
import {useParams} from "react-router-dom";
import ModuloControle from "./ModuloControle/ModuloControle";
import api from "../../services/api";


function Receita() {
    const {id} = useParams()
    const [activeTab, setActiveTab] = useState('home');
    const [carregando, setCarregando] = useState(true);


    const [idReceita, setIdReceita] = useState(-1);
    const [tituloReceita, setTituloReceita] = useState("");
    const [numLikes, setNumLikes] = useState(-1);
    const [versoesReceita, setVersoesReceita] = useState([{titulo: "", ingredientes: [], instrucoes: []}]);
    const [dadosQuemSalvouReceita, setDadosQuemSalvouReceita] = useState([])

    const buscaDadosReceita = (id) => {
        //TODO trocar dados receita.map pela chamada à API na rota do ID
        api.get(`/receita/${id}`).then((res) => {
            console.log(res);
            setIdReceita(res.data.data.receita.id);
            setTituloReceita(res.data.data.receita.titulo);
            setNumLikes(res.data.data.receita.num_likes);
            const ingredientes = res.data.data.receita.ingredientes;
            const instrucoes = res.data.data.receita.instrucoes;
            const novaVersaoReceita = res.data.data.receita.versoesReceita;
            novaVersaoReceita.unshift({ingredientes, instrucoes})
            setVersoesReceita(novaVersaoReceita);
            console.log("chamada", versoesReceita);
            setCarregando(false)
            console.log(res.data.data.usuariosQueSalvaramReceita);
            setDadosQuemSalvouReceita(res.data.data.usuariosQueSalvaramReceita)
            console.log(dadosQuemSalvouReceita);
        })
    }


    useEffect(() => {
        buscaDadosReceita(parseInt(id))
    }, [])


    return (
        <>
            {
                !carregando ? (
                    <div>
                        <Container className={"textoSansSerif"}>
                            <h1 className={"textoBold textoBlack my-4"}>{tituloReceita}</h1>


                            { !carregando ?
                                <ModuloControle dadosReceita={{id, numLikes}} dadosQuemSalvouReceita={dadosQuemSalvouReceita}
                                                useEffectTitulo={{tituloReceita, setTituloReceita}}/> : <div></div>
                            }
                            <div>
                                <Tab.Container activeKey={activeTab} onSelect={(eventKey) => (setActiveTab(eventKey))}>
                                    <Nav variant="pills">
                                        {versoesReceita.map((element) => {
                                            return (
                                                <Nav.Item>
                                                    <Nav.Link
                                                        eventKey={element.titulo_versao}>{element.titulo_versao}</Nav.Link>
                                                </Nav.Item>
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

                                        {console.log("ee", versoesReceita)}
                                        {
                                            versoesReceita.map((element, index) => {
                                                console.log("El", element);
                                                element.ingredientes.map((e, ingredienteIndex) => {
                                                    return (
                                                        <div>e</div>
                                                        /*<Form.Check
                                                            className="mb-3"
                                                            type="checkbox"
                                                            label={e}
                                                            key={ingredienteIndex}
                                                        />*/
                                                    );
                                                })
                                            })
                                        }
                                        {/*versoesReceita.map((element, index) => {
                                            console.log("ELEMENTO VERSOES", element);
                                            return (
                                                <Tab.Pane eventKey={element.titulo} key={index}>
                                                    <h3 className="textoSansSerif textoBold mb-3">Ingredientes</h3>
                                                    {element.map((ingrediente, ingredienteIndex) => (
                                                        <Form.Check
                                                            className="mb-3"
                                                            type="checkbox"
                                                            label={ingrediente}
                                                            key={ingredienteIndex}
                                                        />
                                                    ))}

                                                    <hr />
                                                    <h3 className="textoSansSerif textoBold mb-3">Modo de Preparo</h3>
                                                    {element.instrucoes.map((instrucao, instrucaoIndex) => (
                                                        <Form.Check
                                                            className="mb-3"
                                                            type="checkbox"
                                                            label={instrucao}
                                                            key={instrucaoIndex}
                                                        />
                                                    ))}
                                                </Tab.Pane>
                                            );
                                        })}*/}

                                        {/*
                                {versoesReceita.map((value, index) => (
                                    <Tab.Pane eventKey={value.tituloVersao}>
                                        <h3 className={"textoSansSerif textoBold mb-3"}>Ingredientes</h3>
                                        {versoesReceita.at(index).ingredientes.map(ingrediente => (
                                            <Form.Check className={"mb-3"} // prettier-ignore
                                                        type={"checkbox"}
                                                        label={ingrediente}
                                            />))}


                                        <hr/>
                                        <h3 className={" textoSansSerif textoBold mb-3"}>Modo de Preparo</h3>
                                        {versoesReceita.at(index).instrucoes.map(instrucao => (
                                            <Form.Check className={"mb-3"} // prettier-ignore
                                                        type={"checkbox"}
                                                        label={instrucao}
                                            />
                                        ))}
                                    </Tab.Pane>
                                ))}*/}
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                            <br/>
                        </Container>
                    </div>
                ) : (<> </>
                )
            }
        </>
    );

}

export default Receita;