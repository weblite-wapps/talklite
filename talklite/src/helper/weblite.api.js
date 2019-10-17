// W
const { W } = window
const handleNormalMode = (start, vue) => {
  W.loadData().then(data => {
    const {
      user: { id, name },
      creator,
    } = data
    vue.$store.commit('changeWebliteRelatedData', {
      userId: id,
      userName: name,
      creator,
    })
    W.share.getFromServer([]).then(data => {
      vue.$store.commit('changeWisid', {
        wisId: W.wisId,
      })
      start()
    })
  })
}

export default vue => {
  W.setHooks({
    wappWillStart(start) {
      handleNormalMode(start, vue)
    },
  })
}
