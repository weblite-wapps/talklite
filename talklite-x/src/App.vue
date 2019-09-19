<template>
  <div id="app">
    <TheCall />
  </div>
</template>

<script>
import TheCall from "./components/TheCall.vue";

export default {
  name: "app",
  components: {
    TheCall
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}
</style>
