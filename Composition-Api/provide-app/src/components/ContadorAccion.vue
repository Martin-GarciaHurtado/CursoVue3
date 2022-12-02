<template>
    <button @click="contador++">Aumentar</button>
    <button @click="disminuir">Disminuir</button>
</template>
   
<script>
import { inject } from 'vue';


   
export default {
    
    setup() {
        const contador = inject('contador')

        const disminuir = () => {
            contador.value --
        }

        return {
            contador,
            disminuir,
        }
    }
}
</script>