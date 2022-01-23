<template>
    <v-layout class="px-lg-16 mt-5" column>
        <v-flex class="sm12">
            <v-btn color="primary" outlined depressed class="text-lowercase" @click="actions.create = true">new</v-btn>
        </v-flex>
        <v-flex class="mt-5">
            <v-card>
            <v-data-table :headers="headers" :items="apiKeys">
                <template v-slot:item.user="{item}">
                    <span v-if="item.user">{{item.user.firstName + ' ' + item.user.lastName + (item.userID === currentUserID ? ' (You)' : '')}}</span>
                    <v-progress-circular indeterminate color="primary" v-else/>
                </template>
                <template v-slot:item.copyKey="{item}">
                    <v-btn color="primary" text class="text-lowercase" depressed @click="() => copyKey(item.key)" :disabled="item.userID !== currentUserID">copy key</v-btn>
                </template>
                <template v-slot:item.permissions="{item}">
                    <v-btn color="primary" text class="text-lowercase" depressed @click="() => setPermissions(item.id)" :disabled="item.userID !== currentUserID">permissions</v-btn>
                </template>
            </v-data-table>
            </v-card>
        </v-flex>
        <create-a-p-i-key v-model="actions.create" @save="load"/>
        <set-a-p-i-key-permissions v-if="activeRecordID" v-model="actions.setPermissions" :api-key-i-d="activeRecordID"/>
    </v-layout>
</template>

<script>
import {getAPIKeys, getUserByID} from '@/api';
import SetAPIKeyPermissions from '@/components/SetAPIKeyPermissions';
import CreateAPIKey from '@/components/CreateAPIKey';

export default {
    name: 'ApiKeys',
    components: {CreateAPIKey, SetAPIKeyPermissions},
    data: () => ({
        actions: {
            create: false,
            setPermissions: false
        },
        activeRecordID: null,
        headers: [
            {text: 'name', value: 'name', divider: true},
            {text: 'key', value: 'key', divider: true},
            {text: 'user', value: 'user', divider: true},
            {text: null, value: 'copyKey', width: 0, divider: true, filterable: false, sortable: false},
            {text: '', value: 'permissions', width: 0, divider: true, filterable: false, sortable: false},
        ],
        apiKeys: [],
        currentUserID: null,
    }),
    methods: {
        load() {
            getAPIKeys()
                .then(response => {
                    this.apiKeys = response.data.map(a => ({...a, user: null}))
                    for (let apiKey of this.apiKeys) {
                        getUserByID(apiKey.userID)
                        .then(response1 => {
                            apiKey.user = response1.data
                        })
                    }
                })
        },
        setPermissions: function (id) {
            this.activeRecordID = null;
            this.$nextTick(() => {
                this.activeRecordID = id;
                this.actions.setPermissions = true;
            });
        },
        copyKey(key) {
            navigator.clipboard.writeText(key);
        }
    },
    mounted() {
        this.$store.commit('setTitle', 'api keys')
        this.load();
        this.currentUserID = JSON.parse(localStorage.getItem('accessToken'))['userID'];
    }
};
</script>

<style scoped>

</style>