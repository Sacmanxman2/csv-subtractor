<template>
  <div class="row p-2">
    <div class="col-2"><input type="checkbox" v-model="checked" v-if="this.fileId!=='opFile'" class="m-1" /> {{ flabel }}</div>
    <div class="col-10"><input type="file" v-bind:id="fileId" @change="loadFile"></div>
  </div>
</template>

<script>
//import { mapMutations } from 'vuex'

export default {
  name: 'CsvUploader',
  props: {
    fileId: String,
    flabel: String,
  },
  data: () => {
    return {
      checked: "",
      fileContents: []
    }
  },
  methods: {
    //...mapMutations([
    //  'fileUpload'
    //]),

    fileUpload() {
      var fil = {
        fi: this.fileContents,
        fId: this.fileId
      }
      this.checked = "checked"
      this.$store.commit('uploadSetter', fil)
    },

    loadFile(ev) {
      Papa.parse(ev.target.files[0], {
        skipEmptyLines: true,
        complete: (results) => {
          this.fileContents = results['data']
          this.fileUpload()
        }
      })
    },
  }
}

</script>


