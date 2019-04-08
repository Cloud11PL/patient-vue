<template>
  <div class="frosted-box" id="box-register">
    <p class="page-name">Register Page</p>
    <form @submit.prevent="submit" id="form-register">
      <div class="input-tile">
        <input
          type="text"
          placeholder="Name"
          v-model="name"
          label="Name"
          v-validate="'required'"
          name="name"
        />
      </div>
      <span>{{ errors.first('name') }}</span>
      <div class="input-tile">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          label="Username"
          v-validate="'required'"
          name="username"
        />
      </div>
      <span>{{ errors.first('username') }}</span>
      <div class="input-tile">
        <input
          type="text"
          placeholder="E-mail"
          v-model="email"
          label="Email"
          v-validate="'required|email'"
          name="email"
        />
      </div>
      <span>{{ errors.first('email') }}</span>
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
      <div v-if="signupFailed">
        <p class="modal">Error: {{ failedMessage }}</p>
      </div>
    </transition>
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
  padding: 15px 70px 15px 70px;
  background-image: linear-gradient(to bottom right, #ea3640, red);
  display: inline-block;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  animation-name: modal_animation;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
  opacity: 0;
}

.modal-good {
  background-image: linear-gradient(to bottom right, #36ea3f, rgb(51, 255, 0));
}

@keyframes modal_animation {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal_box {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
