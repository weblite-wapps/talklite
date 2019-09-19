import Vue from 'vue'
import Vuex from 'vuex'
import * as db from './helper/dbHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wisId: '',
    userId: '',
    callStatus: {
      callerState: '',
      calleeState: '',
      opponentId: '',
    },
    creator: false,
  },
  mutations: {
    updateState(state, newStatus) {
      // console.log('oldStatus ', state.callStatus)
      // console.log('newStatus ', newStatus)
      state.callStatus = newStatus
    },
    changeWebliteRelatedData(state, { wisId, userId, creator }) {
      state.wisId = wisId
      state.userId = userId
      state.creator = creator
    },
  },

  actions: {
    init({ state: { callStatus, creator, userId } }) {
      console.log('callStatus, creator, userId ', callStatus, creator, userId)
      if (!callStatus.opponentId) {
        console.log('hello')
        db.initialInsert(creator, userId)
      }
    },
    buttonClick(
      {
        state: { creator, callStatus },
      },
      clickType,
    ) {
      if (noNeedToNewWis(callStatus, clickType)) {
        db.updateState(creator, callStatus, clickType)
      } else {
      }
    },
  },
  plugins: [
    ({ dispatch, commit }) => {
      W.share.subscribe(newStatus => commit('updateState', newStatus))
    },
  ],
})
