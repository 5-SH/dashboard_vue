<template>
  <div>
    <div class="dashboard-view-datachart">
      <b-row>
        <template v-for="(datacollection, index) in datacollections">
          <b-col md="4" :key="index" v-if="datacollection.node.type === 'DB'">
            <b-card class="datachart-card">
              <b-card-header>
                <b-row>
                  <b-col class="chart-type">datacollection.node.type }}</b-col>
                  <b-col class="chart-name">{{ datacollection.node.name }}</b-col>
                </b-row>
              </b-card-header>
              <div class="datachart-area">
                <line-chart :chart-data="datacollection.data" />
              </div>
            </b-card>
          </b-col>
        </template>
      </b-row>
    </div>
    <div class="dashboard-view-datachart">
      <b-row>
        <template v-for="(datacollection, index) in datacollections">
          <b-col md="4" :key="index" v-if="datacollection.node.type === 'PLC'">
            <b-card class="datachart-card">
              <b-card-header>
                <b-row>
                  <b-col class="chart-type">{{ datacollection.node.type }}</b-col>
                  <b-col class="chart-name">{{ datacollection.node.name }}</b-col>
                </b-row>
              </b-card-header>
              <div class="datachart-area">
                <bar-chart :chart-data="datacollection.data" />
              </div>
            </b-card>
          </b-col>
        </template>
      </b-row>
    </div>
  </div>
</template>

<script>
import LineChart from "./DbDataChart.js";
import BarChart from "./PlcDataChart.js";
import { mapActions, mapGetters, mapState } from "vuex";

// let intervalId = []
export default {
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      datacollections: []
    };
  },
  watch: {
    getDataChartFormat(n, o) {
      this.datacollections = [];
      n.map(each => {
        this.datacollections.push({
          data: {
            labels: each.labels,
            datasets: [
              {
                label: "Data One",
                backgroundColor: each.nodeType === "DB" ? "#1f8ef1" : "#d048b6",
                data: each.values
              }
            ]
          },
          node: {
            type: each.nodeType,
            name: each.nodeNm
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters(["getDataChartFormat", ""]),
    ...mapState(["data"])
  },
  methods: {
    ...mapActions(["getData"])
  },
  mounted() {},
  destroyed() {},
  updated() {}
};
</script>
