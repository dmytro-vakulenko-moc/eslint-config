<script setup lang="ts">
import type { Task } from '@/types/task';

import TaskItem from './TaskItem.vue';

defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{ advance: [id: string] }>();
</script>

<template>
  <ul v-if="tasks.length > 0" class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @advance="emit('advance', $event)" />
  </ul>
  <p v-else class="task-list__empty">No tasks yet — add one above.</p>
</template>
