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
      <div class="selects">
        <select v-model="selectedStatus">
          <option value="">All Status</option>
          <option v-for="option in statusOptions" :value="option">{{ option }}</option>
        </select>
        <select v-model="selectedSpecies">
          <option value="">All species</option>
          <option v-for="option in speciesOptions" :value="option">{{ option }}</option>
        </select>
        <select v-model="selectedGender">
          <option value="">All Genres</option>
          <option v-for="option in genderOptions" :value="option">{{ option }}</option>
        </select>  
      </div>
    
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
        No results found
      </h2>

    </div>



    <div v-if="showImageModal" class="modal">
      <div class="modal-content">
        <div class="header-close">
          <span class="close" @click="showImageModal = false">&times;</span>
        </div>
        <div class="data-user">
          <div class="left-data">
            <div>
              <img :src="selectedImage" alt="imagemModal" width="170" class="imagem-modal">
              <div class="state-person">
                <span :class="speciesStatusClass" class="material-symbols-rounded" id="status">
                  radio_button_unchecked
                </span>
                <p>{{ selectedCharacter.status }}</p>
              </div>
            </div>
            <div class="status-person">
              <p><span class="material-symbols-outlined">
                person
                </span> {{ selectedCharacter.name }}</p>
              <p><span class="material-symbols-outlined">
                public
                </span>Origin: {{ selectedCharacter.origin.name }}</p>
              <p><span class="material-symbols-outlined">
                microbiology
                </span> {{ selectedCharacter.species }}</p>
              <p><span class="material-symbols-outlined">
                person_search
                </span> {{ selectedCharacter.gender }}</p>
            </div>
          </div>
          <div class="dates">
            <h3>Last know location endpoint:</h3>
            <p>{{ selectedCharacter.location.name }}</p>
            <br>
            <h3>Episodes that {{ selectedCharacter.name }} has been in:</h3>   

            <p :style="{color: '#b5b5b5', marginTop: '10px', fontSize: '13px', textAlign: 'justify' }">
              {{ episodeIds }}
            </p>

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
      selectedSpecies: '',
      selectedStatus: '',
      selectedGender: '',
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
          this.$toast.info( "🔔 welcome to my project - rick and morty 👀 ", { position: "top-left", duration: 7000 })
          // this.$toast.info( "Success in bringing data", { position: "top-left", duration: 8000 })
        } catch (error) {
          this.$toast.error( "Erro ao consumir API !", { position: "top-right", duration: 3000 })
          console.error(error);
        }
    },
  },
  computed: {
    episodeIds() {
    return this.selectedCharacter.episode.map((link) => {
      const id = ' Ep.' + link.match(/\d+/)[0];
      return id;
    }).join(' ');
  },
  statusOptions() {
    return [...new Set(this.netpre.map(character => character.status))];
  },
  speciesOptions() {
    return [...new Set(this.netpre.map(character => character.species))];
  },
  genderOptions() {
    return [...new Set(this.netpre.map(character => character.gender))];
  },
  filteredList() {
    return this.netpre.filter(character =>
      character.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (!this.selectedSpecies || character.species === this.selectedSpecies) && 
      (!this.selectedGender || character.gender === this.selectedGender) &&
      (!this.selectedStatus || character.status === this.selectedStatus),
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

.selects select {
  margin: 0 0 0 20px;
}

.state-person {
  display: flex;
  align-items: center;
  margin: -20px 0 0 30px;
  align-items: center;
}

.state-person #status {
  margin: 0 5px 0 0;
  border-radius: 100%;
  font-size: 12px;
}

.alive {
  background: -webkit-linear-gradient(#d4d4d4, #00dc00);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dead {
  background: -webkit-linear-gradient(#eee, #ff0000);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.unknown {
  background: -webkit-linear-gradient(#eee, #333);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.data-user div img {
  box-shadow: 0px 0px 20px #a6a6a6;
  margin: 30px;
}

.data-user .status-person {
  margin: 20px;
}

.data-user .status-person p {
  padding: 8px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.data-user .status-person span {
  margin: 0 5px;
  color: #9993ff;
}

.dates {
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
  background-color: rgba(0, 0, 0, 0.483);
}


.modal-content {
  display: grid;
  background-color: #18191e;
  border-radius: 5px;
  margin: 200px auto;
  width: 700px; 
  height: 450px;
  padding: 100px 0;
}

.modal-content .close {
  font-size: 20px;
  cursor: pointer;
  margin: -80px 20px 0 0;
  position: absolute;
}

.modal-content .close:hover {
  color: #9993ff;
}

.header-close {
  display: flex;
  justify-content: end;
  height: 45px;
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
  display: grid;
  grid-template-columns: auto auto;
}

@media (max-width: 768px) {
  .search {
    margin: 10px 0;
    justify-content: center;
    grid-template-columns: auto; 
  }

  .search .buscar {
    margin: 0 auto 20px auto;
  }
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
  justify-content: center;
}
.cimetri {
 
  padding: 50px 0px;
  border-radius: 5px;
  background-color: #25272f;
  max-width: 900px;
}

.cimetri ul {

  display: flex;
  flex-wrap: wrap;
}

.cimetri ul .container {
  flex: 1 1 200px;
}


@media (max-width: 768px) {
  .cimetri  {
    flex: 2 1 100px; /* Ajusta a base para 50% em telas menores */
  }
}

@media (max-width: 500px) {
  .data-user  {
    margin-top: -150px;
    display: grid;
    grid-template-columns: auto;
  }
  .data-user .left-data {
    display: flex;
  }

  .data-user .left-data img {
    width: 120px;
    height: 120px;
  }

  .data-user .left-data {
    display: flex;
  }

  .modal-content {
    margin-top: 100px;
    height: 600px;
  }

  .data-user .status-person span {
    margin-left: -25px;
    font-size: 13px;
  }

  .data-user .dates h3 {
    font-size: 16px;
  }
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