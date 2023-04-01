<template>
  <div>
    <div>
      <!-- <label for="search">Search:</label> -->
      <!-- <input type="text" v-model="search" id="search"> -->
      <!-- <button @click="applyFilter">Apply filter</button> -->

      <br>
      <br>
      <br>
    </div>


    <p v-if="netpre.length === 0">No results found</p>

    <div class="cimetri">
      <ul>
        <li v-for="(character, index) in filteredList" :key="index">
          <div class="container">
            <img :src="character.image" alt="" srcset="" class="images">
            <p>{{ character.name }}</p>
          </div>
          
          <!-- <pre>{{ character }}</pre> -->
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


.container {
  width: 170px;
  height: 170px;
  border-radius: 8px;
  transition: transform 0.5s;
}

.container:hover {
  transform: scale(1.1);
  transition: 0.5s;
  box-shadow: 0px 0px 20px #a6a6a6;
  cursor: pointer;
}

ul {
  list-style:none;
  display: grid;
  grid-template-columns:  auto auto auto auto;
  gap: 30px;
}
.cimetri {
  padding: 50px 50px;
  border-radius: 10px;
  background-color: #25272f;
}

.cimetri p {
  display: flex;
  position: relative;
  font-size: 13px;
  color: #fff;
  position: absolute;
  background-color: #5f59ff;
  margin-top: -40px;
  margin-left: 40px;
}
</style> 