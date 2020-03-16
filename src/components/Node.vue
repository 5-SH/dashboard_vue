<template>
  <b-card
    header="Nodes"
    class="table-card">
    <b-table
      class="table-area"
      sticky-header="300px"
      small="small"
      striped hover
      responsive :items="getNodesTableFormat" />
  </b-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getNodesTableFormat',
      'getDataChartFormat'
    ]),
    ...mapState([
    ])
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  }
}
</script>
