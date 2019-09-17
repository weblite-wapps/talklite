import { readyToCall, waitingForCall } from './stateTypes'
const { W } = window

const dispatch = qlite => W.share.dispatch([], qlite, [])

export const insertFirstDatas = (creator, userId) =>
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

W.share.subscribe(newData => console.log(newData))
