<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Título da Página -->
      <h1 class="text-h4 q-mb-md">Lista de Produtos</h1>

      <!-- Descrição da Página -->
      <p class="q-mb-md">
        Aqui você pode visualizar, adicionar, editar e remover produtos do nosso inventário.
      </p>

      <!-- Tabela de Produtos -->
      <q-table
        :rows="products"
        :columns="columns"
        row-key="id"
        :loading="loading"
        no-data-label="Nenhum produto encontrado"
        loading-label="Carregando produtos..."
      >
        <!-- Mensagem ao Carregar a Tabela -->
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            R$ {{ props.row.price.toFixed(2) }}
          </q-td>
        </template>
      </q-table>

      <!-- Botão para Atualizar a Lista -->
      <q-btn
        label="Atualizar Lista"
        color="primary"
        class="q-mt-md"
        @click="fetchProducts"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'name', label: 'Nome', field: 'name' },
        { name: 'price', label: 'Preço', field: 'price' }
      ],
      loading: false,
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      this.$axios.get('/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error(error);
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao carregar os produtos'
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
.q-page {
  padding: 20px;
}
</style>
