<script>
export default {
  data() {
    return {
      name: 'castro',
      action: {},
      // action2: {},
      // action3: {},
    }
  },
  methods:{
    getAction(){
      fetch('https://api.github.com/users/leocastroz')
      .then(response => response.json())
      .then(data => {
        this.action = data
        console.log(this.action)
      })
    },
    getAction2(){
      fetch('https://api.github.com/users/leocastroz/repos')
      .then(response => response.json())
      .then(data => {
        this.action2 = data
        console.log(this.action2)
      })
    },
    // getAction3(){
    //   fetch('https://api.github.com/users/leonardocastro/followers')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.action3 = data
    //     console.log(this.action3)
    //   })
    // },
  },
}

</script>

<template>
  <div>
    <p></p>
    <button @click="getAction">Get Action</button>
    <button @click="getAction2">Get Action2</button>
    <!-- <button @click="getAction3">Get Action3</button> -->
    <p>{{action.avatar_url}}</p>
    <img :src="action.avatar_url" >
    <p>{{action2}}</p>
    <!-- <p>{{action3[0].login}}</p> -->
  </div>
</template>

<style scoped>

</style>
