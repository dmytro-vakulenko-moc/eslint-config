<script setup lang="ts">
import AddTaskForm from './components/AddTaskForm.vue';
import AppHeader from './components/AppHeader.vue';
import TaskList from './components/TaskList.vue';
import { useTasks } from './composables/use-tasks';

const { addTask, advance, count, tasks } = useTasks();
</script>

<template>
  <main class="app">
    <AppHeader :task-count="count" />
    <AddTaskForm @add="addTask" />
    <TaskList :tasks="tasks" @advance="advance" />
  </main>
</template>
