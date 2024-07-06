<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileUpload">
    <q-btn @click.prevent="copyFile" color="primary" label="Copiar para Pasta" v-if="selectedFile"></q-btn>
    <q-btn @click="openFile" color="secondary" label="Abrir Arquivo" v-if="selectedFile"></q-btn>

    <q-notification
      v-model="showNotification"
      :type="notificationType"
      :message="notificationMessage"
      position="top"
      @hide="showNotification = false"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      showNotification: false,
      notificationType: '', // success, warning, error, info
      notificationMessage: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    copyFile() {
      if (!this.selectedFile) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      // Simulação de cópia para a pasta no sistema
      console.log('Copiando arquivo para a pasta...');

      // Exemplo de como você pode simular a cópia
      setTimeout(() => {
        console.log('Arquivo copiado com sucesso para a pasta.');

        // Exibir notificação de sucesso
        this.showNotification = true;
        this.notificationType = 'success';
        this.notificationMessage = 'Arquivo copiado com sucesso para a pasta.';

        // Limpar o input de arquivo após o upload
        this.$refs.fileInput.value = null;
        this.selectedFile = null;
      }, 1000);
    },
    openFile() {
      if (!this.selectedFile) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      const fileUrl = URL.createObjectURL(this.selectedFile);

      // Abre o arquivo em uma nova aba
      window.open(fileUrl, '_blank');
    }
  }
};
</script>
