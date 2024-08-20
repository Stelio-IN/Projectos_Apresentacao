<template>
  <q-page padding>
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="id"
      flat
      bordered
      title="Treats"
      :dense="$q.screen.lt.md"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios"; // Importa 'api' de 'boot/axios'

export default defineComponent({
  name: "indexPage",
  setup() {
    const posts = ref([]);

    const columns = [
      { name: "id", label: "Id", field: "id", sortable: true, align: "left" },
      {
        name: "title",
        label: "Titulo",
        field: "title",
        sortable: true,
        align: "left",
      },
      {
        name: "author",
        label: "Autor",
        field: "author",
        sortable: true,
        align: "left",
      },
    ];

    onMounted(() => {
      fetchPosts(); // Chama a função para buscar os dados quando o componente é montado
    });

    const fetchPosts = async () => {
      try {
        const response = await api.get('http://localhost:3000/posts'); // Faz a chamada GET usando 'api' de 'boot/axios'
       posts.value = response.data; // Atualiza a referência 'posts' com os dados recebidos da API
        console.log("Posts carregados com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    return { posts, columns };
  },
});
</script>
