import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function NewCarro() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const concessionariaId = localStorage.getItem("concessionariaId");

  async function handleNewCarro(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };
    try {
      await api.post("/carros", data, {
        headers: {
          Authorization: concessionariaId,
        },
      });

      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar carro, tente novamente.");
    }
  }

  return (
    <div className="new-carro-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastrar Novo Carro </h1>
          <p> Descreva o carro e os detalhes do carro </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#f13b5c" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewCarro}>
          <input
            placeholder="Nome do Carro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            {" "}
            Cadastrar{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
