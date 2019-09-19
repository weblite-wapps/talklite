<template>
  <div class="c--call_status">
    <h1 class="call_status--header">{{status}}</h1>
    <span class="call_status--wapp_name">TALKLITE</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TheCallStatus',
  computed: {
    ...mapState(['callStatus', 'creator']),
    status() {
      // console.log('callStatus, creator ', this.callStatus, this.creator)
      return this.creator
        ? this.callStatus.callerState
        : this.callStatus.calleeState
    },
  },
  watch: {
    callStatus() {
      // console.log('new call Status ', this.callStatus)
    },
  },
  updated() {
    // console.log('status ', this.status)
  },
}
</script>

<style scoped>
.c--call_status {
  color: white;
  text-align: left;
  flex-grow: 2;
}
.call_status--header {
  margin: 0px;
  font-size: 16px;
  line-height: 21px;
  font-weight: normal;
}

.call_status--wapp_name {
  width: 35px;
  height: 10px;
  font-size: 9px;
  line-height: 10px;
}
</style>
