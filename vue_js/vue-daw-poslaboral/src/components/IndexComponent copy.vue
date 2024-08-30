<template>
    <h1 >Hello {{ nome }}</h1>

    <input v-model="nome">

    <ul>
        <template v-for="(user, index) in users" :key="index">
            <li v-if="user.nome.includes(nome)">{{ user.nome }} : {{ user.email }}</li>
        </template>
    </ul>
    
</template>

<script>
    export default {
        data(){
            return {
                nome: "Joao",
                users: [
                    {
                        nome: "Joao",
                        email: "joao@email.com",
                        avatar: "https://i.postimg.cc/ZRCLqjNq/user-img1.jpg"
                    },
                    {
                        nome: "Joana",
                        email: "joana@email.com",
                        avatar: ""
                    },
                    {
                        nome: "Maria",
                        email: "maria@email.com"
                    },
                ]
            }
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