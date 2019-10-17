import Vue from 'vue'
import Vuex from 'vuex'
import * as db from './helper/dbHandler'
import { needToRecall, needToCallPage } from './helper/helperFunctions'
import { readyToCall } from './helper/stateTypes'
import { runTests } from './helper/test'

const { W } = window
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
    testIsPassed: false,
  },
  mutations: {
    updateState(state, newStatus) {
      state.callStatus = newStatus
      const {
        creator,
        callStatus: { callerName, calleeName, callerState },
      } = state
      if (needToCallPage(newStatus, undefined, true)) {
        W.runWapp('main', '5d833d260182287ec6cc96fb', undefined, {
          contactName: creator ? calleeName : callerName,
        })
      }
      if (callerState === readyToCall) {
        state.testIsPassed = runTests()
      }
    },
    changeWebliteRelatedData(state, { userId, creator, userName }) {
      state.userId = userId
      state.creator = creator
      state.userName = userName
    },
    changeWisid(state, { wisId }) {
      state.wisId = wisId
    },
  },

  actions: {
    init({ state: { callStatus, creator, userId, userName } }) {
      if (
        (!creator && !callStatus.opponentId) ||
        (creator && !callStatus.callerState)
      ) {
        db.initialInsert(creator, userId, userName)
      }
    },
    buttonClick(
      {
        state: { creator, callStatus },
      },
      clickType,
    ) {
      if (needToRecall(callStatus, clickType, creator)) {
        W.sendMessageToCurrentChat('wapp', {
          wappId: '5d7f4282090cc94274b115a8',
          wisId: '',
        })
      } else if (needToCallPage(callStatus, clickType, false)) {
        db.updateState(creator, callStatus, clickType)
      } else {
        db.updateState(creator, callStatus, clickType)
      }
    },
  },

  plugins: [
    ({ commit }) => {
      W.share.subscribe(newStatus => commit('updateState', newStatus))
    },
  ],
})
