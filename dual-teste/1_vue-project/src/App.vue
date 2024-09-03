<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import about from './views/About.vue'
</script>

<template>
   <h2>Routes</h2>
    <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/listar">Listar</router-link>
    </nav>
    <router-view></router-view>
  </div>
    <!-- <about></about> -->
    <!-- <HelloWorld></HelloWorld> -->
</template>

<style scoped></style>
