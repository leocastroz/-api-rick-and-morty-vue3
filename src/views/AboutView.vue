<script>
import axios from 'axios'

export default {
  data() {
    return {
      dog: null,
    }
  },
  methods:{
      async getDog() {
      try {
        const response = await axios.get('https://api.origamid.dev/stock/aapl/quote');
        console.log(response.data);
        this.dog = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
}

</script>

<template>
  <div>
    <button @click="getDog">Buscar cachorro</button>
    <p>{{ dog }}</p>

  </div>
</template>

<style scoped>

</style>
