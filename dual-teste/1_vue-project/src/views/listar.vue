<template>


    <div id="app">
  
  
      <h1>Gestão de Dados</h1>
  
      <form @submit.prevent="cadastrarDado">
        <input v-model="novoDado.nome" placeholder="Nome" required />
        <input v-model="novoDado.valor" placeholder="Valor" required />
        <button type="submit">Cadastrar</button>
      </form>
  
      <ul>
        <li v-for="dado in dados" :key="dado.id">
          {{ dado.nome }}: {{ dado.valor }}
          <button @click="editarDado(dado)">Editar</button>
          <button @click="eliminarDado(dado)">Eliminar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router'
  export default {
    data() {
      return {
        dados: [],
        novoDado: {
          nome: '',
          valor: ''
        }
      };
    },
    created() {
      this.listarDados();
    },
    methods: {
      async listarDados() {
        try {
          const response = await axios.get('http://localhost:3000/api/dados');
          this.dados = response.data;
        } catch (error) {
          console.error('Erro ao listar dados:', error);
        }
      },
      async cadastrarDado() {
        try {
          await axios.post('http://localhost:3000/api/dados', this.novoDado);
          this.novoDado.nome = '';
          this.novoDado.valor = '';
          this.listarDados();
        } catch (error) {
          console.error('Erro ao cadastrar dado:', error);
        }
      },
      async editarDado(dado) {
        try {
          const novoValor = prompt('Digite o novo valor:', dado.valor);
          if (novoValor !== null) {
            await axios.put(`http://localhost:3000/api/dados/${dado.id}`, {
              nome: dado.nome,
              valor: novoValor
            });
            this.listarDados();
          }
        } catch (error) {
          console.error('Erro ao atualizar dado:', error);
        }
      },
      async eliminarDado(dado) {
        try {
          await axios.delete(`http://localhost:3000/api/dados/${dado.id}`);
          this.listarDados();
        } catch (error) {
          console.error('Erro ao eliminar dado:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adicione aqui seus estilos específicos */
  </style>
  