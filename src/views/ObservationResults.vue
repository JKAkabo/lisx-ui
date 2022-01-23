<template>
    <v-layout class="px-lg-16 mt-5" row>
        <v-flex>
    <v-data-table :headers="headers"/>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'ObservationResults',
    data: () => ({
        headers: [
            {text: 'lab ID', value: 'labID'},
            {text: 'observed at', value: 'observedAt'},
            {text: 'observation', value: 'observation'},
            {text: '# of elements', value: 'elementsCount'}
        ]
    })
};
</script>

<style scoped>

</style>