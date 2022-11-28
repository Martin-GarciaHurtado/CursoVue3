<template>
  <div class="about">
   
    <h1
      :style="colorContador"
    >
      {{ titulo }}: {{ contador }}
    </h1>
    <br>
    <input type="text" v-model="this.texto">
    <h2>{{ texto }}</h2>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'About',
  data () {
   return {
    titulo: 'Mi contador Vuex',
    texto: ''
   }
  },
  computed: {
    ...mapState(['contador']),
    colorContador(){
      return [this.contador > 100 ? {'color' : 'green'} : {'color' : 'red'}]
    }
  }

}
</script>
