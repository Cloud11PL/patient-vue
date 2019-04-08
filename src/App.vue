<template>
  <div id="app">
    <router-view />
    <drawerMenu />
  </div>
</template>

<script>
import drawerMenu from './components/DrawerMenu'

export default {
  components: {
    drawerMenu
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Helvetica, sans-serif;
  height: 100vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(87, 38, 99, 0.5),
      rgba(2, 1, 4, 0.5)
    ),
    url('assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
