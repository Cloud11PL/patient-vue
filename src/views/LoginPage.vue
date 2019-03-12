<template>
  <div>
    <v-app>
      <br />
      <h1>Login Page</h1>
      <br />
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
            <br />
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: `login`,
  data() {
    return {
      username: ``,
      password: ``,
      alertLoginSuccess: false,
      alertLoginFail: false,
      auth: `idk`
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
          })
        }
      })
    },
    pushRegister() {
      this.$router.push('/register')
    }
  },
  mounted() {
    this.auth = this.$store.getters.auth
  }
}
</script>
