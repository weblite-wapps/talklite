import { readyToCall, waitingForCall } from './stateTypes'
import { getNewCallStatus } from './helperFunctions'
const { W } = window

const dispatch = qlite => W.share.dispatch([], qlite, [])

export const initialInsert = (creator, userId, userName) => {
  console.log('creator, userId  in initialInsert', creator, userId, userName)
  dispatch([
    '__ifElse',
    [
      ['__always', [creator]],
      [
        '__compose',
        [
          ['__assoc', ['callerState', readyToCall]],
          ['__assoc', ['calleeState', waitingForCall]],
          ['__assoc', ['callerName', userName]],
        ],
      ],
      [
        '__compose',
        [
          ['__assoc', ['opponentId', userId]],
          ['__assoc', ['calleeName', userName]],
        ],
      ],
    ],
  ])
}

export const updateState = (creator, callStatus, clickedType) => {
  const { callerState, calleeState } = getNewCallStatus(
    creator,
    callStatus,
    clickedType,
  )
  console.log('newCallStatus: ', callerState, calleeState)
  dispatch([
    '__compose',
    [
      ['__assoc', ['callerState', callerState]],
      ['__assoc', ['calleeState', calleeState]],
    ],
  ])
}
