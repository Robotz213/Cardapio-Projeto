<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView } from 'vue-router'
import NavbarView from './components/NavbarView.vue'
</script>

<template>
  <NavbarView />
  <RouterView class="content" v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
  <Toast style="width: 17.5rem" />
</template>

<style lang="css" scoped>
.content {
  margin-top: 5.3rem;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-bottom: 5.7rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
