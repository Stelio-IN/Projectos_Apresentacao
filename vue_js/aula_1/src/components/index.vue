<template>
    <div>

        <div v-show="false">

        
        <h1>Estado {{ contar }}</h1>
        <button @click="contar++">Incrementar </button>
        <button @click="contar--">Decrementar </button>


        <HelloWorldComponet v-if="contar >10"></HelloWorldComponet>
        <HelloWorldComponet v-else>Menor que 10</HelloWorldComponet>
        

    </div>
        <h1>v-for</h1>
        <input v-model="name">
        <ul>
                <template v-for="(nome, index) in nomes" :key="index">

                          <li v-if="nome.includes(name)">{{nome}}</li>
       
        </template>  
        
        </ul>

    

    </div>
</template>

<script>

 import HelloWorldComponet from "./HelloWorldComponet.vue"

export default {
    data() {
        return {
            
            contar: 5,
            nomes:['Stelio','Acacio','Mondlane'],
            name:""
        }
    },
    mounted() {
        console.log('componente montado');
    },
    created(){
        console.log('componente criado');
    },    update(){
        console.log('componente atualizado');
    },    unmounted(){
        console.log('componente desmontado');
    },components:{

            HelloWorldComponet
        }


}
</script>

<style scoped>
</style>