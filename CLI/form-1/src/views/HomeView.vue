<template>
  <form @submit.prevent="procesarFormulario">
    <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese Nombre"
      v-model.trim="tarea.nombre"
    >
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-1"
        class="form-check-input"
        v-model="tarea.categorias"
        value="Javascript"
      >
      <label for="check-1" class="form-check-label">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-2"
        class="form-check-input"
        v-model="tarea.categorias"
        value="Node js"
      >
      <label for="check-2" class="form-check-label">Node.js</label>
    </div>

    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input 
          type="radio"
          id="radio-1"
          class="form-check-input"
          value="Urgente"
          v-model="tarea.estado"
        >
          <label for="radio-1" class="form-check-label">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input 
          type="radio"
          id="radio-2"
          class="form-check-input"
          value="Relax"
          v-model.number="tarea.estado"
        >
          <label for="radio-2" class="form-check-label">Relax</label>
      </div>
    </div>
    <div class="mt-2">
      <input 
        type="number"
        class="form-control"
        v-model="tarea.numero"  
      >
    </div>

    <button 
      type="submit"
      class="btn btn-dark mt-2 btn-block"
      :disabled="bloquear"
    >
      Procesar
    </button>
  </form>
  <hr>
  <p>{{ tarea }}</p>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data() {
    return {
      tarea: {
        nombre: '',
        categorias: [],
        estado: [],
        numero: 0
      }
    }
  },
  methods: {
    procesarFormulario(){
      console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log('Campo vacio')
        return
      }
      console.log('No esta vacio el campo')
      this.tarea = {
        nombre: '',
        categorias: [],
        estado: [],
        numero: 0
      }
    }
  },
  computed: {
    bloquear(){
      return this.tarea.nombre.trim() === "" ? true : false
    }
  }
}
</script>
