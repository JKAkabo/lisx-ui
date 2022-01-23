<template>
    <v-dialog :value="value" @input="cancel" width="700" persistent>
        <v-card>
            <v-card-title class="justify-center">
                set api key permissions
            </v-card-title>
            <v-divider/>
            <v-card-text class="pt-5">
                <v-form @submit.prevent="save" :disabled="saving">
                    <v-data-table hide-default-footer :headers="headers" :items="form" item-key="resource" dense
                                  :loading="loading">
                        <template v-slot:item.canCreate="{item}">
                            <v-checkbox dense v-model="item.canCreate"/>
                        </template>
                        <template v-slot:item.canRead="{item}">
                            <v-checkbox dense v-model="item.canRead"/>
                        </template>
                        <template v-slot:item.canUpdate="{item}">
                            <v-checkbox dense v-model="item.canUpdate"/>
                        </template>
                        <template v-slot:item.canDelete="{item}">
                            <v-checkbox dense v-model="item.canDelete"/>
                        </template>
                    </v-data-table>
                    <v-row class="mt-3">
                        <v-col>
                            <v-btn block depressed class="text-lowercase" @click="cancel">cancel</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block color="primary" depressed class="text-lowercase" type="submit"
                                   :loading="saving">save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {getResources, getAPIKeyPermissions, updateAPIKeyPermissions} from '@/api';

export default {
    name: 'SetAPIKeyPermissions',
    props: ['value', 'apiKeyID'],
    data: () => ({
        headers: [
            {text: 'resource', value: 'resource'},
            {text: 'can create', value: 'canCreate'},
            {text: 'can read', value: 'canRead'},
            {text: 'can update', value: 'canUpdate'},
            {text: 'can delete', value: 'canDelete'}
        ],
        form: [],
        loading: false,
        saving: false,
    }),
    methods: {
        cancel() {
            this.$emit('input', false);
        },
        save() {
            this.saving = true;
            updateAPIKeyPermissions(this.apiKeyID, this.form)
                .then(() => {
                    this.$emit('input', false);
                    this.$emit('save');
                })
                .finally(() => {
                    this.saving = false;
                });
        }
    },
    mounted() {
        this.loading = true;
        Promise.all([getAPIKeyPermissions(this.apiKeyID), getResources()])
            .then(responses => {
                let userPermissions = responses[0].data;
                let resources = responses[1].data;
                for (let resource of resources) {
                    let userPermission = userPermissions.find(u => u['resource'] === resource);
                    if (!userPermission) {
                        userPermissions.push({
                            resource: resource,
                            canCreate: false,
                            canRead: false,
                            canUpdate: false,
                            canDelete: false
                        });
                    }
                }
                this.form = userPermissions;
            })
            .finally(() => {
                this.loading = false;
            });
    }
};
</script>

<style scoped>

</style>