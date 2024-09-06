<template>

<div class="container mt-4">
    <h1 class="mb-4">Cadastrar Dados</h1>

    <form @submit.prevent="cadastrarDado">
      <div class="mb-3">
        <input
          id="nome"
          v-model="novoDado.nome"
          type="text"
          class="form-control"
          placeholder="Nome"
          required
        />
      </div>
      <div class="mb-3">
        <input
          id="valor"
          v-model="novoDado.valor"
          type="text"
          class="form-control"
          placeholder="Valor"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
  </div>

    <div class="container mt-4">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Valor</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dado in dados" :key="dado.id">
          <td>{{ dado.nome }}</td>
          <td>{{ dado.valor }}</td>
          <td>
            <button @click="editarDado(dado)" class="btn btn-warning btn-sm me-2">Editar</button>
            <button @click="eliminarDado(dado)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
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
  