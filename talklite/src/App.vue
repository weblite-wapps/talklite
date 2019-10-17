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
import store from './store'
import { mapActions, mapState } from 'vuex'
const { W } = window
export default {
  name: 'app',
  store,
  components: {
    TheCallStatus,
    TheButtonPanel,
  },
  computed: {
    ...mapState(['wisId']),
  },
  methods: {
    ...mapActions(['init']),
  },
  created() {
    W && webliteApi(this)
  },
  watch: {
    wisId() {
      W && this.init()
    },
  },
}
</script>

<style>
#app {
  /* width: 233px; */
  width: 320px;
  /* height: 75px; */
  height: 320px;
  /* background-color: #282828; */
  background-color: gray;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  opacity: 1;
  align-items: center;
  display: inline-flex;
  padding: 0 20px;
  box-sizing: border-box;
}
.test {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
