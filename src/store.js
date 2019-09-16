import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'Ready to call',
    contactStauts: '',
    contactId: '',
    creator: false,
  },
  mutations: {
    changeState(state, newStatus) {
      state.status = newStatus
    },
    changeWebliteRelatedData(state, { wisId, userId }) {
      state.wisId = wisId
      state.userId = userId
    },
  },

  actions: {},
  plugins: [],
})
