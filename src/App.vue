<template>
  <div id="app">
    <csv-uploader fileId="opFile" flabel="Operating File"></csv-uploader>
    <csv-uploader fileId="rifFile" flabel="Reference File"></csv-uploader>
    <column-choice></column-choice>
    <processing></processing>
  </div>
</template>

<script>
//console.log("Debugmode is on v7")
console.log("v7 - progress on")

import { mapState } from 'vuex'

import CsvUploader from './components/CsvUploader.vue'
import ColumnChoice from './components/ColumnChoice.vue'
import Processing from './components/Processing.vue'

export default {
  name: 'app',
  components: {
    CsvUploader,
    ColumnChoice,
    Processing
  }
}
</script>

<style>

</style>
