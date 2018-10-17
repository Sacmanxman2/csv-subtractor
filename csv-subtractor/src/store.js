import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opFile: [],
    refFile: [],
    regxFile: [],
    outFile: [],
    columnChoice: 1,
    numOfDeletions: 0,
    processingStatus: 0,
    columnError: 0
  },
  mutations: {
    resetVars (state) {
      state.numOfDeletions = 0
      state.outFile = []
      state.processingStatus = 0
      state.columnError = 0
      state.columnChoice = 1
    },

    uploadSetter (state, f) {
      var parsedFile = f['fi']
      switch (f['fId']) {
        case 'opFile':
          state.opFile = parsedFile
          break
        case 'refFile':
          state.refFile = parsedFile
          break
        case 'regxFile':
          state.regxFile = parsedFile
          break
      }
    },

    columnSet: (state, v) => { state.columnChoice = v },
    deleteIncrement: (state) => { state.numOfDeletions++ },
    deleteIncrease: (state, v) => { state.numOfDeletions += v },
    setProcessingStatus: (state, v) => { state.processingStatus = v },
    columnError: state => { state.columnError = 1 },
    columnGood: state => { state.columnError = 0 }
  },
  actions: {

  }
})
