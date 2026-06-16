<script setup lang="ts">
defineProps<{ taskCount: number }>();
</script>

<template>
  <header class="header">
    <h1>Task Board</h1>
    <span class="header__count">{{ taskCount }} tasks</span>
  </header>
</template>
