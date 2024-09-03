// src/stores/tarefas.js
import { defineStore } from 'pinia';

export const useTarefasStore = defineStore('tarefas', {
  state: () => ({
    tarefas: [], // Inicializa a lista de tarefas como um array vazio
  }),
  actions: {
    cadastrar(id, text) {
      this.tarefas.push({ id, text }); // Adiciona uma nova tarefa ao array
    },
    editar(id, newText) {
      const tarefa = this.tarefas.find(t => t.id === id);
      if (tarefa) {
        tarefa.text = newText;
      }
    },
    remover(id) {  // Adiciona o parâmetro `id` à função
      // Remove uma tarefa pelo ID
      const index = this.tarefas.findIndex(t => t.id === id);
      if (index > -1) {
        this.tarefas.splice(index, 1);
      }
    },
    listar() {
      return this.tarefas;
    },
  },
});
