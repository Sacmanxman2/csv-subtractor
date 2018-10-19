import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opFile: [],
    refFile: [],
    regxFile: [],
    outFile: [],
    numOfDeletions: 0,
    processingStatus: 0,
    refColumnChoice: 1,
    refColumnError: 0,
    refFileSearch: false,
    regxColumnChoice: 1,
    regxColumnError: 0,
    regxFileSearch: false,
    statusMsg: ''
  },
  getters: {
    opFile: state => { return [...state.opFile] },
    refFile: state => { return [...state.refFile] },
    regxFile: state => { return [...state.regxFile] },
    outFile: state => { return [...state.outFile] }
  },
  mutations: {
    resetVars (state) {
      state.numOfDeletions = 0
      state.outFile = []
      state.processingStatus = 0
      state.refColumnError = 0
      state.regxColumnError = 0
    },

    resetPreProcess (state) {
      state.numOfDeletions = 0
      state.outFile = []
      state.processingStatus = 0
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

    applyOutFile (state, contents) {
      state.outFile = [...contents]
    },

    deleteIncrease: (state, v) => { state.numOfDeletions += v },
    setProcessingStatus: (state, v) => { state.processingStatus = v },
    refColumnSet: (state, v) => { state.refColumnChoice = v },
    refColumnError: state => { state.refColumnError = 1 },
    refColumnGood: state => { state.refColumnError = 0 },
    refFileSearch: (state, v) => { state.refFileSearch = v },
    regxColumnSet: (state, v) => { state.regxColumnChoice = v },
    regxColumnError: state => { state.regxColumnError = 1 },
    regxColumnGood: state => { state.regxColumnError = 0 },
    regxFileSearch: (state, v) => { state.regxFileSearch = v },
    resetStatus: state => { state.statusMsg = '' },
    setStatus: (state, v) => { state.statusMsg = v }
  },
  actions: {

  }
})
