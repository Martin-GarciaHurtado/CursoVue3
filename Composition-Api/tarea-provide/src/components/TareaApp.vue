<template>
    <h1 class="text-center">App Tareas</h1>
    <TareaForm />
    <TareaItem 
        v-for="tarea in tareas" :key="tarea.id"
        :tarea="tarea"
    />
    <div class=
        "alert alert-dark mt-3"
        v-if="tareas.length === 0"
    >
        Sin Tareas Pendientes :3 
    </div>
    <p>{{tareas}}</p>
</template>

<script>
import { provide, ref, watchEffect } from 'vue';
import TareaForm from '@/components/TareaForm.vue';
import TareaItem from '@/components/TareaItem.vue';

export default {

    components: {
        TareaForm,
        TareaItem,
    },
    setup() {
        const tareas = ref([])

        provide('tareas', tareas)

        if(localStorage.getItem('tareas')){
            tareas.value = JSON.parse(localStorage.getItem('tareas'))
        }

        watchEffect( () => {
            localStorage.setItem( 'tareas', JSON.stringify(tareas.value) )
        })

        return {
            tareas,
        }
    }
}

</script>