const { W } = window

const dispatch = qlite => W.share.dispatch([], qlite, [])

export const insertOpponentId = userId =>
  dispatch(['__assoc', 'userId', [userId]])

W.share.subscribe(newData => console.log(newData))
