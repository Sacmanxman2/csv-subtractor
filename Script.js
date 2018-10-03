

var app = new Vue({
  el: '#app',
  data: {
    file1Contents: [],
    file2Contents: [],
    numScanned: 0,
    numOfDeletions: 0,
    outputFileContents: [],
    processingStatus: 0
  },
  methods: {
    resetVars() {
      this.numScanned = 0;
      this.numOfDeletions = 0;
      this.outputFileContents = [];
      this.processingStatus = 0;
    },

    searchAndDestroy(searchTerm, data) {
      for (var a in data) {
        for (var b in data[a]) {
          if (data[a][b].toUpperCase().replace(/\s/g, '') == searchTerm.toUpperCase().replace(/\s/g, '')) {
            // console.info("FOUND A MATCH for " + searchTerm);
            this.$data.numOfDeletions++;
          }
          this.$data.numScanned++;
        }
      };
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
      console.log("Beginning processing data");
      this.$data.processingStatus = 1;
      setTimeout(() => {
        for (var c in this.file2Contents){
          this.searchAndDestroy(this.file2Contents[c][0], this.file1Contents);
        }
        this.$data.processingStatus = 2;
        console.log("Finished processing data");
      }, 10);
    }
  }
});
