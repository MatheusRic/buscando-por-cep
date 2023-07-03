"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../scss/styles.module.scss";
import api from "@/services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ICep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [cep, setCep] = useState<ICep | null>(null);

  async function handleSearch() {
    if (input === "") {
      toast.error("Preencha o campo CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      toast.error("CEP invalido");
      setInput("");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscador CEP</h1>

      <div className={styles.containerInput}>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Digite seu cep..."
        />

        <button className={styles.buttonSearch} onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {cep !== null && Object.keys(cep).length > 0 && (
        <main className={styles.main}>
          <h2>CEP: {cep?.cep}</h2>

          <span>{cep?.logradouro}</span>
          <span>{cep?.bairro}</span>
          <span>
            {cep?.localidade} - {cep?.uf}
          </span>
        </main>
      )}
      <ToastContainer />
    </div>
  );
}
