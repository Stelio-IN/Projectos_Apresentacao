<template>
    <div class="container mt-4">
      <h1 class="mb-4">Cadastrar Cliente</h1>
  
      <form @submit.prevent="cadastrarCliente">
        <div class="mb-3">
          <input
            id="nome"
            v-model="novoCliente.nome"
            type="text"
            class="form-control"
            placeholder="Nome"
            required
          />
        </div>
        <div class="mb-3">
          <input
            id="email"
            v-model="novoCliente.email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            id="password"
            v-model="novoCliente.password"
            type="password"
            class="form-control"
            placeholder="Password"
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
            <th scope="col">Email</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button @click="editarCliente(cliente)" class="btn btn-warning btn-sm me-2">Editar</button>
              <button @click="eliminarCliente(cliente)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientes: [],
        novoCliente: {
          nome: '',
          email: '',
          password: ''
        }
      };
    },
    created() {
      this.listarClientes();
    },
    methods: {
      async listarClientes() {
        try {
          const response = await axios.get('http://localhost:3000/clientes/dados');
          this.clientes = response.data;
        } catch (error) {
          console.error('Erro ao listar clientes:', error);
        }
      },
      async cadastrarCliente() {
        try {
          await axios.post('http://localhost:3000/clientes/dados', this.novoCliente);
          this.novoCliente.nome = '';
          this.novoCliente.email = '';
          this.novoCliente.password = '';
          this.listarClientes();
        } catch (error) {
          console.error('Erro ao cadastrar cliente:', error);
        }
      },
      async editarCliente(cliente) {
        try {
          const novoEmail = prompt('Digite o novo email:', cliente.email);
          const novaSenha = prompt('Digite a nova senha:', cliente.password);
          if (novoEmail !== null && novaSenha !== null) {
            await axios.put(`http://localhost:3000/clientes/${cliente.id}`, {
              nome: cliente.nome,
              email: novoEmail,
              password: novaSenha
            });
            this.listarClientes();
          }
        } catch (error) {
          console.error('Erro ao atualizar cliente:', error);
        }
      },
      async eliminarCliente(cliente) {
        try {
          await axios.delete(`http://localhost:3000/clientes/${cliente.id}`);
          this.listarClientes();
        } catch (error) {
          console.error('Erro ao eliminar cliente:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adicione aqui seus estilos específicos */
  </style>
  