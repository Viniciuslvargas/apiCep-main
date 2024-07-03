import React, { useState } from 'react';

export default function BuscarCep() {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [erro, setErro] = useState('');

    const fetchEndereco = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setEndereco(null);
                setErro('CEP não encontrado.');
            } else {
                setEndereco(data);
                setErro('');
            }
        } catch (error) {
            console.error(error);
            setEndereco(null);
            setErro('Ocorreu um erro ao buscar o CEP.');
        }
    };

    return (
        <div className="content">
            <h1 id="titulo">Buscar endereço por CEP</h1>
            <input
                id="input"
                type="text"
                value={cep}
                placeholder="Digite Aqui"
                onChange={(e) => setCep(e.target.value)}
            />
            <br />
            <button id="botao" onClick={fetchEndereco}>Buscar</button>
            <br />
            <br />
            {erro && <p className="erro">{erro}</p>}
            {endereco && (
                <div className="endereco">
                    <p>Rua: {endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>UF: {endereco.uf}</p>
                </div>
            )}
        </div>
    );
}
