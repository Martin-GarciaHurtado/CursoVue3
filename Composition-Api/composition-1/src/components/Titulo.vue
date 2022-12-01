<template>
    <h1
        :style="{'color': color}"
    >Contador: {{signoPeso}}</h1>
</template>

<script>
import { computed } from 'vue'
export default {
    props: ['contador', 'color'],
    setup(props){
        console.log(props.contador)
        const signoPeso = computed(() => {
            return '$' + props.contador
        })
        return {signoPeso}
    }
    // computed: {
    //     signoPeso(){
    //         return '$' + this.contador
    //     }
    // }
}
</script>