<script setup lang="ts">
import Card from 'primevue/card'

import BebidasFlex from '@/assets/json/cardapio/bebidas-delicados.json'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _bkp = ' '
</script>

<template>
  <div class="cardapio-content">
    <Card class="card-delicados">
      <template #header>
        <h1 style="padding-left: 50px; padding-right: 50px; font-weight: bold; font-size: 2.5rem">
          Rapazes e Moças Delicados
        </h1>
      </template>
      <template #content>
        <div class="p-10 grid grid-cols-12 gap-2">
          <div class="col-span-12 grid grid-cols-12 gap-2">
            <div
              v-for="(Bebida, index) in BebidasFlex"
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
    </Card>
  </div>
</template>
<style lang="css" scoped>
.cardapio-content {
  margin-top: 5rem;

  display: flex;
  justify-content: center;
}

.card-delicados {
  width: 20.5rem;
  margin: 1.4rem;
}
</style>
