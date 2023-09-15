import React, {useState} from 'react';
import {Form, Button, InputGroup, Container, Navbar, Nav, Toast} from 'react-bootstrap';
import ilustracao from "./ilustracao.svg"
import "./Adicionar.css";
import api from "../../services/api";

function RecipeForm(props) {

    //const [keyInputIngrediente, setKeyInputIngrediente]
    let keyIngrediente = 0;
    let keyInstrucao = 0;

    const [ingredientes, setIngredientes] = useState(['']);
    const [instrucoes, setInstrucoes] = useState(['']);
    const [titulo, setTitulo] = useState("");

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const adicionaAoBancoDeDadosApi = (dados) => {
        console.log(dados);
        api.post("/receita", dados)
            .then((response) => toggleShowA())
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const adicionaNovaVersao = (dados) => {
        console.log(dados);
        api.post(`/receita${props.idReceita}/versoesreceita`, dados)
            .then((response) => toggleShowA())
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredientes];
        newIngredients[index] = value;
        setIngredientes(newIngredients);
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instrucoes];
        newInstructions[index] = value;
        setInstrucoes(newInstructions);
    };

    const addNewIngredient = () => {
        setIngredientes([...ingredientes, '']);
    };

    const addNewInstruction = () => {
        setInstrucoes([...instrucoes, '']);
    };

    const handleSubmit = () => {
        const idFic = 1;
        const recipeData = {
            titulo: titulo,
            id_autor: idFic,
            ingredientes: ingredientes,
            instrucoes: instrucoes,
        };
        console.log(recipeData)
        if (props.idReceita) {
            adicionaNovaVersao(recipeData)
        } else {
            adicionaAoBancoDeDadosApi(recipeData);
        }

        setTitulo("")
        setIngredientes([''])
        setInstrucoes([''])
    };

    return (
        <div className={"textoSansSerif"}>

            <Toast className={"ms-auto mt-3 me-5 textoSansSerif"} show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">MyCookBook</strong>
                </Toast.Header>
                <Toast.Body>Receita adicionada!</Toast.Body>
            </Toast>

            <div className={"backgroundAdd container-sm p-5 mt-5"}>
                <div className={"position-relative"}>
                    <img className={"position-absolute top-0 start-50 translate-middle"} src={ilustracao}/>
                </div>

                <div className={"d-flex justify-content-center"}>
                    <InputGroup className={"w-50 mb-5"}>
                        <Form.Control
                            value={titulo}
                            placeholder="Título"
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </InputGroup>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Label className={"fs-4 textoBold"}>Ingredientes:</Form.Label>
                    {ingredientes.map((ingredient, index) => (
                        <InputGroup className="mb-3">
                            <Form.Control
                                className={`inputIngrediente${keyIngrediente}`}
                                key={index}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                placeholder="Digite um ingrediente"
                            />
                            <Button className={`bg-light botaoAddIngrediente${keyIngrediente++}`} id="button-addon2"
                                    onClick={addNewIngredient}>
                                <i className="bi bi-plus-circle-dotted text-info"></i>
                            </Button>
                        </InputGroup>
                    ))}

                    <br/>
                    <Form.Label className={"fs-4 textoBold"}>Modo de Preparo:</Form.Label>
                    {instrucoes.map((instruction, index) => (
                        <InputGroup className="mb-3">
                            <Form.Control
                                className={`inputInstrucao${keyInstrucao}`}
                                key={index}
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                placeholder="Digite uma instrução"
                            />

                            <Button className={`bg-light botaoAddInstrucao${keyInstrucao++}`} id="button-addon2"
                                    onClick={addNewInstruction}>
                                <i className="bi bi-plus-circle-dotted text-info"></i>
                            </Button>
                        </InputGroup>
                    ))}
                    <br/>
                    <div className={"d-flex justify-content-center align-items-center"}>
                        <Button className={"botaoEnviar"} variant="primary" onClick={handleSubmit}
                                style={{color: "white", fontWeight: "bold"}}>
                            <i className="bi bi-plus-circle-fill me-2"></i>
                            Adicionar
                        </Button>
                    </div>

                </Form>

            </div>
        </div>
    );
}

export default RecipeForm;