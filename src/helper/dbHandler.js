import { readyToCall, waitingForCall } from './stateTypes'
import { getNewCallStatus } from './helperFunctions'
const { W } = window

const dispatch = qlite => W.share.dispatch([], qlite, [])

export const initialInsert = (creator, userId) => {
  console.log('creator, userId  in initialInsert', creator, userId)
  dispatch([
    '__ifElse',
    [
      ['__always', [creator]],
      [
        '__compose',
        [
          ['__assoc', ['callerState', readyToCall]],
          ['__assoc', ['calleeState', waitingForCall]],
        ],
      ],
      ['__assoc', ['opponentId', userId]],
    ],
  ])
}

export const updateState = (creator, callStatus, clickedType) => {
  const { callerState, calleeState } = getNewCallStatus(
    creator,
    callStatus,
    clickedType,
  )
  // console.log('newCallStatus: ', newCallStatus)
  dispatch([
    '__compose',
    [
      ['__assoc', ['callerState', callerState]],
      ['__assoc', ['calleeState', calleeState]],
    ],
  ])
}
