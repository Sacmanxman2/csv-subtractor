<template>
  <div id="app">
    <csv-uploader fileId="opFile" flabel="Operating File"></csv-uploader>
    <csv-uploader fileId="refFile" flabel="Exact Match File"></csv-uploader>
    <csv-uploader fileId="regxFile" flabel="Part Match File"></csv-uploader>
    <processing></processing>
  </div>
</template>

<script>
import CsvUploader from './components/CsvUploader.vue'
import Processing from './components/Processing.vue'

// console.log("Debugmode is on v7")
console.log('v10 - progress on')

export default {
  name: 'App',
  components: {
    CsvUploader,
    Processing
  }
}
</script>

<style>

</style>
