<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ add: [title: string] }>();
const title = ref('');

const submit = (): void => {
  const trimmed = title.value.trim();

  if (trimmed.length === 0) {
    return;
  }

  emit('add', trimmed);
  title.value = '';
};
</script>

<template>
  <form class="add-task" @submit.prevent="submit">
    <input v-model="title" class="add-task__input" aria-label="Task title" placeholder="Add a task…" />
    <button type="submit">Add</button>
  </form>
</template>
