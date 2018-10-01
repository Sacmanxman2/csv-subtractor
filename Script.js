var app = new Vue({
  el: '#app',
  data: function () {
    return {
      message: 'Hello World!',
      file1Contents: [],
      file2Contents: []
    }
  },
  methods: {
    loadTextFromFile1(ev) {
      const file1 = ev.target.files[0];
      Papa.parse(file1, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results['data']);
          this.file1Contents = results['data'];
        }
      });
    },
    loadTextFromFile2(ev) {
      const file2 = ev.target.files[0];
      Papa.parse(file2, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results['data']);
          this.file2Contents = results['data'];
        }
      });
    }

  }
});
