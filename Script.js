var count = 0;

const resetVars = () => {
  count = 0;
};

const searchAndDestroy = (searchTerm, data) => {
  // data should be in the form of an array/list/json variable

  for (var a in data) {
    for (var b in data[a]) {
      if (data[a][b].toUpperCase().replace(/\s/g, '') == searchTerm.toUpperCase().replace(/\s/g, '')) {
        console.info("FOUND A MATCH for " + searchTerm);
        count++;
      }
    }
  };
};

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      file1Contents: [],
      file2Contents: [],
      numOfDeletions: 0,
      outputFileContents: []
    }
  },
  methods: {

    // Methods to load files and parse them into JSON data
    loadFile1(ev) {
      resetVars();
      this.numOfDeletions = count;
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
      resetVars();
      this.numOfDeletions = count;
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
      for (var c in this.file2Contents){
        searchAndDestroy(this.file2Contents[c][0], this.file1Contents);
        this.numOfDeletions = count;
      }
    }
  }
});
