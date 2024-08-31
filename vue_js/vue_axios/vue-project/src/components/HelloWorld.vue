<template>
  <div>
    <h1>Dados da API</h1>
    <ul>
      <li v-for="item in dados" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

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
        // URL da API pública JSONPlaceholder
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        if (response.status === 200) {
          console.log('Dados recebidos com sucesso:', response.data);
          this.dados = response.data;
        } else {
          console.error('Erro na resposta da API, status:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
        if (error.response) {
          console.error('Erro com a resposta:', error.response);
        } else if (error.request) {
          console.error('Nenhuma resposta recebida:', error.request);
        } else {
          console.error('Erro ao configurar a requisição:', error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Adicione aqui seus estilos específicos para o componente */
</style>
