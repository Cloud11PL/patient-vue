<template>
  <div id="app">
 <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        :clipped="clipped"
        enable-resize-watcher
        dark
        temporary
        absolute
      >
        <v-list class="pa-1">
          <v-list-tile v-show="!mini">
            <v-list-tile-action>
              <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
  
        <v-list class="pt-0" dense>
          <v-divider light></v-divider>
  
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
  
          <v-list-tile to="/login" v-show="hide()">
            <v-list-tile-action>
              <v-icon>vpn_key</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Log In</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile to="/register" v-show="hide()">
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Sign Up</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-on:click="logoutClick" v-show="!hide()">
            <v-list-tile-action>
              <v-icon>clear</v-icon>
            </v-list-tile-action>
  
            <v-list-tile-content>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app dark :clipped-left="clipped">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Patient Database</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar> 
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
  </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

/**
 * App.vue is the main component in this app. Methods here are used to display the menu and the top bar. 
 */
export default {
  data () {
    return {
      drawer: false,
      clipped: true,
      items: [
        { title: 'Home', icon: 'dashboard', action: 'to="/"' },
        { title: 'Log In', icon: 'vpn_key', action: 'to="/login"' },
        { title: 'Sign Up', icon: 'person_add', action: 'to="/register"'}
      ],
      mini: false,
      right: null
    }
  },
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
  padding: 0px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
