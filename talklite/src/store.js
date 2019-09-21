import Vue from 'vue'
import Vuex from 'vuex'
import * as db from './helper/dbHandler'
import {
  noNeedToNewWis,
  needToRecall,
  needToCallPage,
} from './helper/helperFunctions'
import { callCanceled } from './helper/stateTypes'

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
  },
  mutations: {
    updateState(state, newStatus) {
      state.callStatus = newStatus
      if (needToCallPage(newStatus, undefined, true)) {
        const {
          creator,
          callStatus: { callerName, calleeName },
        } = state
        W.runWapp('main', '5d833d260182287ec6cc96fb', undefined, {
          contactName: calleeName,
        })
      }
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
        // console.log('userName 1 ', userName)
        db.initialInsert(creator, userId, userName)
      }
    },
    buttonClick(
      {
        state: {
          creator,
          callStatus,
          callStatus: { callerName, calleeName },
        },
      },
      clickType,
    ) {
      // if (noNeedToNewWis(callStatus, clickType)) {

      // } else {
      if (needToRecall(callStatus, clickType, creator)) {
        W.sendMessageToCurrentChat('wapp', {
          wappId: '5d7f4282090cc94274b115a8',
        })
      } else if (needToCallPage(callStatus, clickType, false)) {
        W.runWapp('main', '5d833d260182287ec6cc96fb', undefined, {
          contactName: callerName,
        })
        db.updateState(creator, callStatus, clickType)
      } else {
        db.updateState(creator, callStatus, clickType)
      }
      // }
    },
  },

  plugins: [
    ({ dispatch, commit }) => {
      W.share.subscribe(newStatus => commit('updateState', newStatus))
    },
  ],
})
