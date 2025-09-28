<script setup lang="ts">
import Card from 'primevue/card'

import Bebidas from '@/assets/json/cardapio/bebidas.json'
</script>

<template>
  <div class="p-10 grid grid-cols-12 gap-8 p-12">
    <div class="col-span-12 grid grid-cols-12 gap-6">
      <div
        v-for="(Bebida, index) in Bebidas"
        :key="index"
        class="col-span-12 lg:col-span-6 xl:col-span-3"
      >
        <Card>
          <template #content>
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-muted-color font-medium mb-4">{{ Bebida.nome }}</span>
                <div class="font-medium text-xl">{{ Bebida.preco }}</div>
              </div>
              <div
                class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
                style="width: 2.5rem; height: 2.5rem"
              >
                <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
              </div>
            </div>
            <span class="text-primary font-medium">24 new </span>
            <span class="text-muted-color">since last visit</span>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
