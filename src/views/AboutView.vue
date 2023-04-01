<template>
  <div>
    <div>
      <label for="search">Search:</label>
      <input type="text" v-model="search" id="search">
      <button @click="applyFilter">Apply filter</button>
      <h1>leonardo castro</h1>
    </div>


    <p v-if="netpre.length === 0">No results found</p>

    <div class="cimetri">
      <ul>
        <li v-for="(character, index) in filteredList" :key="index">
          <img :src="character.image" alt="" srcset="" class="images">
          <!-- {{ character.name }} -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      netpre: [],
      filteredList: [],
      search: '',
    }
  },
  methods:{
      async getDog() {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character');
          console.log(response.data);
          this.netpre = response.data.results;
          this.$toast.success( "Busca completa", { position: "top-right", duration: 3000 })
        } catch (error) {
          this.$toast.error( "Erro ao consumir API !", { position: "top-right", duration: 3000 })
          console.error(error);
        }
    },
    applyFilter() {
      this.filteredList = this.netpre.filter((character) => {
        return character.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  computed: {
    filteredList() {
      return this.netpre
    },
  },
  mounted() {
    this.getDog()
  },
}
</script>

<style scoped>
h1 {
  font-family: 'Poppins', sans-serif;
}
.images {
  width: 170px;
  height: 170px;
  border-radius: 8px;
  transition: transform 0.5s;
}

.images:hover {
  transform: scale(1.1);
  transition: 0.5s;
}


ul {
  list-style:none;
  display: grid;
  grid-template-columns:  auto auto auto auto;
  gap: 20px;
}
.cimetri {
  padding: 50px 50px;
  border-radius: 10px;
  background-color: rgb(26 27 33);
}
</style> 