<template>
    <div>
        <v-app>
        <v-alert
            v-model="alertLoginSuccess"
            dismissible
            type="success"
            >
            Login has been succesfull.
        </v-alert>
        <v-alert
            v-model="alertLoginFail"
            dismissible
            type="error"
            >
            Login has NOT been succesfull.
        </v-alert>
        <br>
        <h1>Login Page</h1>
        <br>
            <v-layout>
                <v-flex xs10 sm6 offset-sm3 offset-xs1>
                <v-card>
                    <br>
                    <form @submit.prevent="submit">
                        <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Username" v-model="username"></v-text-field></v-flex>
                        <v-flex xs6 sm4 md4 offset-md4 offset-xs3 ><v-text-field label="Password" v-model="password" type="password"></v-text-field></v-flex>
                        <v-btn type="submit">Log in</v-btn>
                    </form>
                    <br>
                </v-card>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

/**
 * Methods here execute methods in the Store that allow the user to log in. If login is succesful the user is redirected to the home page. 
 */
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
            this.login(JSON.stringify({'username': this.username, 'password': this.password}))
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
