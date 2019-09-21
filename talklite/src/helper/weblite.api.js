// W
const { W } = window
const handleNormalMode = (start, vue) => {
  Promise.all([W.loadData(), W.share.getFromServer([])]).then(data => {
    const [
      {
        user: { id, name },
        creator,
      },
    ] = data
    vue.$store.commit('changeWebliteRelatedData', {
      wisId: W.wisId,
      userId: id,
      userName: name,
      creator,
    })
    start()
  })
}

export default vue => {
  W.setHooks({
    wappWillStart(start) {
      handleNormalMode(start, vue)
    },
  })
}
