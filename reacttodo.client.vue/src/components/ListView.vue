<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false);
const list = ref(null);
const error = ref(null);

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(listId) {
    error.value = list.value = null
    loading.value = true

    axios.get(`/api/v1/todolists/${listId}`)
        .then(response => {
            list.value = response.data
        })
        .catch(err => {
            error.value = err.toString()
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <p> a list</p>
</template>
