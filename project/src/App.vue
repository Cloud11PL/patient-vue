<template>
  <div id="app">
    <div id="nav">
      <!--
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Patient Database</v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-toolbar-items>
        <v-btn flat to="/" class="white--text">Home</v-btn>
        <v-btn flat to="/login" v-show="hide()" class="white--text">Log In</v-btn>
        <v-btn flat v-on:click="logoutClick" v-show="!hide()" class="white--text">Log Out</v-btn>
        <v-btn flat to="/register" v-show="hide()" class="white--text">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['logout']),
    logoutClick() {
        this.logout()
    },
    hide () {
      return this.$route.path === '/login' || this.$route.path === '/register'; 
    }
  },
  computed: {

  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
