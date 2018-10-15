import Vuex from 'vuex'

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
  mutations : {
    resetVars(state) {
      state.numOfDeletions = 0
      state.outFile = []
      state.processingStatus = 0
      state.columnError = 0
      state.columnChoice = 1
    },

    fileUpload(state, f) {
      console.log(f['fi'])
      switch(f['fId']){
          case 'opFile':
            state.opFile = Papa.parse(f['fi'], {
              skipEmptyLines: true,
              complete: (results) => {
                console.log(results['data'])
              }
            })
            break
          case 'refFile':
            state.refFile = Papa.parse(f['fi'], {
              skipEmptyLines: true,
              complete: (results) => {
                console.log(results['data'])
              }
            })
            break
          case 'regxFile':
            state.regxFile = Papa.parse(f['fi'], {
              skipEmptyLines: true,
              complete: (results) => {
                console.log(results['data'])
              }
            })
            break
      }
    },

    setProcessingStatus(state, v) {
      state.processingStatus = v
    },

    columnError(state) {
      state.columnError = 1
    },
    columnGood(state) {
      state.columnError = 0
    },
    columnSet(state, v) {
      state.columnChoice = v
    }
  }
})
