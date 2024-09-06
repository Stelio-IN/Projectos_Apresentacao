<template>
    <div class="custom-screen">
      <HeaderComponent />
      <main>
        <router-view></router-view>
      </main>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from './layout/header.vue'
  import FooterComponent from './layout/footer.vue'
  
  export default {
    components: {
      HeaderComponent,
      FooterComponent
    }
  }
  </script>
  
  <style scoped>
  .custom-screen {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #333;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
  </style>
  