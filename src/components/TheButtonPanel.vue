<template>
  <div class="c--Button-base">
    <ButtonPanelButtonBase type="accept" />
    <ButtonPanelButtonBase type="reject" />
  </div>
</template>

<script>
import ButtonPanelButtonBase from './ButtonPanelButtonBase'
export default {
  name: 'TheButtonPanel',
  components: {
    ButtonPanelButtonBase,
  },
  props: {},
}
</script>

<style scoped>
.c--Button-base {
}
.c--button.green {
}
</style>
