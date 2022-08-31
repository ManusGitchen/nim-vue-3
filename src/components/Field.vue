<template>
    <div class="field">
        <div class="row " v-for="(sticks, index) in stickArray" :key="index">
            {{index}}
            <Stick v-for="(stick) in sticks" :key="stick" v-on:click="selectStick(sticks, index)"/>
        </div>
    </div>
</template>

<script>
import Stick from "./Stick.vue";
export default {
    components: {Stick},
    // data(){
    //     return{
    //         selectedStickLine: null
    //     }
    // },
    created(){
        this.$store.commit('setArrayOfSticks')   
    },
    computed: {
        stickArray(){   
            return this.$store.state.arrayOfSticks
        }
    },
    methods: {
        selectStick(stickLine, index){
            const selectedStickLine = this.$store.state.selectedStickLine
            if(this.$store.state.startedGame && this.$store.state.activePlayer) {
                if(selectedStickLine===null||selectedStickLine === index) {
                    const update = {'stickLine': stickLine, 'index':index, 'number':1}
                    this.$store.commit('updateSelectedStickLine',index)
                    this.$store.commit('updateArrayOfSticks', update)
                    this.$store.commit('updateMove', 1)
                    this.$store.dispatch('checkWinCondition')
                }
                else {
                    console.log('Nur Sticks aus einer Reihe!')
                }
            }
            else {
                if(!this.$store.state.startedGame){
                    console.log('Spiel starten')
                }else{
                    console.log('Du bist nicht dran')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.row{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>