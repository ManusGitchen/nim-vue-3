import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfSticks: 13,
    arrayOfSticks: [],
    bostonArrayOfSticks: [],
    binaryMatrix: [],
    startedGame: false,
    activePlayer: true,
    selectedStickLine: null,
    moveIndex: -1,
    moveCount: 1,
    degree: 0,
    squereMatrix: [],
    gameHint: ''
  },
  getters: {
  },
  mutations: {
    setArrayOfSticks(state){
      let maxSticks = state.numberOfSticks
      let count = 1
      state.arrayOfSticks = []
      while(maxSticks > 0){
        state.arrayOfSticks.push(count);
        maxSticks = maxSticks - count;
        count = count + 2;
      }
      state.bostonArrayOfSticks = state.arrayOfSticks
    },
    updateArrayOfSticks(state, update){
      if(state.moveCount < 4) {
        state.arrayOfSticks[update.index] = update.stickLine - update.number
      }else {
        this.commit('setHint', 'Beende deinen Zug, du hast keine Züge mehr')
      }
    },
    changeArrayOfSticks(state, array){
      state.arrayOfSticks = array
    },
    updateArrayOfSticksBoston(state){
      this.commit('rotateMatrix', {deg: 270})
      let stickArray = []
      state.squereMatrix.forEach(item => stickArray.push(parseInt(item.join(""),2)))
      state.bostonArrayOfSticks = stickArray
      state.arrayOfSticks = state.bostonArrayOfSticks

    },
    gameState(state, status){
      state.startedGame = status
      if(status === true) {
        state.activePlayer = true
        this.commit('setHint', 'Ziehe deine Sticks')
      }
    },
    setHint(state, hint){
      state.gameHint = hint
    },
    updateSelectedStickLine(state, stickLine){
      state.selectedStickLine = stickLine
    },
    updateMove(state, moves){
      moves !== undefined ? state.moveCount += moves : state.moveCount++ 
    },
    resetMoveCount(state){
      state.moveCount = 1
    },
    switchPlayer(state) {
      state.moveIndex = -1
      state.activePlayer = !state.activePlayer
      this.commit('setHint', 'Ziehe deine Sticks')
    },
    setBinaryMatrix(state) {
      const binaryMatrix = []
      state.bostonArrayOfSticks.forEach(stick => {
        binaryMatrix.push((stick >>> 0).toString(2))
      })
      state.binaryMatrix = binaryMatrix
    },
    setSquereMatrix(state){
      let array = []
      let cache = []
      state.binaryMatrix.forEach(item => array.push(item.split("")))
      
      array.forEach(item => {
        item = item.map(str => {
          return Number(str);
        })
        while(item.length<array.length){
          item = [0].concat(item)
        }
        cache.push(item)
      })
      state.squereMatrix = cache
    },
    rotateMatrix(state, {deg}){
      let squereMatrix = state.squereMatrix      
      while(state.degree !== deg) {
        squereMatrix = squereMatrix.map((row, i) =>
        row.map((val, j) => squereMatrix[squereMatrix.length - 1 - j][i])
        )
        state.degree += 90
        state.squereMatrix = squereMatrix
      }
      state.degree = 0

    },
  },


  actions: {
    skipMove({state}){
      this.commit('resetMoveCount')
      state.arrayOfSticks.some(stick => stick !== 0) 
        ? this.commit('switchPlayer') 
        : this.commit('setHint', 'Du hast verloren')
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
      if(filteredArray.length <= 1 && !filteredArray.some(element => element > 1)) {
        // this.commit('switchPlayer')
        this.commit('gameState', false)
        state.activePlayer
        ? state.gameHint = 'Du hast gewonnen'
        : state.gameHint = 'Der Computer hat gewonnen'
        this.commit('setArrayOfSticks')
        this.commit('resetMoveCount')
        this.commit('updateSelectedStickLine', null)
      }else if(!state.activePlayer){
        this.commit('switchPlayer')
      }
    },
    bostonSetup(){
      this.commit('setBinaryMatrix')
      this.commit('setSquereMatrix')
    },
    bostonStickSelection({state}, {column, pos}){
      let selectedColumn = column
      if(state.moveIndex === -1) {
        state.moveIndex = selectedColumn.findIndex(item => item > 0)
      }
      selectedColumn[state.moveIndex] = 0
      state.squereMatrix[state.squereMatrix.length-pos] = selectedColumn
    },    
    bostonExecuteMove(){
      this.commit('updateArrayOfSticksBoston')
      // this.dispatch('skipMove')
      this.dispatch('checkWinCondition')
      this.commit('resetMoveCount')
    },
    bostonMove({state}) {
      this.commit('rotateMatrix', {deg: 90})
      const filteredArray = state.arrayOfSticks.filter(x => x !== 0)
      const oneColumn = state.squereMatrix[state.squereMatrix.length-1]
      const twoColumn = state.squereMatrix[state.squereMatrix.length-2]
      if(filteredArray.length === 1 && !filteredArray.some(element => element > 3)) {
        const update = {
          'stickLine' : state.arrayOfSticks.find(row => row !== 0),
          'index': state.arrayOfSticks.indexOf(filteredArray[0]),
          'number': state.arrayOfSticks[state.arrayOfSticks.indexOf(filteredArray[0])]-(state.arrayOfSticks[state.arrayOfSticks.indexOf(filteredArray[0])]-1)
        }
        this.commit('updateArrayOfSticks', update)
        // this.commit('switchPlayer')
        this.dispatch('checkWinCondition')
      }else{
      if(state.moveCount <=2 && (twoColumn.reduce((a, b) => a + b, 0)%2 !== 0)){
        this.dispatch('bostonStickSelection', {column: twoColumn, pos: 2})
        this.commit('updateMove', 2)
        if((oneColumn.reduce((a, b) => a + b, 0)%2 !== 0) && oneColumn[state.moveIndex]===1){
          this.dispatch('bostonStickSelection', {column: oneColumn, pos: 1})
          this.dispatch('bostonExecuteMove')
        }else{
          this.dispatch('bostonExecuteMove')
        }
      }else if((oneColumn.reduce((a, b) => a + b, 0)%2 !== 0)){
        this.dispatch('bostonStickSelection', {column: oneColumn, pos: 1})
        this.dispatch('bostonExecuteMove')
      }
      else {
        this.dispatch('runComputer')
      }
    }
    },
  },
  modules: {},
});
