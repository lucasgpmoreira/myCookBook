import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Form, Modal} from "react-bootstrap";
import api from "../../../services/api";
import {useNavigate} from "react-router-dom";

const ModuloControle = (props) => {
    const navigate = useNavigate();

    const CampoUsuarioPorReceita = (props) => (
        <>
            <div
                className={"d-flex justify-content-between align-items-center px-0 py-1 campoUsuarioQueSalvouUmaReceita"}>
                <div>
                    <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.nomeDeUsuario}&backgroundColor=ef476f,ffd166,06d6a0,118ab2,073b4c&fontWeight=800&fontFamily=Courier%20New&fontSize=60&radius=50`}
                        style={{width: "35px"}}
                        className={"me-2"}
                    />
                    <span>{props.nomeDeUsuario}</span>
                </div>
            </div>
            <hr/>
        </>
    )


    const [numLikes, setNumLikes] = useState(props.dadosReceita.numLikes)
    const [deuLike, setLiked] = useState(false);
    const [salvouReceita, setSalvarReceita] = useState(false);


    const [showModalEdicao, setShowModalEdicao] = useState(false);
    const botaoSalvarBotaoEdicao = () => {
        const idReceita = parseInt(props.dadosReceita.id);
        setShowModalEdicao(false)
        api.put(`receita/${idReceita}`, {titulo: props.useEffectTitulo.tituloReceita}).then(res => console.log(res))
    };
    const handleShowModalEdicao = () => {
        setShowModalEdicao(true);
    };

    const acionaLike = () => {
        if (!deuLike) {
            api.put(`receita/${props.dadosReceita.id}/likes`).then(() => (setLiked(!deuLike)));
            setNumLikes((parseInt(numLikes) + 1))
        }
    }

    const acionaSalvarReceita = () => {
        const idUsuario = parseInt(localStorage.getItem("userID"));
        const idReceita = parseInt(props.dadosReceita.id);
        if (!salvouReceita) {
            api.post(`receita/${idReceita}/salvareceita`, {"usuario_id": idUsuario, "receita_id": idReceita})
                .then(setSalvarReceita(!salvouReceita))
        }

    }

    const acionaRemocaoReceita = () => {
        const idReceita = parseInt(props.dadosReceita.id);
        api.delete(`receita/${idReceita}`)
            .then(navigate("/homepage"))
            .catch(console.log("erro"))
    }

    return (
        <>
            <div>
                <Modal show={showModalEdicao} onHide={botaoSalvarBotaoEdicao} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar título da receita</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control onChange={(e) => (props.useEffectTitulo.setTituloReceita(e.target.value))}
                                      value={props.useEffectTitulo.tituloReceita} type="text"
                                      placeholder="Novo título"
                                      className={"inputTextoEdicao"}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"botaoSalvarModalEdicao"} variant="primary" onClick={botaoSalvarBotaoEdicao}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className={"container card card-body bg mb-3"}>
                    <div className={"d-flex align-items-center flex-wrap gap-3"}>
                        <Button className={"botaoLike botaoModalReceita textoBold"}
                                onClick={acionaLike}>
                            <i className={!deuLike ? "bi bi-heart" : "bi bi-heart-fill"}></i> Like
                            • {numLikes}
                        </Button>

                        <Button className={"botaoSalvarReceita botaoModalReceita textoBold"}
                                onClick={acionaSalvarReceita}>
                            <i className={!salvouReceita ? "bi bi-journal-plus" : "bi bi-journal-check"}></i>
                            {!salvouReceita ? " Salvar no livro" : " Salvo"}
                        </Button>

                        <a className={"botaoVisualizarSalvamentos btn btn-primary botaoModalReceita textoBold"}
                           data-bs-toggle="collapse" href="#collapseExample"
                           role="button"
                           aria-expanded="false"
                           aria-controls="collapseExample"
                        >
                            <i className="bi bi-people"></i>
                            Ver quem salvou
                        </a>

                        <Button className={"botaoEditar botaoModalReceita textoBold"}
                                onClick={() => (handleShowModalEdicao())}>
                            <i className="bi bi-pencil"></i> Editar
                        </Button>

                        <Button className={"botaoRemover botaoModalReceita textoBold"}
                                onClick={acionaRemocaoReceita}>
                            <i className="bi bi-trash3"></i> Remover
                        </Button>
                    </div>
                </div>

                <div className="collapse mb-3" id="collapseExample">
                    <div className="card card-body bg-light">
                        {props.dadosQuemSalvouReceita.map(value => (
                            <CampoUsuarioPorReceita nomeDeUsuario={value.username}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuloControle;