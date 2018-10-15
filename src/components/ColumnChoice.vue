<template>
  <div class="row p-2">
    <div class="col-2">Column in reference file</div>
    <div class="col-10"><input type=text size=3 :value="columnChoice" @change="verifyColumn" id="columnChoice"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ColumnChoice',
  computed: {
    columnChoice: {
      get() {
        return this.$store.state.columnChoice
      },
      set( value ) {
        this.$store.commit('columnSet', value)
      }
    }
  },
  methods: {
    verifyColumn(e) {
      if (isNaN(e.target.value) || e.target.value < 1) {
        this.$store.commit('columnError')
        this.$store.commit('columnSet', e.target.value)
      } else {
        this.$store.commit('columnGood')
        this.$store.commit('columnSet', e.target.value)
      }
    },
  }
}
</script>
