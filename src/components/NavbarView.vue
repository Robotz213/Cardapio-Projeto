<script setup lang="ts">
import router from '@/router'
import { Menubar } from 'primevue'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Cardápio',
    icon: 'pi pi-shop',
    command: () => router.push('/cardapio'),
  },
  {
    label: 'Carrinho',
    icon: 'pi pi-shopping-cart',
    command: () => router.push('/carrinho'),
  },
])
</script>

<template>
  <header class="headerview">
    <Menubar :model="items" />
  </header>
</template>

<style lang="css" scoped>
.headerview {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  padding-left: 25px;
  padding-right: 25px;
}

.p-menubar {
  width: 100%;
}
</style>
