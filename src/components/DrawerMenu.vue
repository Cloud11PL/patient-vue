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
      <v-list>
        <div v-for="tile in buttonList" :key="tile.name">
          <v-list-tile
            :to="{ name: tile.directoryName }"
            v-if="tile.show === hide"
          >
            <v-list-tile-action>
              <v-icon>{{ tile.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ tile.name }}
            </v-list-tile-content>
          </v-list-tile>
        </div>
        <v-list-tile v-if="isAuth" @click="logoutClick">
          <v-list-tile-action>
            <v-icon>clear</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Log Out
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
      buttonList: [
        {
          name: 'Home',
          directoryName: 'dashboard',
          icon: 'dashboard',
          show: false
        },
        {
          name: 'Log In',
          directoryName: 'login',
          icon: 'vpn_key',
          show: true
        },
        {
          name: 'Register',
          directoryName: 'register',
          icon: 'person_add',
          show: true
        }
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
    },
    isAuth() {
      return this.$store.state.auth
    }
  }
}
</script>
