<template>
    <div class="container mt-4">
      <h1>Login</h1>
      <form @submit.prevent="fazerLogin">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Logar</button>
      </form>
      <p v-if="erro" class="text-danger mt-2">{{ erro }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        erro: '',
      };
    },
    methods: {
      async fazerLogin() {
        try {
          // Fazendo login via POST
          const response = await axios.post('http://localhost:3000/clientes/login', {
            email: this.email,
            password: this.password,
          });
  
          // Se o login for bem-sucedido, armazenar o token e redirecionar
          if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Armazenar o token
            this.$router.push({ name: 'ClienteCrud' }); // Redirecionar para a rota desejada
          } else {
            this.erro = 'Email ou senha inválidos!';
          }
        } catch (error) {
          this.erro = 'Erro ao tentar logar. Tente novamente.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adicione aqui seus estilos de login */
  </style>
  