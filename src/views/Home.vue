<template>
    <v-app>
        <v-app-bar color="white" app>
            <v-app-bar-nav-icon @click="nav = true"/>
            <v-app-bar-title>lisx</v-app-bar-title>
            <v-spacer/>
            <h3>{{$store.state.title}}</h3>
            <v-spacer/>
            <v-avatar color="grey lighten-2">
                <span class="font-weight-bold">JK</span>
            </v-avatar>
        </v-app-bar>
        <v-navigation-drawer v-model="nav" app temporary>
            <v-list nav>
                <v-list-item :to="{name: 'Users'}" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-account-group</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Users</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'APIKeys'}" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-key-chain</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>API Keys</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'Home'}" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-slot-machine</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Analyzers</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'Home'}" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-clipboard-text</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Results</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
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
    name: 'Home',
    data: () => ({
        nav: false
    })
};
</script>

<style scoped>

</style>