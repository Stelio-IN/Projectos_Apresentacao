<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Upload de Arquivos</h1>
      <file-upload></file-upload>
    </div>
  </q-page>
</template>

<script>
import FileUpload from 'components/FileUpload.vue';

export default {
  components: {
    FileUpload
  }
};
</script>
