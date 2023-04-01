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
        this.$toast.success( "Busca completa", { position: "top-right", duration: 3000 })
      } catch (error) {
        this.$toast.error( "Erro ao consumir API !", { position: "top-right", duration: 3000 })
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
