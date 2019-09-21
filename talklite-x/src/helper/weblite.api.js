// W
const { W } = window
const handleNormalMode = (start, vueRoot, { contactName }) => {
  W.getUsersInfo([contactName]).then(data => {
    vueRoot.profileUrl = data[contactName].profileImage
    console.log(
      'data[contactName].profileImage ',
      data[contactName].profileImage,
    )
    vueRoot.wisId = W.wisId
    vueRoot.contactName = contactName

    start()
  })
}

export default vue => {
  W.setHooks({
    wappWillStart(start, error, { args }) {
      console.log('args ', args)
      handleNormalMode(start, vue, args)
    },
  })
}
