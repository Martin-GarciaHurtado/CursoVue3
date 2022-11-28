<template>
    <button @click="resta">Disminuir</button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['resta'])
    }
}
</script>