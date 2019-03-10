<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      enable-resize-watcher
      dark
      temporary
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile>
          <v-list-tile-action>
            <v-btn icon @click.stop="toggleDrawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile :to="{ name: 'login' }" v-if="hide">
          <v-list-tile-action>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ name: 'home' }" v-else>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ name: 'register' }" v-if="hide">
          <v-list-tile-action>
            <v-icon>person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logoutClick" v-else>
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
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Patient Database</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      clipped: true,
      items: [
        { title: 'Home', icon: 'dashboard', action: 'to="/"' },
        { title: 'Log In', icon: 'vpn_key', action: 'to="/login"' },
        { title: 'Sign Up', icon: 'person_add', action: 'to="/register"' }
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
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  },
  computed: {
    hide() {
      return this.$route.path === '/login' || this.$route.path === '/register'
    }
  }
}
</script>
