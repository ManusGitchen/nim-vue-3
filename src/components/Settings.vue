<template>
    <div class="settings-wrapper">
        <h2 class="title">Settings</h2>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox" v-if="checked">Boston</label>
        <label for="checkbox" v-else>Zufalls Computer</label>
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
            checked: false,
            computersTurn: 1
        }
    },
    computed: {
        startedGame() {
            // this.$store.commit('setBinaryMatrix')
            return this.$store.state.startedGame
        },
    },
    methods: {
        startGame(){
            this.$store.state.startedGame
            ? console.log('Du bist am Zug')
            : this.$store.commit('gameState', true)
        },
        skipMove(){
            if(this.$store.state.moveCount > 1) {
                this.$store.dispatch('skipMove')
                this.$store.commit('updateSelectedStickLine',null)
                this.checked
                ? this.bostonStrategy()
                : this.$store.dispatch('runComputer')
            }else{
                console.log('Du musst mindest ein Streichholz ziehen')
            }
        },
        bostonStrategy(){
                this.$store.dispatch('bostonSetup')
                this.$store.dispatch('bostonMove') 
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>