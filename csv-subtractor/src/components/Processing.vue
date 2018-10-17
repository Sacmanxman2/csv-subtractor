<template>
  <div>
    <div class="row p-2">
      <button @click="processData" class="m-1">Create Output</button>
      <button @click="downloadCSV" class="m-1">Download CSV</button>
    </div>
    <p v-if="columnError===1">Please enter a number in the column field and try again</p>
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
  computed: {
    ...mapState([
      'columnError',
      'numOfDeletions',
      'processingStatus'
    ])
  },
  methods: {
    searchAndDestroy (searchTerm, data) {
      console.log('searchAndDestroy Started')
      if (typeof searchTerm !== 'undefined') {
        for (var a in data) {
          var delCount = 0
          for (var b in data[a]) {
            if (typeof data[a][b] !== 'undefined') {
              if (data[a][b].toUpperCase().replace(/\s/g, '') === searchTerm.toUpperCase().replace(/\s/g, '')) {
                console.info('FOUND A MATCH for ' + searchTerm + ' at ' + a + ',' + b)
                this.outputFileContents[a][b] = ''
                delCount += 1
              }
            } else {
              console.log('data[' + a + '][' + b + '] is undefined')
            }
          }
          this.$store.commit('deleteIncrement', delCount)
        }
      } else {
        console.log(searchTerm + ' is undefined, ignoring')
      }
    },

    regexFilter (searchTerm, data) {
      if (typeof searchTerm !== 'undefined') {
        for (var a in data) {
          for (var b in data[a]) {
            if (typeof data[a][b] !== 'undefined') {
              let entryU = data[a][b].toUpperCase().replace(/\s/g, '')
              let searchTermU = searchTerm.toUpperCase().replace(/\s/g, '')
              if (entryU.includes(searchTermU)) {
                this.outputFileContents[a][b] = ''
                this.$data.numOfDeletions++
              }
            }
          }
        }
      }
    },

    processData (ev) {
      if (this.columnError === 1) {
        console.log('Not running due to column error')
      } else {
        this.outputFileContents = this.file1Contents
        setTimeout(() => {
          for (var c in this.file2Contents) {
            console.log('Running on row ' + c)
            console.log(this.columnChoice - 1)
            console.log(this.file2Contents[c][this.columnChoice - 1])
            if (this.refFileSearch === true) {
              this.searchAndDestroy(this.file2Contents[c][this.columnChoice - 1], this.file1Contents)
            }
            if (this.regxFileSearch === true) {
              this.regxFileSearch(this.file2Contents[c][this.columnChoice - 1], this.file1Contents)
            }
          }
        }, 1500)
      }
    },

    downloadCSV (ev) {
      download('Output.csv', Papa.unparse(this.outputFileContents))
    }
  }
}

</script>
