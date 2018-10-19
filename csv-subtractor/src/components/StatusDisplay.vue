<template>
  <div>
    <p v-if="this.statusMsg!==''" >{{ this.statusMsg }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StatusDisplay',
  computed: {
    ...mapState([
      'statusMsg'
    ])
  }
}
</script>

<style>

</style>
