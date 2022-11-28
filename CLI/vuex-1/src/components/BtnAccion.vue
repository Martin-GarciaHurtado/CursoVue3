<template>
    <button
        @click="accionButton({estado: estado, numero: 25})"
    >
        {{ textoButton }}
    </button>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        props: {
            estado: Boolean
        },
        computed: {
            textoButton(){
                return this.estado ? 'Aumentar' : 'Disminuir'
            }
        },
        methods: {
            ...mapActions(['accionButton'])
        }
    }
</script>