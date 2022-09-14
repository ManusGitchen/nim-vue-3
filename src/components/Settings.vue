<template>
  <div class="settings-wrapper">
    <div class="game-settings">
      <h4>Wähle deinen Gegner</h4>
      Zufall Computer
      <label class="switch">
        <input type="checkbox" id="checkbox" v-model="boston" />
        <span class="slider round"></span>
      </label>
      Boston Computer
      <div class="game-settings--desc">
        <p>Der Zufall Computer wird 1-3 zufällig gewählte Sticks ziehen und danach seinen Zug beenden.</p>
        <p>Der Boston Computer wendet die Boston Strategie an und berechnet ungerade Spaltensummen, um den Gegner in eine Verlustsituation zu bringen.</p>
      </div>
    </div>
    <div class="game-settings--hints" v-show="hint">
      {{hint}}
    </div>
    <div class="game-settings--control">
      <div class="game-settings--control__start" v-show="!startedGame">
        <button class="btn-default btn-start" @click="startGame">Spiel starten</button>
        <div class="game-settings--desc">
          <p>Spiel starten. Du bist als erstes am Zug und darfst 1-3 Sticks aus der selben Reihe auswählen.</p>
        </div>
      </div>
      <div class="game-settings--control__next">
        <button class="btn-default" @click="skipMove">Zug beenden</button>
        <div class="game-settings--desc">
          <p>Beende den Zug, dann ist dein Gegner an der Reihe.</p>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            boston: false,
            computersTurn: 1
        }
    },
    computed: {
        ...mapState({
            startedGame: (state) => state.startedGame,
            moveCount: (state) => state.moveCount,
            hint: (state) => state.gameHint
        })
    },
    methods: {
        startGame(){
            this.startedGame
            ? this.$store.commit('setHint','Du bist am Zug')
            : this.$store.commit('gameState', true)
        },
        skipMove(){
            if(this.moveCount > 1) {
              this.$store.commit('updateSelectedStickLine',null)
                this.$store.dispatch('skipMove')
                this.boston
                ? this.bostonStrategy()
                : this.$store.dispatch('runComputer')
            }else{
              this.$store.commit('setHint', 'Du musst mindest ein Streichholz ziehen')
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
  .game-settings {
    &--desc {
      text-align: center;
      font-size: 65%;
      color: #aaa;
      padding: 0 1rem;
    }
    &--hints {
      padding: 1.5rem;
      border: 1px solid var(--primary);
      background: var(--primary-lightest);
      margin: 1rem 0;
    }
  }

</style>