<template>
    <v-layout class="px-lg-16 mt-5" column>
        <v-flex class="sm12">
            <v-btn color="primary" outlined depressed class="text-lowercase" @click="actions.createUser = true">new</v-btn>
        </v-flex>
        <v-flex>
            <v-data-table :headers="headers" :items="users">
                <template v-slot:item.permissions="{item}">
                    <v-btn color="primary" text class="text-lowercase" depressed @click="() => setPermissions(item.id)">permissions</v-btn>
                </template>
                <template v-slot:item.edit="{}">
                    <v-btn color="warning" text class="text-lowercase" depressed>edit</v-btn>
                </template>
            </v-data-table>
        </v-flex>
        <create-user v-model="actions.createUser" @save="load"/>
        <update-user-permissions v-if="activeUserID" v-model="actions.setPermissions" @save="onSavePermissions" :user-i-d="activeUserID"/>
    </v-layout>
</template>

<script>
import {getUsers} from '@/api';
import CreateUser from '@/components/CreateUser';
import UpdateUserPermissions from '@/components/UpdateUserPermissions';

export default {
    name: 'Users',
    components: {UpdateUserPermissions, CreateUser},
    data: () => ({
        actions: {
            createUser: false,
            updateUser: false,
            setPermissions: false
        },
        activeUserID: null,
        headers: [
            {text: 'first name', value: 'firstName'},
            {text: 'last name', value: 'lastName'},
            {text: 'admin?', value: 'isAdmin'},
            {text: '', value: 'permissions', width: 0},
            {text: '', value: 'edit', width: 0},
        ],
        users: []
    }),
    methods: {
        load() {
            getUsers()
                .then(response => {
                    this.users = response.data
                })
        },
        setPermissions: function (userID) {
            this.activeUserID = null;
            this.$nextTick(() => {
                this.activeUserID = userID;
                this.actions.setPermissions = true;
            });
        },
        onSavePermissions: function () {
            // this.actions.setPermissions = false;
            this.load();
        }
    },
    mounted() {
        this.load();
    }
};
</script>

<style scoped>

</style>