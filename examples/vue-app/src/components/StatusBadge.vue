<script setup lang="ts">
import { classNames, formatStatus } from '@/lib/format';
import type { TaskStatus } from '@/types/task';

const props = defineProps<{ status: TaskStatus }>();
</script>

<template>
  <span :class="classNames('badge', `badge--${props.status}`)">{{ formatStatus(props.status) }}</span>
</template>
