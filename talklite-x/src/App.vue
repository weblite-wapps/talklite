<template>
  <div id="app">
    <TheCall :contact="contact" />
  </div>
</template>

<script>
import TheCall from './components/TheCall.vue'
import webliteApi from './helper/weblite.api'
const { W } = window
export default {
  name: 'app',
  components: {
    TheCall,
  },
  data: () => ({
    wisId: '',
    callerName: '',
    calleeName: '',
    creator: false,
  }),
  computed: {
    contact() {
      return this.creator ? this.calleeName : this.callerName
    },
  },
  created() {
    W && webliteApi(this)
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}
</style>
