<template>
    <div>
      <h1>Dados da API</h1>
      <ul>
        <li v-for="item in dados" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dados: [], // array para armazenar os dados da API
      };
    },
    created() {
      this.buscarDados();
    },
    methods: {
      async buscarDados() {
        try {
          // Requisição GET para a API
          const response = await this.$axios.get('http://localhost:3000/users');
          this.dados = response.data; // Armazena os dados da API no array
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      },
    },
  };
  </script>
  