<template>
  <div class="row p-2">
    <div class="col">{{ flabel }}</div>
    <div class="col-10"><input type="file" v-bind:id="fileId" @change="loadFile"></div>
  </div>
</template>

<script>
//import { mapMutations } from 'vuex'

export default {
  name: 'CsvUploader',
  props: {
    fileId: String,
    flabel: String
  },
  methods: {
    //...mapMutations([
    //  'fileUpload'
    //]),
    loadFile(ev) {
      var fil = {
        fi: ev.target.files[0],
        fId: this.fileId
      }
      this.$store.commit('fileUpload', fil)
      //this.fileUpload(fil)
    },
  }
}

</script>


