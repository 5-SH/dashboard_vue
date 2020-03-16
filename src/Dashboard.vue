<template>
  <div>
    <b-row class="dashboard-view-table">
      <b-col lg="6" md="12">
        <Task />
      </b-col>
      <b-col lg="6" md="12">
        <Node v-if="fetched" />
      </b-col>
    </b-row>
    <b-row class="dashboard-view-countchart">
      <b-col lg="12" md="12">
        <Count />
      </b-col>
    </b-row>
    <Data v-if="fetched" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Node from "@/components/Node.vue";
import Task from "@/components/Task.vue";
import Count from "@/components/Count.vue";
import Data from "@/components/Data.vue";

let intervalId = 0;
export default {
  components: {
    Node,
    Task,
    Count,
    Data
  },
  data() {
    return {
      fetched: false
    };
  },
  computed: {
    ...mapGetters(["getNodesTableFormat"]),
    ...mapState([])
  },
  methods: {
    ...mapActions(["getNodes"])
  },
  mounted() {
    this.getNodes().then(respone => {
      this.fetched = true;
    });
    intervalId = setInterval(() => {
      this.getNodes().then(respone => {
        this.fetched = true;
      });
    }, 1000);
  },
  destroyed() {
    clearInterval(intervalId);
  },
  updated() {}
};
</script>
