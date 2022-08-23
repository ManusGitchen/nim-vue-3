import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfSticks: 13,
    arrayOfSticks: [],
    maxAllowedMoves: 3,
    startedGame: false,
    activePlayer: true,
    moveCount: 1,
    selectedStickLine: null
  },
  getters: {
  },
  mutations: {
    setArrayOfSticks(state){
      let maxSticks = state.numberOfSticks
      let count = 1
      while(maxSticks > 0){
        state.arrayOfSticks.push(count);
        maxSticks = maxSticks - count;
        count = count + 2;
      }
    },
    updateArrayOfSticks(state, update){
      // let numberOfSticks = 1
      // update.number !== undefined ? numberOfSticks = update.number : numberOfSticks = 1
      if(state.moveCount < 4) {
        state.arrayOfSticks[update.index] = update.stickLine - update.number
      }else {
        console.log('DU BIST NICHT MEHR DRAN')
      }
    },
    gameState(state, status){
      state.startedGame = status
    },
    updateSelectedStickLine(state, stickLine){
      state.selectedStickLine = stickLine
    },
    updateMove(state){
        state.moveCount++ 
    },
    resetMoveCount(state){
      state.moveCount = 1
    },
    switchPlayer(state) {
      state.activePlayer = !state.activePlayer
    }
  },
  actions: {
    skipMove({state}){
      this.commit('resetMoveCount')
      state.arrayOfSticks.some(stick => stick !== 0) ? this.commit('switchPlayer') : console.log('VERLOREN')
      // if(this.dispatch('checkWinCondition')){
      //   // this.dispatch('checkWinCondition')
      // }else{
      //   console.log('VERLOREN')
      // }
    },
    runComputer({state}){
      const numberOfSticks = Math.floor(Math.random()*2)+1
      if(state.arrayOfSticks.some(row => row === numberOfSticks)){
        const firstFitRow = state.arrayOfSticks.find(row => row >= numberOfSticks)
        const update = {
          'stickLine' : firstFitRow,
          'index': state.arrayOfSticks.indexOf(firstFitRow),
          'number': numberOfSticks
        }
        this.commit('updateArrayOfSticks', update)
      }else{
        const firstFitRow = state.arrayOfSticks.find(row => row >= 1)
        const update = {
          'stickLine' : firstFitRow,
          'index': state.arrayOfSticks.indexOf(firstFitRow),
          'number': 1
        }
        this.commit('updateArrayOfSticks', update)
      }
      this.commit('switchPlayer')
      this.dispatch('checkWinCondition')
    },
    checkWinCondition({state}){
      const filteredArray = state.arrayOfSticks.filter(x => x !== 0)
      if(filteredArray.length === 1 && !filteredArray.some(element => element > 1)) {
        this.commit('switchPlayer')
        console.log('Gewonnen hat: ' + state.activePlayer)
      }
    }
  },
  modules: {},
});
