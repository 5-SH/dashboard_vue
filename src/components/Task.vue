<template>
  <b-card
    header="Tasks"
    class="table-card">
    <b-table
      class="table-area"
      sticky-header="300px"
      small="small"
      v-if="fetched"
      striped hover
      responsive :items="getTasksTableFormat" />
  </b-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
let intervalId = 0
export default {
  data () {
    return {
      fetched: false
    }
  },
  computed: {
    ...mapGetters([
      'getTasksTableFormat'
    ]),
    ...mapState([
      'tasks'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks'
    ])
  },
  mounted () {
    this.getTasks().then(response => {
      this.fetched = true
    })
    intervalId = setInterval(() => {
      this.getTasks().then(response => {
        this.fetched = true
      })
    }, 10000)
  },
  destroyed () {
    clearInterval(intervalId)
  },
  updated () {
  }
}
</script>
