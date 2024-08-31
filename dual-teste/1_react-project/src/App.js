import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [dados, setDados] = useState([]);
  const [novoDado, setNovoDado] = useState({ nome: '', valor: '' });

  useEffect(() => {
    listarDados();
  }, []);

  const listarDados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dados');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao listar dados:', error);
    }
  };

  const cadastrarDado = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/dados', novoDado);
      setNovoDado({ nome: '', valor: '' });
      listarDados();
    } catch (error) {
      console.error('Erro ao cadastrar dado:', error);
    }
  };

  const editarDado = async (dado) => {
    const novoValor = prompt('Digite o novo valor:', dado.valor);
    if (novoValor !== null) {
      try {
        await axios.put(`http://localhost:3000/api/dados/${dado.id}`, {
          nome: dado.nome,
          valor: novoValor
        });
        listarDados();
      } catch (error) {
        console.error('Erro ao atualizar dado:', error);
      }
    }
  };

  const eliminarDado = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/dados/${id}`);
      listarDados();
    } catch (error) {
      console.error('Erro ao eliminar dado:', error);
    }
  };

  return (
    <div className="App">
      <h1>Gestão de Dados</h1>

      <form onSubmit={cadastrarDado}>
        <input
          type="text"
          placeholder="Nome"
          value={novoDado.nome}
          onChange={(e) => setNovoDado({ ...novoDado, nome: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Valor"
          value={novoDado.valor}
          onChange={(e) => setNovoDado({ ...novoDado, valor: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {dados.map((dado) => (
          <li key={dado.id}>
            {dado.nome}: {dado.valor}
            <button onClick={() => editarDado(dado)}>Editar</button>
            <button onClick={() => eliminarDado(dado.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
