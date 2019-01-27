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
      <br>
      <h1>Register Page</h1>
      <br>
      <v-layout>
        <v-flex xs10 sm6 offset-sm3 offset-xs1>
          <v-card>
            <br>
              <form @submit.prevent="submit">
                  <!--<v-text-field v-model="username"></v-text-field>-->
                  <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Name" v-model="name"></v-text-field></v-flex>
                  <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Username" v-model="username"></v-text-field></v-flex>
                  <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Email" v-model="email"></v-text-field></v-flex>
                  <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Password" v-model="password" type="password"></v-text-field></v-flex>
                  <v-btn type="submit">Sign Up</v-btn>
                  <br>
              </form>
              <br>
          </v-card>
        </v-flex>
      </v-layout>
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
