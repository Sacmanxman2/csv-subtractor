<template>
  <div>
    <div class="row p-2">
      <button @click="processData" class="m-1">Create Output</button>
      <button @click="downloadCSV" v-if="processingStatus===2" class="m-1">Download CSV</button>
    </div>
    <p v-if="refColumnError===1">Please enter a number in the exact match column field and try again</p>
    <p v-if="regxColumnError===1">Please enter a number in the regex column field and try again</p>
    <p v-if="processingStatus===1">Processing data, please wait...</p>
    <p v-if="processingStatus===2">Done processing data! Press "Download CSV" to download the modified CSV File.</p>
    <p v-if="numOfDeletions!=0">Number of deletions: {{ numOfDeletions }}</p>
  </div>
</template>

<script>
import { download } from '../assets/extraFunctions.js'
import { mapState } from 'vuex'
import Papa from 'papaparse'

export default {
  name: 'Processing',
  data () {
    return {
      delCountTotal: 0
    }
  },
  computed: {
    ...mapState([
      'opFile',
      'refFile',
      'regxFile',
      'outFile',
      'refColumnChoice',
      'refColumnError',
      'refFileSearch',
      'regxColumnChoice',
      'regxColumnError',
      'regxFileSearch',
      'numOfDeletions',
      'processingStatus'
    ])
  },

  methods: {
    searchAndDestroy (searchTerm, data) {
      var delCount = 0
      if (typeof searchTerm !== 'undefined') {
        for (var a in data) {
          for (var b in data[a]) {
            if (typeof data[a][b] !== 'undefined') {
              if (data[a][b].toUpperCase().replace(/\s/g, '') === searchTerm.toUpperCase().replace(/\s/g, '')) {
                console.info('FOUND A MATCH for ' + searchTerm + ' at ' + a + ',' + b)
                data[a][b] = ''
                delCount++
              }
            } else {
              console.log('data[' + a + '][' + b + '] is undefined')
            }
          }
        }
      } else {
        console.log(searchTerm + ' is undefined, ignoring')
      }
      return { data, delCount }
    },

    regxFilter (searchTerm, data) {
      var delCount = 0
      if (typeof searchTerm !== 'undefined') {
        for (var a in data) {
          for (var b in data[a]) {
            if (typeof data[a][b] !== 'undefined') {
              let entryU = data[a][b].toUpperCase().replace(/\s/g, '')
              let searchTermU = searchTerm.toUpperCase().replace(/\s/g, '')
              // console.log('testing ' + entryU + 'against' + searchTermU)
              if (entryU.includes(searchTermU)) {
                data[a][b] = ''
                console.info('FOUND A MATCH for ' + searchTerm + ' at ' + a + ',' + b)
                delCount++
              }
            }
          }
        }
      }
      return { data, delCount }
    },

    processData (ev) {
      if (this.refColumnError === 1 || this.regxColumnError === 1) {
        console.log('Not running due to column error')
        this.$store.commit('setStatus', 'Not running due to column error')
      } else if (this.opFile.length < 1) {
        console.log('Not running - no operating file')
        this.$store.commit('setStatus', 'Not running - no operating file')
      } else if (!this.regxFileSearch && !this.refFileSearch) {
        console.log('Nothing to process')
        this.$store.commit('resetPreProcess')
        this.$store.commit('setStatus', 'No processing done, nothing to process')
      } else {
        this.$store.commit('resetPreProcess')
        this.$store.commit('setProcessingStatus', 1)
        this.$store.commit('resetStatus')

        setTimeout(() => {
          // create temporary output file
          var tempOut = []
          for (var tO in this.opFile) {
            tempOut[tO] = []
            for (var tP in this.opFile[tO]) {
              tempOut[tO][tP] = this.opFile[tO][tP]
            }
          }
          var columnToUse
          var tempObj

          this.delCountTotal = 0
          if (this.refFileSearch) {
            columnToUse = this.refColumnChoice - 1
            console.log('Processing by reference file')
            // cycle through entries in reference file
            for (var refRow in this.refFile) {
              tempObj = this.searchAndDestroy(this.refFile[refRow][columnToUse], tempOut)
              tempOut = tempObj['data']
              this.delCountTotal += tempObj['delCount']
            }
          }
          this.$store.commit('deleteIncrease', this.delCountTotal)

          this.delCountTotal = 0
          if (this.regxFileSearch) {
            columnToUse = this.regxColumnChoice - 1
            console.log('Processing by regex file')
            // cycle through rows in temp out file
            for (var regxRow in this.regxFile) {
              tempObj = this.regxFilter(this.regxFile[regxRow][columnToUse], tempOut)
              tempOut = tempObj['data']
              this.delCountTotal += tempObj['delCount']
            }
          }
          this.$store.commit('deleteIncrease', this.delCountTotal)

          this.$store.commit('applyOutFile', tempOut)
          this.$store.commit('setProcessingStatus', 2)
        }, 100)
      }
    },

    downloadCSV (ev) {
      download('Output.csv', Papa.unparse(this.outFile))
    }
  }
}

</script>
