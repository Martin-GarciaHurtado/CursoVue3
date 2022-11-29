<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <ListaTareas/>
</template>

<script>
import Input from '@/components/Input.vue'
import { mapActions } from 'vuex'
import ListaTareas from '@/components/ListaTareas.vue'
const shortid = require('shortid');
// @ is an alias to /src


export default {
  name: 'HomeView',
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: [],
        numero: 0
      }
    }
  },
  components: {
    Input,
    ListaTareas,
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacio')
        return
      }
      console.log('No esta vacio el campo')
      
      this.tarea.id = shortid.generate()

      this.setTareas(this.tarea)

      this.tarea = {
        nombre: '',
        categorias: [],
        estado: [],
        numero: 0
      }
    }
  }
}
</script>
