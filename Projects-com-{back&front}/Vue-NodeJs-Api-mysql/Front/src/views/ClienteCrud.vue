<template>
    <div class="container mt-4">
      <h1>Gestão do Cliente</h1>
  
      <!-- Verifica se os dados do cliente foram carregados corretamente -->
      <div v-if="cliente">
    
        <div class="card">
          <div class="card-body">
            
            <h5 class="card-title">Dados do Cliente</h5> <br>
            <p><strong>Nome:</strong> {{ cliente.nome }}</p>
            <p><strong>Email:</strong> {{ cliente.email }}</p>
            <!-- <button class="btn btn-warning" @click="editarCliente">Editar</button>
            <button class="btn btn-danger ms-2" @click="eliminarCliente">Eliminar</button> -->
          </div>
        </div>
        <!--   
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
        </div> -->
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
  const clienteId = this.$route.params.clienteId;

  if (clienteId) {
    axios.get(`http://localhost:3000/clientes/${clienteId}`)
      .then(response => {
        this.cliente = response.data;
      })
      .catch(error => {
        this.erro = 'Erro ao carregar cliente.';
      });
  }
}
,
    methods: {
      editarCliente() {
        this.editando = true;
      },
      async atualizarCliente() {
        try {
          const token = localStorage.getItem('token'); // Obtenha o token JWT
          await axios.put(`http://localhost:3000/clientes/${this.cliente.id}`, {
            nome: this.cliente.nome,
            email: this.cliente.email,
          }, {
            headers: { 'Authorization': `Bearer ${token}` } // Inclua o token no cabeçalho
          });
          this.editando = false;
          alert("Cliente atualizado com sucesso!");
        } catch (error) {
          console.error("Erro ao atualizar cliente:", error);
          alert("Erro ao atualizar cliente. Tente novamente.");
        }
      },
      async eliminarCliente() {
        try {
          const token = localStorage.getItem('token'); // Obtenha o token JWT
          await axios.delete(`http://localhost:3000/clientes/${this.cliente.id}`, {
            headers: { 'Authorization': `Bearer ${token}` } // Inclua o token no cabeçalho
          });
          alert("Cliente eliminado com sucesso!");
          this.$router.push({ name: "Login" });
        } catch (error) {
          console.error("Erro ao eliminar cliente:", error);
          alert("Erro ao eliminar cliente. Tente novamente.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione aqui seus estilos para a gestão do cliente */
  </style>
  