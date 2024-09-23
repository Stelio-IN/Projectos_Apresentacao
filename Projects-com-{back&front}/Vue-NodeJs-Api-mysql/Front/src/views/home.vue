<!-- src/views/Home.vue -->
<template>
    <div>
        <h1>Home Page</h1>
        <p>Bem-vindo à página inicial!</p>
    </div>
    <div>
        <p>Contador: {{ count }}</p>
        <button @click="incrementCounter">Incrementar</button>
        <button @click="decrementCounter">Decrementar</button>
    </div>
    
</template>

<script>
export default {
    name: 'Home',
    setup() {
        const counterStore = useCounterStore();
        const count = computed(() => counterStore.count);
        return {
            count,
            incrementCounter: counterStore.increment,
            decrementCounter: counterStore.decrement
        }
    }
}
import { computed } from 'vue';
import { useCounterStore } from '../stores/counter';
</script>