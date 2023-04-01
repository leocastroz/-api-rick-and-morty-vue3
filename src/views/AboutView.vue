<template>
  <div>
    <div class="search">
      <div class="buscar">
        <span class="material-symbols-outlined">
          search
        </span>
        <input type="text" v-model="search" id="search" placeholder="Buscar por nome">
      </div>
      <select v-model="selectedSpecies" placeholder="selecione">
        <option value="">All species</option>
        <option v-for="option in speciesOptions" :value="option">{{ option }}</option>
      </select>
    </div>

    <p v-if="netpre.length === 0">No results found</p>

    <div class="cimetri">
      <ul v-if="filteredList.length">
        <li v-for="(character, index) in filteredList" :key="index">
          <div class="container">
            <img :src="character.image" alt="" srcset="" class="images">
            <p>{{ character.name }}</p>
            <span>{{ character.species }}</span>
          </div>
        </li>
      </ul>
      <h1 v-else>No results found</h1>
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
      selectedSpecies: null,
    }
  },
  methods:{
      async getDog() {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character');
          console.log(response.data);
          this.netpre = response.data.results;
          this.$toast.success( "API TROUXE OS DADOS", { position: "top-right", duration: 5000, background: "#7a78fe" })
        } catch (error) {
          this.$toast.error( "Erro ao consumir API !", { position: "top-right", duration: 3000 })
          console.error(error);
        }
    },
  },
  computed: {
  speciesOptions() {
    return [...new Set(this.netpre.map(character => character.species))];
  },
  filteredList() {
    return this.netpre.filter(character =>
      character.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (!this.selectedSpecies || character.species === this.selectedSpecies),
      
    );
  },
},
  mounted() {
    this.getDog()
  },
}
</script>

<style scoped>

span {
  color: #b5b5b5;
  font-weight: bold;
  margin-left: 5px;
}

select {
  width: 100px;
  height: 20px;
  border-style: none;
  border:none
}

input[type=text]{outline:none; font-family: 'Poppins', sans-serif;}

::placeholder {
  color: #b5b5b5;
}

.buscar {
  justify-content: space-around;
  background-color: #ffffff;
  align-items: center;
  border-radius: 5px;
  max-width: 250px;
  padding: 10px;
  display: flex;
}
.search {
  justify-content: space-between;
  background: #9993ff;
  background: linear-gradient(100deg, rgba(153,147,255,1) 0%, rgb(172, 18, 255) 100%);
  align-items: center;
  border-radius: 5px;
  margin: 20px 0;
  padding: 30px;
  display: flex;
}

input {
  background-color: #ffffff;
  max-width: 200px;
  height: 20px;
  border: none;
  margin-left: 20px;
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
  background-color: #9993ff;
  margin-top: -40px;
  margin-left: 40px;
}
</style> 