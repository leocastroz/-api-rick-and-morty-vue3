<template>
  <div>
    <div class="search">
      <div class="buscar">
        <span class="material-symbols-outlined">
          search
        </span>
        <input type="text" v-model="search" id="search" placeholder="Search by name">
        <span class="clear-name" @click="clearName">x</span>
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
            <img 
              :src="character.image" 
              alt="" 
              srcset="" 
              class="images" 
              @click="showModal(character.image, character)"
            >
            <div class="info-personal">
              <p>{{ character.name }}</p> 
              <div> 
                <h6>{{ character.species }}</h6>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <h2 v-else>
        <span class="material-symbols-outlined">
          error
        </span>
        No results found</h2>
    </div>

    <div v-if="showImageModal" class="modal">
      <div class="modal-content">
        <div class="header-close">
          <span class="close" @click="showImageModal = false">&times;</span>
        </div>
        <div class="data-user">
          <div>
            <img :src="selectedImage" alt="imagemModal" width="170" class="imagem-modal">
          </div>
          <div class="dates">
            <h3>{{ selectedCharacter.name }}</h3>
            <p>Origin: {{ selectedCharacter.origin.name }} - Status: {{ selectedCharacter.status }}</p>
            <p>Species: {{ selectedCharacter.species }}</p>
            <p>Last know location endpoint:</p>
            <p>{{ selectedCharacter.location.name }}</p>
            <br> <p :class="speciesStatusClass">Status: {{ selectedCharacter.status }}</p>
            <h3>More info about the Origin Location:</h3>
            <p>Name: {{ selectedCharacter.origin.name }}</p>
            <p>Type: {{}}</p>
            <p>Dimension: {{}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedCharacter: {},
      showImageModal: false,
      selectedSpecies: null,
      selectedImage: null,
      filteredList: [],
      netpre: [],
      search: '',
    }
  },
  methods:{
    showModal(image, character) {
      this.showImageModal = true;
      this.selectedImage = image;
      this.selectedCharacter = character;
    },
    clearName() {
        this.search = ''
    },
      async getData() {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character');
          console.log(response.data);
          this.netpre = response.data.results;
          this.$toast.success( "API TROUXE OS DADOS", { position: "top-right", duration: 5000 })
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
  speciesStatusClass() {
    const speciesStatus = this.selectedCharacter.status;
    if (speciesStatus === "Alive") {
      return "alive";
    } else if (speciesStatus === "Dead") {
      return "dead";
    } else {
      return "unknown";
    }
  },
},
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>

.alive {
  color: green;
  background-color: green;
}

.dead {
  color: red;
  background-color: red;
}

.unknown {
  color: gray;
  background-color: gray;
}

.data-user div img {
  box-shadow: 0px 0px 30px #9993ff;
  margin: 30px;
}
.dates{
  margin: 30px;
  max-height: 150px;
}

.imagem-modal {
  border-radius: 10px;
}

.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.651);
}


.modal-content {
  display: grid;
  background-color: #18191e;
  border-radius: 5px;
  margin: 200px auto;
  width: 700px; 
  height: 400px;
}

.modal-content span {
  font-size: 20px;
  cursor: pointer;
  margin: 10px 20px 0 0;
}

.header-close {
  display: flex;
  justify-content: end;
  height: 50px;
}

.data-user {
  margin-top: -150px;
  display: grid;
  justify-content: start;
  grid-template-columns: auto auto auto auto;
}

.data-user h3{
  color: #9993ff;
  color: linear-gradient(100deg, rgba(153,147,255,1) 0%, #ac12ff 100%);
}

.data-user p {
  color: #b5b5b5;
}

.modal-content p {
  color: #f1f1f1;
  font-weight: 200;
}

.clear-name {
  color: #b5b5b5;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
  user-select: none;
}

span {
  color: #b5b5b5;
  font-weight: bold;
  margin-left: 5px;
}

select {
  width: 105px;
  height: 25px;
  padding: 0 10px;
  border:none;
  border-radius: 3px;
  color: #949494;
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

h2 {
  display: flex;
  align-items: center;
  color: #9993ff;
  color: linear-gradient(100deg, rgba(153,147,255,1) 0%, #ac12ff 100%);
}

h2 span {
  margin-right: 10px;
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
  border-radius: 5px;
  background-color: #25272f;
}

.info-personal {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  color: #fff;
  background-color: #2d2d2d8b;
  margin-top: -66px;
  border-radius: 0px 0px 8px 8px;
  width: 170px;
  height: 60px;
}

.info-personal p {
  color: #f1f1f1;
  font-weight: 200;
}

.info-personal h6 {
  background-color: #9993ff;
  color: #fff;
  border-radius: 2px;
  padding: 3px;
}
</style> 