
<template>
  <button
    v-if="canLaod"
    class="c--button"
    :class="{ 'green': type === 'accept' } "
    @click="() => buttonClick(type)"
  >
    <svg width="18" height="18">
      <path
        v-if="type === 'accept'"
        d="M14.44 11.394a.7.7 0 0 1-.214.612l-2.034 2.019a1.145 1.145 0 0 1-.359.26 1.485 1.485 0 0 1-.436.138l-.092.008q-.076.008-.2.008a7.051 7.051 0 0 1-.941-.1 7.143 7.143 0 0 1-1.591-.489 13.351 13.351 0 0 1-2.134-1.17A15.907 15.907 0 0 1 3.9 10.538a16.759 16.759 0 0 1-1.772-2.019A14.384 14.384 0 0 1 1 6.737a9.6 9.6 0 0 1-.646-1.483 7.871 7.871 0 0 1-.29-1.148A3.788 3.788 0 0 1 0 3.349q.015-.275.015-.306a1.487 1.487 0 0 1 .14-.431 1.146 1.146 0 0 1 .26-.359L2.45.212A.674.674 0 0 1 2.939 0a.571.571 0 0 1 .352.112 1.063 1.063 0 0 1 .26.283l1.636 3.1a.744.744 0 0 1 .076.535.953.953 0 0 1-.263.497l-.749.749a.255.255 0 0 0-.054.1.377.377 0 0 0-.023.115 2.762 2.762 0 0 0 .275.734 6.739 6.739 0 0 0 .566.895A9.934 9.934 0 0 0 6.1 8.335a10.13 10.13 0 0 0 1.228 1.094 7.066 7.066 0 0 0 .895.574 2.378 2.378 0 0 0 .551.222l.191.038a.365.365 0 0 0 .1-.023.255.255 0 0 0 .1-.054l.872-.887a.937.937 0 0 1 .642-.245.8.8 0 0 1 .413.092h.015l2.952 1.744a.769.769 0 0 1 .381.504z"
        fill="#fff"
      />
      <path
        v-else
        d="M2.157 12.363a.7.7 0 0 1-.282-.584l.011-2.866a1.145 1.145 0 0 1 .07-.438 1.485 1.485 0 0 1 .21-.406l.06-.07q.048-.06.136-.147a7.051 7.051 0 0 1 .736-.595 7.143 7.143 0 0 1 1.47-.78 13.351 13.351 0 0 1 2.337-.68 15.907 15.907 0 0 1 3.31-.282 16.759 16.759 0 0 1 2.68.175 14.384 14.384 0 0 1 2.058.462 9.6 9.6 0 0 1 1.506.592 7.871 7.871 0 0 1 1.017.607 3.788 3.788 0 0 1 .58.49q.184.205.206.227a1.487 1.487 0 0 1 .206.404 1.146 1.146 0 0 1 .07.437l.004 2.883a.674.674 0 0 1-.196.495.571.571 0 0 1-.328.17 1.063 1.063 0 0 1-.384-.016l-3.349-1.035a.744.744 0 0 1-.432-.325.953.953 0 0 1-.165-.537v-1.06a.255.255 0 0 0-.033-.109.377.377 0 0 0-.065-.097 2.762 2.762 0 0 0-.713-.325 6.739 6.739 0 0 0-1.033-.232 9.934 9.934 0 0 0-1.627-.092 10.13 10.13 0 0 0-1.642.095 7.066 7.066 0 0 0-1.038.226 2.378 2.378 0 0 0-.547.233l-.162.108a.365.365 0 0 0-.054.087.255.255 0 0 0-.033.11l.01 1.243a.937.937 0 0 1-.28.627.8.8 0 0 1-.357.227l-.01.01-3.321.855a.769.769 0 0 1-.626-.087z"
        fill="#fff"
      />
    </svg>
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  waitingForCall,
  callEnded,
  connecting,
  Ringing,
  callCanceled,
  callRejected,
  readyToCall,
  accept,
  reject,
  inCall,
} from '../helper/stateTypes'
export default {
  name: 'ButtonPanelButtonBase',
  computed: {
    ...mapState(['creator', 'callStatus']),
    status() {
      return this.creator
        ? this.callStatus.callerState
        : this.callStatus.calleeState
    },
    canLaod() {
      const type = this.type
      return (
        (this.status === readyToCall && type === accept) ||
        (this.status === connecting && type === reject) ||
        (this.status === Ringing && this.creator && type === reject) ||
        (this.status === Ringing && !this.creator) ||
        (this.status === callRejected && type === accept) ||
        (this.status === callCanceled && type === accept) ||
        (this.status === inCall && type === reject)
      )
    },
  },
  methods: {
    ...mapActions(['buttonClick']),
  },
  props: {
    type: String,
  },
}
</script>

<style scoped>
.c--button {
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #f47272;
  cursor: pointer;

}
.c--button.green {
  background-color: #56bf03;
}
</style>
