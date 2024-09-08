<template>
    <div class="container mt-4">
      <h1>Gestão do Cliente</h1>
  
      <!-- Verifica se os dados do cliente foram carregados corretamente -->
      <div v-if="cliente">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Dados do Cliente</h5>
            <p><strong>Nome:</strong> {{ cliente.nome }}</p>
            <p><strong>Email:</strong> {{ cliente.email }}</p>
            <button class="btn btn-warning" @click="editarCliente">Editar</button>
            <button class="btn btn-danger ms-2" @click="eliminarCliente">Eliminar</button>
          </div>
        </div>
  
        <!-- Formulário para editar cliente -->
        <div v-if="editando" class="mt-4">
          <h2>Editar Cliente</h2>
          <form @submit.prevent="atualizarCliente">
            <div class="mb-3">
              <input v-model="cliente.nome" type="text" class="form-control" placeholder="Nome" required />
            </div>
            <div class="mb-3">
              <input v-model="cliente.email" type="email" class="form-control" placeholder="Email" required />
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
          </form>
        </div>
      </div>
      <div v-else>
        <p>Carregando dados do cliente...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        cliente: null,  // Inicialize como null
        editando: false,
      };
    },
    created() {
      // Verifica se os dados do cliente foram passados pela rota
      if (this.$route.params.cliente) {
        this.cliente = this.$route.params.cliente;
      } else {
        // Lógica alternativa para carregar o cliente, se necessário
        console.error("Dados do cliente não encontrados.");
      }
    },
    methods: {
      editarCliente() {
        this.editando = true;
      },
      async atualizarCliente() {
        try {
          await axios.put(`http://localhost:3000/clientes/${this.cliente.id}`, {
            nome: this.cliente.nome,
            email: this.cliente.email,
            password: this.cliente.password,
          });
          this.editando = false;
          alert("Cliente atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar cliente:", error);
        }
      },
      async eliminarCliente() {
        try {
          await axios.delete(`http://localhost:3000/clientes/${this.cliente.id}`);
          alert("Cliente eliminado com sucesso!");
          this.$router.push({ name: "Login" });
        } catch (error) {
          console.error("Erro ao eliminar cliente:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para a gestão do cliente */
  </style>
  