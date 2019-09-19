// W
const { W } = window
const handleNormalMode = (start, vueRoot) => {
  W.loadData().then(data => {
    const {
      creator,
      customize: { callerName, calleeName },
    } = data

    vueRoot.wisId = W.wisId
    vueRoot.callerName = callerName
    vueRoot.calleeName = calleeName
    vueRoot.creator = creator

    start()
  })
}

export default vue => {
  console.log('hello')
  W.setHooks({
    wappWillStart(start) {
      handleNormalMode(start, vue)
    },
  })
}
