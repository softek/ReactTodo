<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const loading = ref(false);
const lists = ref(null);
const error = ref(null);
const newName = ref('');

const route = useRoute();
watch(() => route, fetchData, { immediate: true })

async function fetchData() {
    error.value = lists.value = null
    loading.value = true

    axios.get('api/v1/todolists')
        .then(response => {
            lists.value = response.data
        })
        .catch(err => {
            error.value = err.toString()
        })
        .finally(() => {
            loading.value = false
        })
}

function handleSubmit(event) {
    event.preventDefault();

    axios.post('api/v1/todolists', {
        name: newName.value,
    }).then(() => {
        newName.value = '';
        fetchData();
    });
}

</script>

<template>
    <div>
        <form v-on:submit="handleSubmit">
            <input placeholder="New List" required v-model="newName" />
            <button type="submit">Create List</button>
        </form>
        <ul>
            <li v-for="list in lists" :key="list.id">
                <RouterLink :to="'/Lists/' + list.id">{{ list.name }}</RouterLink>
            </li>
        </ul>
    </div>
</template>
