<template>
    <div class="row">
        <div 
            class="col-12"
            v-for="pais in paises" :key="pais.name"    
        >
            <Card :pais="pais"/>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import Card from '@/components/Card.vue'

    export default {
        components: {
            Card,
        },
        setup(){
            const store = useStore()

            const paises = computed ( () => {
                return store.getters.topPaisesPoblacion
            })
            onMounted ( async () => {
                await store.dispatch( 'getPaises' )
                await store.dispatch( 'filtrarRegion', 'Americas' )
            })           
            return {
                paises,
            }
        }
    }

</script>