<script setup>
import Stick from "./Stick.vue";
</script>

<template>
    <div class="field">
        <div class="row " v-for="index in sticks" :key="index">
            <Stick v-for="index in index" :key="index" />
        </div>
        <!-- <div class="row" v-for="index in 3" :key="index">
        <Stick v-for="index in 13" :key="index" />
        </div> -->
    </div>
</template>

<script>
export default {
    props:{
        sticks: {
            type: Array,
            default: () => []
        }
    }
    // computed: {
    //     sticks() {
    //         const maxSticks = 13;
    //         let count = 1;

    //     }
    // }
    
}
</script>

<style lang="scss" scoped>
.row{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>