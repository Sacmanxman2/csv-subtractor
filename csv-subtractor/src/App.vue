<template>
  <div id="app">
    <h1>CSV Subtractor</h1>
    <csv-uploader fileId="opFile" flabel="Operating File"></csv-uploader>
    <csv-uploader fileId="refFile" flabel="Exact Match File"></csv-uploader>
    <csv-uploader fileId="regxFile" flabel="Part Match File"></csv-uploader>
    <processing></processing>
    <status-display></status-display>
  </div>
</template>

<script>
import CsvUploader from './components/CsvUploader.vue'
import Processing from './components/Processing.vue'
import StatusDisplay from './components/StatusDisplay.vue'

console.log('v10 - progress on')

export default {
  name: 'App',
  components: {
    CsvUploader,
    Processing,
    StatusDisplay
  }
}
</script>

<style>

</style>
