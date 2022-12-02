<template>
    <h1 class="text-center">App Tareas</h1>
    <TareaForm />
    <p>{{tareas}}</p>
</template>

<script>
import { provide, ref } from 'vue';
import TareaForm from '@/components/TareaForm.vue';

export default {

    components: {
        TareaForm,
    },
    setup() {
        const tareas = ref([])

        provide('tareas', tareas)

        return {
            tareas,
        }
    }
}

</script>