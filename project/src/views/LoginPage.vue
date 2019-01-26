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
        <h1>Login Page</h1>
            <form @submit.prevent="submit">
                <v-layout align-center justify-center column>
                    <!--<v-text-field v-model="username"></v-text-field>-->
                    <v-flex xs4 sm4 md4 ><v-text-field label="Username" v-model="username"></v-text-field></v-flex>
                    <v-flex xs4 sm4 md4 ><v-text-field label="Password" v-model="password" type="password"></v-text-field></v-flex>
                    <v-btn type="submit">Log in</v-btn>
                </v-layout>
            </form>
        <a v-on:click="pushRegister">Sign up</a>
        </v-app>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

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
            //.then(res => this.$router.push('/'))
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
