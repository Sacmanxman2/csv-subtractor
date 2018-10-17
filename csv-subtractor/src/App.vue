<template>
  <div id="app">
    <csv-uploader fileId="opFile" flabel="Operating File"></csv-uploader>
    <csv-uploader fileId="refFile" flabel="Reference File"></csv-uploader>
    <csv-uploader fileId="regxFile" flabel="Regex File"></csv-uploader>
    <column-choice></column-choice>
    <processing></processing>
  </div>
</template>

<script>
import CsvUploader from './components/CsvUploader.vue'
import ColumnChoice from './components/ColumnChoice.vue'
import Processing from './components/Processing.vue'

// console.log("Debugmode is on v7")
console.log('v8 - progress on')

export default {
  name: 'App',
  components: {
    CsvUploader,
    ColumnChoice,
    Processing
  }
}
</script>

<style>

</style>
