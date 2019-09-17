<template>
  <div id="app">
    <TheCallStatus />
    <TheButtonPanel />
  </div>
</template>

<script>
import TheCallStatus from './components/TheCallStatus.vue'
import TheButtonPanel from './components/TheButtonPanel.vue'
import webliteApi from './helper/weblite.api'
import { insertFirstDatas } from './helper/dbHandler'
import store from './store'
const { W } = window
export default {
  name: 'app',
  store,
  components: {
    TheCallStatus,
    TheButtonPanel,
  },
  created() {
    W && webliteApi(this)
    W && this.init()
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 233px;
  height: 75px;
  background-color: #282828;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  opacity: 1;
  align-items: center;
  display: inline-flex;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
