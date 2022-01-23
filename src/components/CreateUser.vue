<template>
    <v-dialog :value="value" @input="onInput" width="500" persistent>
        <v-card>
            <v-card-title class="justify-center">
                create user
            </v-card-title>
            <v-divider/>
            <v-card-text class="pt-5">
                <v-form @submit.prevent="save">
                    <v-text-field outlined label="first name" hide-details="auto" dense class="mb-4"
                                  v-model="form.firstName"/>
                    <v-text-field outlined label="last name" hide-details="auto" dense class="mb-4"
                                  v-model="form.lastName"/>
                    <v-text-field outlined label="username" hide-details="auto" dense class="mb-4"
                                  v-model="form.username"/>
                    <v-text-field outlined label="password" hide-details="auto" dense v-model="form.password"/>
                    <v-checkbox label="admin?" class="text-center" v-model="form.isAdmin"/>
                    <v-row>
                        <v-col>
                            <v-btn block depressed class="text-lowercase" @click="onInput(false)">cancel</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block color="primary" depressed class="text-lowercase" type="submit" :loading="saving">save</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {createUser} from '@/api';

function initialState() {
    return {
        form: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            isAdmin: false
        },
        saving: false
    };
}

export default {
    name: 'CreateUser',
    props: ['value'],
    data: () => (initialState()),
    methods: {
        onInput(val) {
            this.$emit('input', val);
            this.reset();
        },
        save() {
            this.saving = true;
            createUser(this.form)
                .then(() => {
                    this.onInput(false);
                    this.$emit('save');
                })
                .finally(() => {
                    this.saving = false;
                });
        },
        reset() {
            Object.assign(this.$data, initialState());
        }
    }
};
</script>

<style scoped>

</style>