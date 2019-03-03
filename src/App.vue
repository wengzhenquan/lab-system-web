<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body, p, input {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
#app {
  height: 100vh;
}
</style>
