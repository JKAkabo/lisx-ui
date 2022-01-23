<template>
    <v-dialog :value="value" @input="onInput" width="500" persistent>
        <v-card>
            <v-card-title class="justify-center">
                create api key
            </v-card-title>
            <v-divider/>
            <v-card-text class="pt-5">
                <v-form @submit.prevent="save">
                    <v-text-field outlined label="name" hide-details="auto" dense class="mb-4"
                                  v-model="form.name"/>
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
import {createAPIKey} from '@/api';

function initialState() {
    return {
        form: {
            name: '',
        },
        saving: false
    };
}

export default {
    name: 'CreateAPIKey',
    props: ['value'],
    data: () => (initialState()),
    methods: {
        onInput(val) {
            this.$emit('input', val);
            this.reset();
        },
        save() {
            this.saving = true;
            createAPIKey(this.form)
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