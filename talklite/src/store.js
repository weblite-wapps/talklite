import Vue from 'vue'
import Vuex from 'vuex'
import * as db from './helper/dbHandler'
import { noNeedToNewWis } from './helper/helperFunctions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wisId: '',
    userId: '',
    userName: '',
    callStatus: {
      callerState: '',
      calleeState: '',
      opponentId: '',
      callerName: '',
      calleeName: '',
    },
    creator: false,
  },
  mutations: {
    updateState(state, newStatus) {
      // console.log('oldStatus ', state.callStatus)
      // console.log('newStatus ', newStatus)
      state.callStatus = newStatus
    },
    changeWebliteRelatedData(state, { wisId, userId, creator, userName }) {
      state.wisId = wisId
      state.userId = userId
      state.creator = creator
      state.userName = userName
    },
  },

  actions: {
    init({ state: { callStatus, creator, userId, userName } }) {
      // console.log('callStatus, creator, userId ', callStatus, creator, userId)
      if (!callStatus.opponentId) {
        // console.log('hello')
        db.initialInsert(creator, userId, userName)
      }
    },
    buttonClick(
      {
        state: { wisId, creator, callStatus, callerName, calleeName },
      },
      clickType,
    ) {
      if (noNeedToNewWis(callStatus, clickType)) {
        db.updateState(creator, callStatus, clickType)
      } else {
        W.sendMessageToCurrentChat('wapp', {
          wappId: '5d833d260182287ec6cc96fb',
          wisId,
          customize: {
            callerName,
            calleeName,
          },
        })
      }
    },
  },
  plugins: [
    ({ dispatch, commit }) => {
      W.share.subscribe(newStatus => commit('updateState', newStatus))
    },
  ],
})
