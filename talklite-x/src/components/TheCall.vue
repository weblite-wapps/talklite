<template>
  <div class="c--call">
    <TheCallDuration />
    <TheCallProfile :contact="contact" />
    <!-- <TheCallEffectButton /> -->
    <TheCallControlButtons />
  </div>
</template>

<script>
import TheCallDuration from './TheCallDuration'
import TheCallProfile from './TheCallProfile'
import TheCallEffectButton from './TheCallEffectButtons'
import TheCallControlButtons from './TheCallControlButtons'
export default {
  name: 'TheCall',
  components: {
    TheCallDuration,
    TheCallProfile,
    TheCallEffectButton,
    TheCallControlButtons,
  },
  props: {
    contact: String,
  },
}
</script>

<style scoped>
.c--call {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>

