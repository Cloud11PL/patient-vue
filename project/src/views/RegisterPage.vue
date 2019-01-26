<template>
    <div>
      <v-alert
        v-model="alertSignupSuccess"
        dismissible
        type="success"
      >
        Register has been succesfull.
      </v-alert>
      <v-alert
        v-model="alertSignupFail"
        dismissible
        type="error"
      >
        Register has NOT been succesfull.
      </v-alert>
      <h1>Register Page</h1>
        <form @submit.prevent="submit">
          <v-layout align-center justify-center column>
            <!--<v-text-field v-model="username"></v-text-field>-->
            <v-flex xs4 sm4 md4 ><v-text-field label="Name" v-model="name"></v-text-field></v-flex>
            <v-flex xs4 sm4 md4 ><v-text-field label="Username" v-model="username"></v-text-field></v-flex>
            <v-flex xs4 sm4 md4 ><v-text-field label="Email" v-model="email"></v-text-field></v-flex>
            <v-flex xs4 sm4 md4 ><v-text-field label="Password" v-model="password" type="password"></v-text-field></v-flex>
            <v-btn type="submit">Log in</v-btn>
          </v-layout>
        </form>
    </div>
</template>

/*
{
	"name": "Wojciech",
	"username": "Cloud12",
	"email": "cloud11@12.com",
	"password": "123123"
}
*/

<script>
import { mapActions } from 'vuex'

export default {
    data() {
       return {
          name: "",
          username: "",
          email: "",
          password: "",
          alertSignupSuccess: false,
          alertSignupFail: false
       } 
    },
    methods: {
        ...mapActions(['signup']),
        submit() {
            this.signup(JSON.stringify({'name': this.name, 'username': this.username, 'email': this.email, 'password': this.password}))
        } 
    }
}
</script>
