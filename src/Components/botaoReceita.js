import "./botaoReceita.css"
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import receita from "../Pages/PagReceita/Receita";


const BotaoReceita = (props) => {
    const navigate = useNavigate();

    const [tituloReceita, setTituloReceita] = useState("");
    const [nomeAutor, setAutor] = useState("");
    const [nomePorId, setNomePorId] = useState("");
    const [carregando, setCarregando] = useState(true);

    const [numLikes, setNumLikes] = useState(-1);

    const buscaDadosApi = (id) => {


        api.get(`/receita/${id}`)
            .then((response) => {
                console.log(response);

                api.get(`/usuario/${response.data.data.receita.id_autor}`)
                    .then((response) => {
                        console.log(response);
                        const username = response.data.data.usuario.username;
                        console.log("USER NAME DO BOTAO", username);
                        setNomePorId(username)
                    }).catch(e => {
                    console.log(e)

                })

                setTituloReceita(response.data.data.receita.titulo)
                setAutor(nomePorId)
                setNumLikes(response.data.data.receita.num_likes)
                setCarregando(false);
            }).catch(e => {
            setCarregando(false);
            console.log(e)
        })


    }


    useEffect(() => {
        buscaDadosApi(props.idReceita);
    }, [buscaDadosApi, props.idReceita]);


    return !carregando &&  (
        <>
            <button className={"col-md-3 mb-2 me-3 botaoReceita"}
                    onClick={elem => {
                        navigate(`/receita/${props.idReceita}`)
                    }}>
                <div className={"d-flex flex-column align-items-start justify-content-center"}>
                    <h5>{tituloReceita}</h5>
                    <a>@{nomeAutor}</a>
                    <p>
                        <i className={"iconLike bi bi-heart-fill me-1"}></i>
                        {numLikes} likes
                    </p>
                </div>
            </button>

        </>

    );
};

export default BotaoReceita;