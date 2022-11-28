<template>
  <div class="home">
    <h1
      :style="colorContador"
    >{{ titulo }}: {{ contador }}</h1>
    <hr>
    <BtnAccion :estado="true"></BtnAccion>
    <BtnAccion :estado="false"></BtnAccion>
  </div>
</template>

<script>
// @ is an alias to /src
import BtnDisminuir from '@/components/BtnDisminuir.vue'
import { mapState, mapMutation, mapActions } from 'vuex'
import BtnAccion from '@/components/BtnAccion.vue'

export default {
  name: 'HomeView',
  data () {
   return {
    titulo: 'Mi contador Vuex'
   }
  },
  components: {
    BtnDisminuir,
    BtnAccion
  },
  computed: {
    ...mapState(['contador']),
    colorContador(){
      return [this.contador > 100 ? {'color' : 'green'} : {'color' : 'red'}]
    }
  },
  methods: {
    ...mapActions(['suma'])
  }

}
</script>
