<template>
  <div class="row p-2">
    <div class="col-2"><input type="checkbox" value="true" v-model="checked" v-if="this.fileId!=='opFile'" class="m-1" /> {{ flabel }}</div>
    <div class="col-2"><div v-if="this.fileId!=='opFile'">Column: &nbsp;<input type=text size=3 :value="columnChoice" @change="verifyColumn" id="columnChoice"></div></div>
    <div class="col-8"><input type="file" v-bind:id="fileId" @change="loadFile"></div>
  </div>
</template>

<script>
// papaparse is the CSV parsing library
import Papa from 'papaparse'

export default {
  name: 'CsvUploader',
  props: {
    fileId: String, // tells it whether it's the opFile, the refFile, or the regFile
    flabel: String // the label to show on the actual page
  },
  data: () => {
    return {
      fileContents: []
    }
  },
  computed: {
    // gets the column choice variable based on which fileId this has
    columnChoice: function () {
      if (this.fileId === 'refFile') {
        return this.$store.state.refColumnChoice // this.$store.state references the Vuex store state where these are all contained
      }
      if (this.fileId === 'regxFile') {
        return this.$store.state.regxColumnChoice
      }
    },
    // Separate get and set commands, so the v-model syntax works. V-model is a type of two-way binding so the variable always shows what the value is, and if it's changed it sets the value accordingly:
    checked: {
      get () {
        if (this.fileId === 'refFile') {
          return this.$store.state.refFileSearch
        }
        if (this.fileId === 'regxFile') {
          return this.$store.state.regxFileSearch
        }
      },
      set (value) {
        if (this.fileId === 'refFile') {
          this.$store.commit('refFileSearch', value)
          // this.$store.commit is used to set/change values in the store via mutations, which are listed in the store.js file.
        }
        if (this.fileId === 'regxFile') {
          this.$store.commit('regxFileSearch', value)
        }
      }
    }
  },
  methods: {
    // Verifies that the column is indeed a number above 1
    verifyColumn (e) {
      if (this.fileId === 'refFile') {
        if (isNaN(e.target.value) || e.target.value < 1) {
          this.$store.commit('refColumnError')
        } else {
          this.$store.commit('refColumnGood')
        }
        this.$store.commit('refColumnSet', e.target.value)
        console.log(this.$store.state.refColumnChoice + ',' + this.$store.state.refColumnError)
      }
      if (this.fileId === 'regxFile') {
        if (isNaN(e.target.value) || e.target.value < 1) {
          this.$store.commit('regxColumnError')
        } else {
          this.$store.commit('regxColumnGood')
        }
        this.$store.commit('regxColumnSet', e.target.value)
        console.log(this.$store.state.regxColumnChoice + ',' + this.$store.state.regxColumnError)
      }
    },

    // 'uploads' (not really) the local variable contents to the Vuex store state (which is all client-side, despite the name)
    fileUpload () {
      console.log(this.fileContents)
      var fil = {
        fi: this.fileContents,
        fId: this.fileId
      }
      this.checked = true
      this.$store.commit('uploadSetter', fil)
    },

    // parses the file into a local variable
    loadFile (ev) {
      if (this.fileId === 'opFile') {
        this.$store.commit('resetVars')
      }
      Papa.parse(ev.target.files[0], {
        skipEmptyLines: true,
        complete: (results) => {
          this.fileContents = results['data']
          this.fileUpload()
          this.$store.commit('resetStatus')
        }
      })
    }
  }
}

</script>
