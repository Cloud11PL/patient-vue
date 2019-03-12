<template>
  <div>
    <br />
    <h1>Register Page</h1>
    <br />
    <v-layout>
      <v-flex xs10 sm6 offset-sm3 offset-xs1>
        <v-card>
          <br />
          <form @submit.prevent="submit">
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Name"
                v-model="name"
                v-validate="'required'"
                name="name"
                type="text"
              ></v-text-field>
              <span>{{ errors.first('name') }}</span>
            </v-flex>
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Username"
                v-model="username"
                v-validate="'required'"
                name="username"
              ></v-text-field>
              <span>{{ errors.first('username') }}</span>
            </v-flex>
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Email"
                v-model="email"
                v-validate="'required|email'"
                name="email"
                type="text"
              ></v-text-field>
              <span>{{ errors.first('email') }}</span>
            </v-flex>
            <v-flex xs6 sm4 md4 offset-md4 offset-xs3
              ><v-text-field
                label="Password"
                v-model="password"
                type="password"
                v-validate="'required'"
                name="password"
              ></v-text-field>
              <span>{{ errors.first('password') }}</span>
            </v-flex>
            <v-btn type="submit">Sign Up</v-btn>
            <br />
          </form>
          <br />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      alertSignupSuccess: false,
      alertSignupFail: false
    }
  },
  methods: {
    ...mapActions(['signup']),
    submit() {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          const doctor = JSON.stringify({
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
          })
          this.signup(doctor).then(res => {
            this.$nextTick(() => this.$validator.reset())
          })
        }
      })
    }
  }
}
</script>
