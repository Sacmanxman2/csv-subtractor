<template>
  <div id="app">
    <div class="row p-2">
      <div class="col">File to be edited</div>
        <div class="col-10"><input type="file" id="file1" @change="loadFile1"></div>
      </div>
      <div class="row p-2">
        <div class="col">Reference file</div>
        <div class="col-10"><input type="file" id="file2" @change="loadFile2"></div>
      </div>
      <div class="row p-2">
        <div class="col-2">Column in reference file</div>
        <div class="col-10"><input type=text size=3 @keyup="verifyColumn" v-model="columnChoice" id="columnChoice"></div>
      </div>
      <div class="row p-2">
        <button @click="processData" class="m-1">Create Output</button>
        <button @click="downloadCSV" class="m-1">Download CSV</button>
      </div>
      <p v-if="columnError==1">Please enter a number in the column field and try again</p>
    <p v-if="processingStatus==1">Processing data, please wait...</p>
    <p v-if="processingStatus==2">Done processing data! Press "Download CSV" to download the modified CSV File.</p>
    <p v-if="numOfDeletions!=0">Number of deletions: {{ numOfDeletions }}</p>
  </div>
</template>

<script>
//console.log("Debugmode is on v7")
console.log("v7 - progress on")

function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' +encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export default {
  name: 'app',
  data () {
    return {
      columnChoice: 1,
      file1Contents: [],
      file2Contents: [],
      numOfDeletions: 0,
      outputFileContents: [],
      processingStatus: 0,
      columnError: 0,
    }
  },
  methods: {
    resetVars() {
      this.numOfDeletions = 0
      this.outputFileContents = []
      this.processingStatus = 0
      this.columnError = 0
      this.columnChoice = 1
    },

    verifyColumn() {
      if (isNaN(this.columnChoice) || this.columnChoice < 1) {
        this.columnError = 1
      } else {
        this.columnError = 0
      }
    },

    searchAndDestroy(searchTerm, data) {
      if (typeof(searchTerm) !== 'undefined') {
        for (var a in data) {
          for (var b in data[a]) {
            if (typeof(data[a][b]) !== 'undefined') {
              if (data[a][b].toUpperCase().replace(/\s/g, '') == searchTerm.toUpperCase().replace(/\s/g, '')) {
                //console.info("FOUND A MATCH for " + searchTerm + " at " + a + "," + b)
                this.outputFileContents[a][b] = ''
                this.$data.numOfDeletions++ 
              }
            } else {
              console.log('data[' + a +'][' + b + '] is undefined')
            }
          }
        }
      } else {
        console.log(searchTerm + ' is undefined, ignoring')
      }
    },

    // Methods to load files and parse them into JSON data
    loadFile1(ev) {
      this.resetVars();
      const file1 = ev.target.files[0];
      Papa.parse(file1, {
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results['data']);
          this.file1Contents = results['data'];
        }
      });
    },
    loadFile2(ev) {
      this.resetVars();
      const file2 = ev.target.files[0];
      Papa.parse(file2, {
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results['data']);
          this.file2Contents = results['data'];
        }
      });
    },

    processData(ev) {
      if (this.columnError == 1) {
        console.log("Not running due to column error")
      } else {
        this.processingStatus = 1
        this.outputFileContents = this.file1Contents
        setTimeout(() => {
          for (var c in this.file2Contents){
            console.log("Running on row " + c)
            //console.log(this.columnChoice - 1)
            //console.log(this.file2Contents[c][this.columnChoice - 1])
            this.searchAndDestroy(this.file2Contents[c][this.columnChoice - 1], this.file1Contents);
          }
          this.processingStatus = 2
        }, 1500)
      }
    },

    downloadCSV(ev) {
      download("Output.csv", Papa.unparse(this.outputFileContents))
    }
  }
}
</script>

<style>

</style>
