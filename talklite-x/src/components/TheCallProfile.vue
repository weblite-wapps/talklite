<template>
  <div class="c--call_profile">
    <img src="hj.png" alt />
    <span class="call_profile_title">{{contact}}</span>
  </div>
</template>

<script>
export default {
  name: 'TheCallProfile',
  components: {},
  props: { contact: String },
}
</script>

<style scoped>
.c--call_profile {
  height: 70%;
  margin: 14px auto 0px auto;
  display: flex;
  flex-direction: column;
}
.call_profile_title {
  margin-top: 20px;
  align-self: center;
  width: 99px;
  height: 32px;
  font-size: 24px;
  color: white;
  text-align: center;
}
</style>
