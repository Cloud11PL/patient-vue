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
        <div class="modal_box" v-if="signupFailed">
          <p class="modal">Error: There was an error!</p>
        </div>
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
      signupFailed: false
    }
  },
  methods: {
    ...mapActions(['signup']),
    submit() {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.signup(this.parseData())
            .then(res => {
              if (res.status !== 200) {
                this.signupFailed = true
              } else {
                this.$router.push({ name: 'login' })
              }
            })
            .finally(this.$nextTick(() => this.$validator.reset()))
        }
      })
    },
    parseData() {
      return JSON.stringify({
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
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
