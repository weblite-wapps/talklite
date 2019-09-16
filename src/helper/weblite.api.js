// W
const { W } = window
const handleNormalMode = (start, vue) => {
  W.loadData().then(data => {
    const {
      user: { userId },
    } = data

    vue.$store.commit('changeWebliteRelatedData', {
      wisId: W.wisId,
      userId: userId,
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
