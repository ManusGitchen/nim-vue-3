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

  mutations: {

    /**
     * Berechnet die zeilenweise Verteilung der Sticks, abhängig von der maximalen Anzahl.
     * 
     * @param {*} state 
     */
    setArrayOfSticks(state) {
      let maxSticks = state.numberOfSticks
      let count = 1
      state.arrayOfSticks = []
      while (maxSticks > 0) {
        state.arrayOfSticks.push(count);
        maxSticks = maxSticks - count;
        count = count + 2;
      }
      state.bostonArrayOfSticks = state.arrayOfSticks
    },

    /**
     * Prüft, ob noch ein Zug möglich ist.
     * Aktualisiert das Array der Sticks nach einem Zug.
     * @param {*} state 
     * @param {*} update Objekt mit Angaben zum Zug. Welche Zeile und wie viele Sticks
     */
    updateArrayOfSticks(state, update) {
      if (state.moveCount < 4) {
        state.arrayOfSticks[update.index] = update.stickLine - update.number
      } else {
        this.commit('setHint', 'Beende deinen Zug, du hast keine Züge mehr')
      }
    },

    /**
     * Die Boston Strategie verwendet ein eigenes, binäres Stick Array, was zurück gerechnet
     * in dann in das allgemeine Stick Array geschrieben wird.
     * @param {*} state 
     */
    updateArrayOfSticksBoston(state) {
      this.commit('rotateMatrix', { deg: 270 })
      let stickArray = []
      state.squereMatrix.forEach(item => stickArray.push(parseInt(item.join(""), 2)))
      state.bostonArrayOfSticks = stickArray
      state.arrayOfSticks = state.bostonArrayOfSticks
    },

    /**
     * Setzt Attribut startedGame auf true, wenn das Spiel beginnt und auf false, wenn der Gewinner feststeht.
     * @param {*} state 
     * @param {*} status Boolean
     */
    gameState(state, status) {
      state.startedGame = status
      if (status === true) {
        state.activePlayer = true
        this.commit('setHint', 'Ziehe deine Sticks')
      }
    },

    /**
     * Setzt eine Nachricht für den Spieler
     * @param {*} state 
     * @param {*} hint String
     */
    setHint(state, hint) {
      state.gameHint = hint
    },

    /**
     * Setzt die gewählte Reihe im ersten Zug der jeweiligen Runde.
     * @param {*} state 
     * @param {*} stickLine Number
     */
    updateSelectedStickLine(state, stickLine) {
      state.selectedStickLine = stickLine
    },

    /**
     * Counter für die Anzahl der Züge.
     * @param {*} state 
     * @param {*} moves Number
     */
    updateMove(state, moves) {
      moves !== undefined ? state.moveCount += moves : state.moveCount++
    },

    /**
     * Setzt den Zug Counter zurück
     * @param {*} state 
     */
    resetMoveCount(state) {
      state.moveCount = 1
    },

    /**
     * Wechselt zwischen aktivem Spieler (true) und Computergegner (false)
     * @param {*} state 
     */
    switchPlayer(state) {
      state.moveIndex = -1
      state.activePlayer = !state.activePlayer
      this.commit('setHint', 'Ziehe deine Sticks')
    },

    /**
     * Berechnet die binäre Matrix basierend auf dem Stick Array
     * @param {*} state 
     */
    setBinaryMatrix(state) {
      const binaryMatrix = []
      state.bostonArrayOfSticks.forEach(stick => {
        binaryMatrix.push((stick >>> 0).toString(2))
      })
      state.binaryMatrix = binaryMatrix
    },

    /**
     * Berechnet die binäre, quadratische Matrix
     * @param {*} state 
     */
    setSquereMatrix(state) {
      let array = []
      let cache = []
      state.binaryMatrix.forEach(item => array.push(item.split("")))

      array.forEach(item => {
        item = item.map(str => {
          return Number(str);
        })
        while (item.length < array.length) {
          item = [0].concat(item)
        }
        cache.push(item)
      })
      state.squereMatrix = cache
    },

    /**
     * Rotiert die binäre, quadratische Matrix um die übergebene Gradzahl (90/180/270/360)
     * @param {*} state 
     * @param {*} deg Number 90/180/270/360
     */
    rotateMatrix(state, { deg }) {
      let squereMatrix = state.squereMatrix
      while (state.degree !== deg) {
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
    /**
     * Beendet einen Zug, in dem der Zug Counter zurückgesetzt und der Spieler gewechselt wird, 
     * sofern es noch mögliche Züge gibt
     * @param {*} state 
     */
    skipMove({ state,commit }) {
      commit('resetMoveCount')
      state.arrayOfSticks.some(stick => stick !== 0)
        ? commit('switchPlayer')
        : commit('setHint', 'Du hast verloren')
    },
    /** Der zug des Spielers wird ausgeführt. */
    playerSelectStick({ commit, dispatch }, updateObj) {
      commit('updateSelectedStickLine', updateObj.index)
      commit('updateArrayOfSticks', updateObj)
      commit('updateMove', 1)
      dispatch('checkWinCondition')
    },

    /**
     * Der Simple Computer Zug
     * Berechnet den ersten möglichen Zug mit einer zufällig Anzahl zwischen 1 und 3 Sticks 
     * @param {*} state 
     */
    runComputer({ state,commit,dispatch }) {
      const numberOfSticks = Math.floor(Math.random() * 2) + 1
      if (state.arrayOfSticks.some(row => row === numberOfSticks)) {
        const firstFitRow = state.arrayOfSticks.find(row => row >= numberOfSticks)
        const update = {
          'stickLine': firstFitRow,
          'index': state.arrayOfSticks.indexOf(firstFitRow),
          'number': numberOfSticks
        }
        commit('updateArrayOfSticks', update)
      } else {
        const firstFitRow = state.arrayOfSticks.find(row => row >= 1)
        const update = {
          'stickLine': firstFitRow,
          'index': state.arrayOfSticks.indexOf(firstFitRow),
          'number': 1
        }
        commit('updateArrayOfSticks', update)
      }
      dispatch('checkWinCondition')
    },

    /**
     * Berechnet die zu ziehenden Sticks nach der Boston Strategie 
     * Ungerade Spaltensummen in der binären Matrix zeigen passende Züge an
     * Gezogen wird nur aus der 2er oder 1er Reihe (maximale Anzahl 3)
     * Falls es keine ungeraden Spaltensummen gibt, der Computer sich also in einer Verlustsituation befindet,
     * zieht der einfache Zufallscomputer
     * @param {*} state 
     */
    bostonMove({ state,commit,dispatch }) {
      commit('rotateMatrix', { deg: 90 })
      const filteredArray = state.arrayOfSticks.filter(x => x !== 0)
      const oneColumn = state.squereMatrix[state.squereMatrix.length - 1]
      const twoColumn = state.squereMatrix[state.squereMatrix.length - 2]
      if (filteredArray.length === 1 && !filteredArray.some(element => element > 3)) {
        const update = {
          'stickLine': state.arrayOfSticks.find(row => row !== 0),
          'index': state.arrayOfSticks.indexOf(filteredArray[0]),
          'number': state.arrayOfSticks[state.arrayOfSticks.indexOf(filteredArray[0])] - (state.arrayOfSticks[state.arrayOfSticks.indexOf(filteredArray[0])] - 1)
        }
        commit('updateArrayOfSticks', update)
        dispatch('checkWinCondition')
      } else {
        if (state.moveCount <= 2 && (twoColumn.reduce((a, b) => a + b, 0) % 2 !== 0)) {
          dispatch('bostonStickSelection', { column: twoColumn, pos: 2 })
          commit('updateMove', 2)
          if ((oneColumn.reduce((a, b) => a + b, 0) % 2 !== 0) && oneColumn[state.moveIndex] === 1) {
            dispatch('bostonStickSelection', { column: oneColumn, pos: 1 })
            dispatch('bostonExecuteMove')
          } else {
            dispatch('bostonExecuteMove')
          }
        } else if ((oneColumn.reduce((a, b) => a + b, 0) % 2 !== 0)) {
          dispatch('bostonStickSelection', { column: oneColumn, pos: 1 })
          dispatch('bostonExecuteMove')
        } else {
          dispatch('runComputer')
        }
      }
    },

    /**
     * Bereitet den Zug des Boston Computers vor
     */
    bostonSetup({commit}) {
      commit('setBinaryMatrix')
      commit('setSquereMatrix')
    },

    /**
     * Wählt den berechneten Stick des Boston Computers aus
     * @param {*} state 
     * @param {*} Object Spalte und Position 
     */
    bostonStickSelection({ state }, { column, pos }) {
      let selectedColumn = column
      if (state.moveIndex === -1) {
        state.moveIndex = selectedColumn.findIndex(item => item > 0)
      }
      selectedColumn[state.moveIndex] = 0
      state.squereMatrix[state.squereMatrix.length - pos] = selectedColumn
    },

    /**
     * Führt den Zug des Boston Computers aus
     */
    bostonExecuteMove({commit,dispatch}) {
      commit('updateArrayOfSticksBoston')
      dispatch('checkWinCondition')
      commit('resetMoveCount')
    },

    /**
     * Prüft die Gewinn/Verlust Situation nach jedem Zug
     * @param {*} state 
     */
    checkWinCondition({ state, commit }) {
      const filteredArray = state.arrayOfSticks.filter(x => x !== 0)
      if (filteredArray.length <= 1 && !filteredArray.some(element => element > 1)) {
        commit('gameState', false)
        state.activePlayer
          ? state.gameHint = 'Du hast gewonnen'
          : state.gameHint = 'Der Computer hat gewonnen'
        commit('setArrayOfSticks')
        commit('resetMoveCount')
        commit('updateSelectedStickLine', null)
      } else if (!state.activePlayer) {
        commit('switchPlayer')
      }
    }
  }
});
