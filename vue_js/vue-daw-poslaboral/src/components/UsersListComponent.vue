<template>
    <ul>
        <UserComponentVue v-for="(user, index) in usersList" :key="index" :user="user"></UserComponentVue>
    </ul>
</template>

<script>
import UserComponentVue from './UserComponent.vue'
export default {
    props: ["usersList"],
    components: {
        UserComponentVue
    }
}
</script>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, sans-serif;
}

body {
    display: grid;
    place-content: center;
    min-height: 100vh;
    background: #03001e;
    background: linear-gradient(45deg, #6407a1, #cc3ea6);
}

ul {
    position: relative;
    transform-style: preserve-3d;
    perspective: 500px;
    display: flex;
    flex-direction: column;
    gap: 0;
    transition: 500ms;
}

ul:hover {
    gap: 20px;
}

ul li {
    position: relative;
    list-style: none;
    width: 450px;
    height: 96px;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 0 12px rgba(0, 0, 0, .24);
    transition: 500ms;
    transition-delay: calc(var(--i) * 50ms);
    cursor: pointer;
}

ul li:nth-child(1) {
    transform: translateZ(-75px) translateY(20px);
    opacity: .6;
    filter: blur(4px);
}

ul li:nth-child(2) {
    opacity: .8;
    filter: blur(2px);
}

ul li:nth-child(3) {
    transform: translateZ(65px) translateY(-30px);
}

ul li:nth-child(4) {
    transform: translateZ(125px) translateY(-68px);
    filter: blur(1px);
}

ul:hover li {
    opacity: 1;
    filter: blur(0);
    transform: translateZ(0) translateY(0);
}

ul li img {
    max-width: 64px;
    border-radius: 8px;
}

ul li .content {
    width: 100%;
}

ul li .content h3 {
    font-weight: 600;
    margin-bottom: 6px;
    line-height: 1;
}

ul li .content p {
    opacity: .6;
    line-height: 1;
}
</style>