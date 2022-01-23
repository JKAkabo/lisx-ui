<template>
    <v-app>
        <v-app-bar app color="white">
            <v-app-bar-nav-icon/>
            <v-app-bar-title>lisx</v-app-bar-title>
            <v-spacer/>
            <h3>observation results</h3>
            <v-spacer/>
            <v-avatar color="grey lighten-2">
                <span class="font-weight-bold">JK</span>
            </v-avatar>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
        <v-footer color="white">
            powered by akabo.dev
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'Home'
};
</script>

<style scoped>

</style>