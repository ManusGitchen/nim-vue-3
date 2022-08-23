<template>
    <div class="settings-wrapper">
        <h2 class="title">Settings</h2>
        <button 
        v-show="!startedGame"
        @click="startGame">start game</button>
        <button 
        @click="skipMove">Zug beenden</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed: {
        startedGame() {
            return this.$store.state.startedGame
        },
    },
    methods: {
        startGame(){this.$store.state.startedGame
            ? console.log('Du bist am Zug')
            : this.$store.commit('gameState', true)},
        skipMove(){
            if(this.$store.state.moveCount > 1) {
                this.$store.dispatch('skipMove')
                this.$store.commit('updateSelectedStickLine',null)
                this.$store.dispatch('runComputer')
            }else{
                console.log('Du musst mindest ein Streichholz ziehen')
            }
           
        },
    }
    
}
</script>

<style lang="scss" scoped>

</style>