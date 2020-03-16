import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    counts: [],
    tasks: [],
    data: []
  },
  mutations: {
    getNodes: (state, getNodes) => {
      const s = JSON.stringify(state.nodes)
      const n = JSON.stringify(getNodes.nodes)
      if (s !== n) {
        state.nodes = getNodes.nodes
      }
      state.data = getNodes.data
    },
    getTasks: (state, getTasks) => {
      if (!(JSON.stringify(state.tasks).indexOf(JSON.stringify(getTasks)) > -1)) {
        state.tasks = getTasks
      }
    },
    getCounts: (state, getCounts) => {
      if (!(JSON.stringify(state.counts).indexOf(JSON.stringify(getCounts)) > -1)) {
        state.counts = getCounts
      }
    }
  },
  actions: {
    getNodes: async ({ commit }) => {
      axios.get('/nodes')
        .then(async ({ data: { nodes } }) => {
          let ret = {}
          ret.nodes = nodes
          let nd = await Promise.all(
            nodes.map(async (n) => {
              const url = '/data?node_cd=' + n.node_cd
              return axios.get(url).then(({ data: { data } }) => {
                const j = {}
                j.nodeCd = n.node_cd
                j.nodeNm = n.node_nm
                j.nodeType = n.node_type
                j.issueDate = n.issue_dt
                const size = (n.node_type === 'DB' ? 10 : 6)
                const values = data.slice(((data.length - size) > 0 ? (data.length - 1) - size : 0), data.length - 1).map(each => (each.data))
                const labels = data.slice(((data.length - size) > 0 ? (data.length - 1) - size : 0), data.length - 1).map(each => (each.data_seq))
                j.values = values
                j.labels = labels
                return j
              })
            })
          )
          ret.data = nd
          commit('getNodes', ret)
        })
    },
    getTasks: async ({ commit }) => {
      const { data: { tasks } } = await axios.get('/tasks')
      commit('getTasks', tasks)
    },
    getCounts: async ({ commit }, { date }) => {
      const url = '/counts?date=' + date
      const { data: { counts } } = await axios.get(url)
      commit('getCounts', counts)
    }
  },
  getters: {
    getNodesTableFormat: (state) => {
      const nodes = state.nodes
      let convertedNodes = []
      nodes.map((node) => {
        let j = {}
        j.node_code = node.node_cd
        j.node_name = node.node_nm
        j.node_type = node.node_type
        j.issue_date = node.issue_date
        convertedNodes.push(j)
      })
      return convertedNodes
    },
    getTasksTableFormat: (state) => {
      const tasks = state.tasks
      let convertedTasks = []
      tasks.map((task) => {
        let j = {}
        j.title = task.title
        j.content = task.content
        j.date = task.issue_dt
        convertedTasks.push(j)
      })
      return convertedTasks
    },
    getCountsChartFormat: (state) => {
      const date = (() => {
        const d = new Date()
        const yyyy = d.getFullYear().toString()
        const mm = (d.getMonth() + 1).toString()
        const dd = d.getDate().toString()
        return yyyy + (mm[1] ? mm : '0' + mm[0]) + (dd[1] ? dd : '0' + dd[0])
      })()
      const todayCounts = []
      const lastCounts = []
      const dateList = []
      const todayYearMonth = date.slice(0, 8)
      const counts = state.counts
      counts.map((each) => {
        const yearMonth = each.issue_dt.slice(0, 8)
        const dateTime = each.issue_dt.slice(8, 10) + ':' + each.issue_dt.slice(10, 12)
        if (dateList.includes(dateTime) !== true) {
          dateList.push(dateTime)
        }
        if (todayYearMonth === yearMonth) {
          todayCounts.push(each.count)
        } else if ((todayYearMonth - 1).toString() === yearMonth) {
          lastCounts.push(each.count)
        }
      })
      const countsChartFormat = {}
      countsChartFormat.todayCounts = todayCounts
      countsChartFormat.lastCounts = lastCounts
      countsChartFormat.dateList = dateList
      return countsChartFormat
    },
    getDataChartFormat: (state) => {
      return state.data
    }
  },
  modules: {
  }
})
