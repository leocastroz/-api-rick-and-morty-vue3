<script>
export default {
  data() {
    return {
      name: 'leonardo',
      action: {},
      action2: {},
    }
  },
  methods:{
    /* primeira API */
    pullAction(event){
      const url = event.currentTarget.href
      fetch(url)
      .then(response => response.json())
      .then(response =>  {
        this.action = response
      })
    },
    /* segunda API */
    pullAction2(event){
      const url = event.currentTarget.href
      fetch(url)
      .then(response => response.json())
      .then(response =>  {
        this.action2 = response
      })
    }
  }
}
</script>

<template>
  <div>
    <li><a @click.prevent="pullAction" href="https://api.origamid.dev/stock/aapl/quote">Apple</a></li>
    <li><a @click.prevent="pullAction" href="https://api.origamid.dev/stock/googl/quote">Google</a></li>
    <li><a @click.prevent="pullAction" href="https://api.origamid.dev/stock/amzn/quote">Amazon</a></li>
    <li><a @click.prevent="pullAction" href="https://api.origamid.dev/stock/ebay/quote">Ebay</a></li>
    <li><a @click.prevent="pullAction" href="https://api.origamid.dev/stock/pypl/quote">Paypal</a></li>
    <div class="">
      Empresa: {{ action.symbol }} <br>
      Comapanhia: {{ action.companyName }}
    </div>
    <br>
    <div class="">
      <li><a @click.prevent="pullAction2" href="https://rickandmortyapi.com/api/character/1">IMAGEM:</a></li>
    </div>

    <div>
      <img :src="`${action2.image}`">
      <br>
      <br>
    </div>

    
  </div>
</template>

<style>

</style>
