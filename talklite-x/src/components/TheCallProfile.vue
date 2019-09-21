<template>
  <div class="c--call_profile">
    <img class="call_profile_photo" :src="url" alt />
    <span class="call_profile_title">{{contact}}</span>
  </div>
</template>

<script>
export default {
  name: 'TheCallProfile',
  components: {},
  props: { contact: String, profileUrl: String },
  computed: {
    url() {
      return this.profileUrl
        ? `https://www.weblite.me:3000/image/${this.profileUrl}`
        : 'contact-placeholder.jpg'
    },
  },
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
  height: 32px;
  font-size: 24px;
  color: white;
  text-align: center;
}

.call_profile_photo {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
