<template>
  <div>
    <div class="row p-2">
      <button @click="processData" class="m-1">Create Output</button>
      <button @click="downloadCSV" v-if="processingStatus===2" class="m-1">Download CSV</button>
    </div>
    <p v-if="refColumnError===1">Please enter a number in the exact match column field and try again</p>
    <p v-if="regxColumnError===1">Please enter a number in the regex column field and try again</p>
    <p v-if="processingStatus===1">Processing data, please wait...<br>If you get a 'slow browser' message, please ignore it</p>
    <p v-if="processingStatus===2">Done processing data! Press "Download CSV" to download the modified CSV File.</p>
    <p v-if="numOfDeletions!=0">Number of deletions: {{ numOfDeletions }}</p>
  </div>
</template>

<script>
import { download } from '../assets/extraFunctions.js'
import { mapState } from 'vuex' // mapState allows for simple and concise Vuex state > local variable conversions
import Papa from 'papaparse' // this time it's just used to un-parse the array back into a csv file.

export default {
  name: 'Processing',
  data () {
    return {
      delCountTotal: 0 // Variable to keep track of the number deleted. Using a local variable for less Vuex commits, which slows down the browser.
    }
  },
  computed: {
    // assigns the local variables (accessed via this.[name]) to the Vuex state variables of the same name (accessed via this.$store.state.[name])
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
    // Method to search for exact matches and remove them
    exactFilter (searchTerm, data) {
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

    // Function to search for partial matches and remove them
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

    // Method that catches errors
    errorCatch () {
      this.$store.commit('resetPreProcess')
      if (this.refFileSearch && this.refFile.length < 1) {
        this.$store.commit('refFileSearch', false)
      }
      if (this.regxFileSearch && this.regxFile.length < 1) {
        this.$store.commit('regxFileSearch', false)
      }
      if (this.refColumnError === 1 || this.regxColumnError === 1) {
        console.log('Not running due to column error')
        this.$store.commit('setStatus', 'Not running due to column error')
      } else if (this.opFile.length < 1) {
        console.log('Not running - no operating file')
        this.$store.commit('setStatus', 'Not running - no operating file')
      } else if (!this.regxFileSearch && !this.refFileSearch) {
        console.log('Nothing to process')
        this.$store.commit('setStatus', 'Not running, nothing checked to process')
      } else {
        return true
      }
      return false
    },

    // Method that begins the processing
    processData (ev) {
      if (this.errorCatch()) { // errorCatch returns true if no errors were found, allowing this to continue
        this.$store.commit('setProcessingStatus', 1)
        this.$store.commit('resetStatus')

        // setTimeout allows the DOM to update the processingStatus variable before this code runs, so the user knows somethings happening.
        setTimeout(() => {
          var tempOut = [] // create temporary output file by iterating over an array
          for (var tO in this.opFile) {
            tempOut[tO] = []
            for (var tP in this.opFile[tO]) {
              tempOut[tO][tP] = this.opFile[tO][tP]
            }
          }
          // Declaring variables here so we don't declare them multiple times
          var columnToUse
          var tempObj

          this.delCountTotal = 0
          if (this.refFileSearch) { // this.refFileSearch is true if that box is checked as set in CsvUploader. Same for regxFileSearch.
            columnToUse = this.refColumnChoice - 1
            console.log('Processing by reference file')
            // cycle through entries in reference file
            for (var refRow in this.refFile) {
              tempObj = this.exactFilter(this.refFile[refRow][columnToUse], tempOut)
              tempOut = tempObj['data']
              this.delCountTotal += tempObj['delCount']
            }
          }
          this.$store.commit('deleteIncrease', this.delCountTotal) // update the vuex store with the new local delcount.

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

          this.$store.commit('applyOutFile', tempOut) // Turns the temporary file into the output file for use in the download function later.
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
