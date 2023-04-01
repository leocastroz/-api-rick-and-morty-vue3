<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MyMax from './components/MyMax.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="top-header">
        <HelloWorld/>
        <MyMax/>
      </div>
      <nav class="filters">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">API</RouterLink>
      </nav>
      <RouterView />
    </div>
  </header>

  
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

header {
  max-width: 900px;
  margin: 80px auto 0 auto;
  display: grid;

  font-family: 'Poppins', sans-serif;
}

.top-header{
  justify-content: space-between;
  padding: 40px 0;
  display: flex;
  align-items: center;
}

.filters {  
  text-align: center;
  background-color: #5f59ff;
  padding: 20px;
  border-radius: 5px;
}

.filters a {
  color: #ffffff;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  margin: 0 20px;
}
</style>
