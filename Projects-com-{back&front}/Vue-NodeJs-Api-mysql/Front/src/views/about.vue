
<!-- src/views/Listar.vue -->
<template>
       <div>
        <h1>About Page</h1>
        <p>Esta é a página Sobre.</p>
        </div>
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        <li v-for="tarefa in tarefas" :key="tarefa.id">
          {{ tarefa.text }}
          <button @click="editarTarefa(tarefa.id)">Editar</button>
          <button @click="removerTarefa(tarefa.id)">Remover</button> <!-- Adiciona botão de remover -->
        </li>
      </ul>
      <input v-model="novaTarefa" placeholder="Nova Tarefa" />
      <button @click="adicionarTarefa">Adicionar</button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useTarefasStore } from '../stores/toDO';
  
  export default {
    name: 'About',
    setup() {
      const tarefasStore = useTarefasStore();
      const novaTarefa = ref('');
  
      const tarefas = computed(() => tarefasStore.tarefas);
  
      const adicionarTarefa = () => {
        if (novaTarefa.value.trim()) {
          tarefasStore.cadastrar(Date.now(), novaTarefa.value);
          novaTarefa.value = '';
        }
      };
  
      const editarTarefa = (id) => {
        const novoTexto = prompt('Editar tarefa:');
        if (novoTexto) {
          tarefasStore.editar(id, novoTexto);
        }
      };
  
      const removerTarefa = (id) => {
        tarefasStore.remover(id); // Chama o método `remover` corretamente com o ID
      };
  
      return {
        tarefas,
        novaTarefa,
        adicionarTarefa,
        editarTarefa,
        removerTarefa, // Inclui a função removerTarefa
      };
    },
  };
  </script>
  