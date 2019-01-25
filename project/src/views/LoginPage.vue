<template>
    <div>
        <form @submit.prevent="submit">
            <input v-model="username" />
            <input v-model="password" type="password" />
            <button type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
       return {
           username: "",
           password: ""
       } 
    },
    methods: {
        ...mapActions(['login']),
        submit() {
            this.login(JSON.stringify({'username': this.username, 'password': this.password}))
            console.log(this.password)
        } 
    }
}
</script>
