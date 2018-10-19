<template>
  <div class="row p-2">
    <div class="col-2"><input type="checkbox" value="true" v-model="checked" v-if="this.fileId!=='opFile'" class="m-1" /> {{ flabel }}</div>
    <div class="col-2"><div v-if="this.fileId!=='opFile'">Column: &nbsp;<input type=text size=3 :value="columnChoice" @change="verifyColumn" id="columnChoice"></div></div>
    <div class="col-8"><input type="file" v-bind:id="fileId" @change="loadFile"></div>
  </div>
</template>

<script>
import Papa from 'papaparse'
// import { mapMutations } from 'vuex'

export default {
  name: 'CsvUploader',
  props: {
    fileId: String,
    flabel: String
  },
  data: () => {
    return {
      fileContents: []
    }
  },
  computed: {
    columnChoice: function () {
      if (this.fileId === 'refFile') {
        return this.$store.state.refColumnChoice
      }
      if (this.fileId === 'regxFile') {
        return this.$store.state.regxColumnChoice
      }
    },
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
        }
        if (this.fileId === 'regxFile') {
          this.$store.commit('regxFileSearch', value)
        }
      }
    }
  },
  methods: {
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

    fileUpload () {
      console.log(this.fileContents)
      var fil = {
        fi: this.fileContents,
        fId: this.fileId
      }
      this.checked = true
      this.$store.commit('uploadSetter', fil)
    },

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
