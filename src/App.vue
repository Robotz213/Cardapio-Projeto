<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarView from './components/NavbarView.vue'
</script>

<template>
  <NavbarView />
  <RouterView class="content" />
</template>

<style scoped>
.content {
  margin-top: 2.3rem;
  justify-content: center;
  display: flex;
}
</style>
