<script setup lang="ts">
import { Menubar } from 'primevue'
import { ref } from 'vue'
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Features',
    icon: 'pi pi-star',
  },
  {
    label: 'Projects',
    icon: 'pi pi-search',
    items: [
      {
        label: 'Components',
        icon: 'pi pi-bolt',
      },
      {
        label: 'Blocks',
        icon: 'pi pi-server',
      },
      {
        label: 'UI Kit',
        icon: 'pi pi-pencil',
      },
      {
        label: 'Templates',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Apollo',
            icon: 'pi pi-palette',
          },
          {
            label: 'Ultima',
            icon: 'pi pi-palette',
          },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
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
