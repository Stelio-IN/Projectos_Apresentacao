<template>
    <li style="--i: 1;">
		<img :src="user.avatar" alt="user image">
		<div class="content">
			<h3>{{ user.nome }}</h3>
			<p>{{ user.email }}</p>
			<p>{{ idade }}</p>
		</div>
        <button @click="incrimentar()">+</button>
        <button @click="decrimentar()">-</button>
	</li>
</template>


<script>

  export default{
    props: ["user"],
    data(){
        return {
            idade: 17
        }
    },
    methods: {
        incrimentar(){
            console.log("clicando")
            this.idade+=1
        },
        decrimentar(){
            console.log("clicando")
            this.idade-=1
        }
    }
  }
</script>