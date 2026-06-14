<script setup lang="ts">
import type { Task } from '@/types/task';

import StatusBadge from './StatusBadge.vue';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ advance: [id: string] }>();
</script>

<template>
  <li class="task-item">
    <StatusBadge :status="props.task.status" />
    <span class="task-item__title">{{ props.task.title }}</span>
    <button type="button" :disabled="props.task.status === 'done'" @click="emit('advance', props.task.id)">Advance</button>
  </li>
</template>
