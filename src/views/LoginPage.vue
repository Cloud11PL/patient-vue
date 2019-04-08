<template>
  <div class="frosted-box">
    <p class="page-name">Login Page</p>
    <form @submit.prevent="submit">
      <div class="input-tile">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          label="Username"
          v-validate="'required'"
          name="username"
          autocomplete="off"
        />
      </div>
      <span>{{ errors.first('username') }}</span>
      <div class="input-tile">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          label="Password"
          v-validate="'required'"
          name="password"
        />
      </div>
      <span>{{ errors.first('password') }}</span>
      <button class="submit-button" type="submit">Submit</button>
    </form>
    <transition name="modal_box">
      <div v-if="loginFailed">
        <p class="modal">Error: {{ failedMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'loginPage',
  data() {
    return {
      username: ``,
      password: ``,
      alertLoginSuccess: false,
      alertLoginFail: false,
      loginFailed: false,
      failedMessage: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    submit() {
      this.loginFailed = false
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.login({
            username: this.username,
            password: this.password
          }).then(res => {
            if (res.status !== 200) {
              this.showModal()
              this.failedMessage = res.data.reason
            } else {
              this.$router.push({ name: 'home' })
            }
          })
        }
      })
    },
    pushRegister() {
      this.$router.push({ name: 'register' })
    },
    showModal() {
      const self = this
      this.loginFailed = true
      setTimeout(function() {
        self.loginFailed = false
      }, 5000)
    }
  },
  mounted() {
    this.auth = this.$store.getters.auth
  }
}
</script>

<style>
@import url(../assets/styles/loginPage.css);
</style>
