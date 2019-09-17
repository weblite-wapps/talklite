// W
const { W } = window
const handleNormalMode = (start, vue) => {
  W.loadData().then(data => {
    const {
      user: { userId },
      creator,
    } = data

    vue.$store.commit('changeWebliteRelatedData', {
      wisId: W.wisId,
      userId,
      creator,
    })

    start()
  })
  // Promise.all([W.share.getFromServer([]), W.loadData()].then(data => {
  //   const [{
  //     user: { userId },
  //     creator,
  //   }] = data

  //   vue.$store.commit('changeWebliteRelatedData', {
  //     wisId: W.wisId,
  //     userId,
  //     creator,
  //   })

  //   start()
  // })
}

export default vue => {
  W.setHooks({
    wappWillStart(start) {
      handleNormalMode(start, vue)
    },
  })
}
