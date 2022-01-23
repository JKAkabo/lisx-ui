<template>
    <v-app>
        <v-main>
    <v-layout justify-center align-center fill-height>
        <v-flex class="md6 lg3 xl2 pa-5">
            <h3 class="text-center">lisx</h3>
            <v-form @submit.prevent="login">
                <v-text-field outlined hide-details="auto" label="username" dense class="my-2" v-model="form.username"/>
                <v-text-field outlined hide-details="auto" label="password" dense class="my-2" v-model="form.password"/>
                <v-btn type="submit" class="text-lowercase my-2" block color="primary" depressed>login</v-btn>
            </v-form>
        </v-flex>
    </v-layout>
        </v-main>
        <v-footer color="white">
            powered by akabo.dev
        </v-footer>
    </v-app>
</template>

<script>
import {createAccessToken, getUserByID} from "@/api";

export default {
    name: 'Login',
    components: {},
    data: () => ({
        form: {
            username: '',
            password: ''
        }
    }),
    methods: {
        login() {
            createAccessToken(this.form)
                .then(response => {
                    localStorage.setItem("accessToken", JSON.stringify(response.data));
                    getUserByID(response.data["userID"])
                        .then(response1 => {
                            localStorage.setItem("user", JSON.stringify(response1.data));
                            this.$router.push({name: 'Home'})
                        });
                });
        }
    }
};
</script>
