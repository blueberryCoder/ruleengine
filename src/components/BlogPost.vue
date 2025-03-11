<script setup lang="ts">
defineProps<{
  title?: string;
  content?: string;
}>();
</script>

<template>
  <div>
    <pre>{{ JSON.stringify({ title, content }, null, 2) }}</pre>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>