<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand text-white" to="/">
          <img src="../../assets/logo.svg" alt="Logo" class="logo-img">
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/listar">Listar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/Clientes">Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/Login">Login</router-link>
              <!-- <router-link class="nav-link text-white" to="/ClienteCrud">Crud</router-link> -->
            </li>

          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-img {
  height: 40px; /* Ajuste a altura do logo conforme necessário */
  width: auto; /* Mantém a proporção da imagem */
}

.nav-link {
  transition: color 0.3s ease;
  margin: 0 1rem; /* Adiciona margem horizontal entre os itens de navegação */
}

.nav-link:hover {
  color: #007bff;
}
</style>
