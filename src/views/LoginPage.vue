<template>
  <v-app>
    <h1>Login Page</h1>
    <v-layout>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card>
          <br />
          <form @submit.prevent="submit">
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Username"
                v-model="username"
                v-validate="'required'"
                name="username"
                type="text"
              ></v-text-field>
              <span>{{ errors.first('username') }}</span></v-flex
            >
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Password"
                v-model="password"
                type="password"
                v-validate="'required'"
                name="password"
              ></v-text-field>
              <span>{{ errors.first('password') }}</span></v-flex
            >
            <v-btn type="submit">Log in</v-btn>
          </form>
        </v-card>
        <div class="modal_box" v-if="loginFailed">
          <p class="modal">Error: {{ failedMessage }}</p>
        </div>
      </v-flex>
    </v-layout>
  </v-app>
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
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.login({
            username: this.username,
            password: this.password
          }).then(res => {
            if (res.status !== 200) {
              this.loginFailed = true
              this.failedMessage = res.data.reason
            }
          })
        }
      })
    },
    pushRegister() {
      this.$router.push({ name: 'register' })
    }
  },
  mounted() {
    this.auth = this.$store.getters.auth
  }
}
</script>

<style>
.modal {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-top: 15px;
  color: #fff;
  margin-top: 0;
  padding: 15px 70px 15px 70px;
  background-image: linear-gradient(to bottom right, #ea3640, red);
  display: inline-block;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  animation-name: modal_animation;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}

@keyframes modal_animation {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.modal_box {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
