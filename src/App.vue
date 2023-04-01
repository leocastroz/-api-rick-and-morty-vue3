<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">API</RouterLink>
      </nav>
      <RouterView />
    </div>
  </header>

  
</template>

<style scoped>
header {
  display: grid;
  background-color: red;
}
</style>
