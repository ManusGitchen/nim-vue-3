<template>
    <div class="field">
        <div class="stick-row" :class="'row-'+index " v-for="(sticks, index) in stickArray" :key="index">
            {{index}}
            <Stick v-for="(stick) in sticks" :key="stick" v-on:click="selectStick(sticks, index)"/>
        </div>
    </div>
</template>

<script>
import Stick from "./Stick.vue";
import { mapState } from 'vuex'

export default {
    components: {Stick},
    
    mounted(){
        this.$store.commit('setArrayOfSticks')   
    },
    computed: {
        ...mapState({
            startedGame: (state) => state.startedGame,
            activePlayer: (state) => state.activePlayer,
            selectedStickLine: (state) => state.selectedStickLine,
            stickArray: (state) => state.arrayOfSticks
        }),
    },
    methods: {
        selectStick(stickLine, index){
            if(this.startedGame && this.activePlayer) {
                if(this.selectedStickLine === null || this.selectedStickLine === index) {
                    const update = {'stickLine': stickLine, 'index':index, 'number':1}
                    this.$store.commit('updateSelectedStickLine',index)
                    this.$store.commit('updateArrayOfSticks', update)
                    this.$store.commit('updateMove', 1)
                    this.$store.dispatch('checkWinCondition')
                }
                else {
                    this.$store.commit('setHint', 'Nur Sticks aus einer Reihe!')
                }
            }
            else {
                if(!this.startedGame){
                    this.$store.commit('setHint', 'Spiel starten')
                }else{
                    this.$store.commit('setHint', 'Du bist nicht dran')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    & .stick-row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    }
  }
</style>