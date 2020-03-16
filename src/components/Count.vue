<template>
  <b-card class="countchart-card" header="Total Chart">
    <div class="countchart-area">
      <line-chart v-if="fetched" :chart-data="datacollection" />
    </div>
  </b-card>
</template>

<script>
import LineChart from "./CountChart.js";
import { mapActions, mapGetters, mapState } from "vuex";

let intervalId = 0;
export default {
  components: { LineChart },
  data() {
    return {
      fetched: false,
      datacollection: null
    };
  },
  watch: {
    getCountsChartFormat(n, o) {
      this.datacollection = {
        labels: n.dateList,
        datasets: [
          {
            label: "today",
            borderColor: "#FFC11E",
            data: n.todayCounts
          },
          {
            label: "yesterday",
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: n.lastCounts
          }
        ]
      };
    }
  },
  computed: {
    ...mapGetters(["getCountsChartFormat"]),
    ...mapState(["counts"])
  },
  methods: {
    ...mapActions(["getCounts", "getTasks"])
  },
  mounted() {
    const payload = {
      date: (() => {
        const d = new Date();
        const yyyy = d.getFullYear().toString();
        const mm = (d.getMonth() + 1).toString();
        const dd = d.getDate().toString();
        return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);
      })()
    };
    this.getCounts(payload).then(response => {
      this.fetched = true;
    });
    intervalId = setInterval(() => {
      this.getCounts(payload).then(response => {
        this.fetched = true;
      });
    }, 2500);
  },
  destroyed() {
    clearInterval(intervalId);
  },
  updated() {}
};
</script>
