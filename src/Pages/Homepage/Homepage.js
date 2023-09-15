import React, {useEffect} from 'react';
import "./Homepage.css"
import {useState} from "react";
import BotaoReceita from "../../Components/botaoReceita";
import {Container, Spinner} from "react-bootstrap";
import api from "../../services/api";
import NavbarLayout from "../../Components/Navbar/Navbar";


const Homepage = () => {
    const [idsReceitasDoBD, setIdsReceitasDoBanco] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => (() => {
        let idsReceitasRecebidas = [];
        api.get("/receita")
            .then((response) => {
                response.data.data.forEach((e) => {
                    idsReceitasRecebidas.push(e.id);
                })
                setCarregando(false);
            }).catch(e => {
            console.log(e)
            setCarregando(false)
        })
        setIdsReceitasDoBanco(idsReceitasRecebidas);
    }), [])


    return (
        <>
            <NavbarLayout/>
            <Container className={"textoSansSerif textoBlack gap"}>
                <h2 className={"mx-2 mt-5"}>Receitas adicionadas: </h2>
                <div>
                    {carregando ? (
                        <div className={"text-center"}>
                            <Spinner animation="border"/>
                        </div>
                    ) : (
                        idsReceitasDoBD.map((value) => (
                            <BotaoReceita key={value} idReceita={value}/>
                        ))
                    )}
                </div>
            </Container>
        </>
    );
};

export default Homepage;