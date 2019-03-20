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
  a,
  a:hover {
    color: #fff;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    background-color: #1205ff;
  }
</style>
