<template>
  
  <UsersListComponent :usersList="users"></UsersListComponent>
    
</template>

<script>
import UsersListComponent from './UsersListComponent.vue'
    export default {
        data(){
            return {
                nome: "Joao",
                users: [
                    {
                        nome: "Joao",
                        email: "joao@email.com",
                        avatar: "https://i.postimg.cc/C1XsnDCs/user-img2.jpg"
                    },
                    {
                        nome: "Joana",
                        email: "joana@email.com",
                        avatar: "https://i.postimg.cc/ZRCLqjNq/user-img1.jpg"
                    },
                    {
                        nome: "Maria",
                        email: "maria@email.com",
                        avatar: "https://i.postimg.cc/C1XsnDCs/user-img2.jpg"
                    },
                    {
                        nome: "Fernando",
                        email: "fernando@email.com",
                        avatar: "https://i.postimg.cc/C1XsnDCs/user-img2.jpg"
                    },
                    {
                        nome: "Ivania",
                        email: "Ivania@email.com",
                        avatar: "https://i.postimg.cc/C1XsnDCs/user-img2.jpg"
                    }
                ]
            }
        },
        components: {
            UsersListComponent
        },
        created(){
            console.log("Aplicacao foi criada")
        },
        mounted(){
            console.log("Aplicacao foi montada")
        },
        updated(){
            console.log("Aplicacao foi actualizada")
        },
        unmouted(){
            console.log("Aplicacao foi desmontada")
        },

    }
</script>


<style>

</style>