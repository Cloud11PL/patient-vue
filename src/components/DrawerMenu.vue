<template>
  <div>
    <ul>
      <li v-for="tile in buttonList" :key="tile.name">
        <router-link
          :to="{ name: tile.directoryName }"
          v-if="tile.show === hide"
          >{{ tile.name }}</router-link
        >
      </li>
      <li v-if="isAuth">
        <a @click="logoutClick">Log Out</a>
      </li>
    </ul>
  </div>
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
          directoryName: 'home',
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

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}

li a.router-link-active {
  background-color: rgb(49, 25, 40);
}
</style>
