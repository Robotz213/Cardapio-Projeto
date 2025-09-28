<script setup lang="ts">
import { Button, Card } from 'primevue'
import { ref } from 'vue'
const items = ref([
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão',
    price: 'R$ 35,00',
  },
  {
    id: 2,
    name: 'Hambúrguer Artesanal',
    description: 'Carne 180g, queijo, salada e molho especial',
    price: 'R$ 28,00',
  },
  {
    id: 3,
    name: 'Salada Caesar',
    description: 'Alface, frango grelhado, croutons e molho Caesar',
    price: 'R$ 22,00',
  },
  { id: 4, name: 'Suco Natural', description: 'Laranja, limão ou abacaxi', price: 'R$ 8,00' },
])

const addToCart = (item: (typeof items.value)[0]) => {
  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]')
  cart.push(item)
  sessionStorage.setItem('cart', JSON.stringify(cart))
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <Card v-for="item in items" :key="item.id" class="shadow-lg rounded-lg border border-gray-200">
      <template #title>
        <span class="font-bold text-lg">{{ item.name }}</span>
      </template>
      <template #content>
        <p class="text-gray-600 mb-2">{{ item.description }}</p>
        <span class="text-green-600 font-semibold">{{ item.price }}</span>
      </template>
      <template #footer>
        <Button
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="addToCart(item)"
        >
          Adicionar ao Carrinho
        </Button>
      </template>
    </Card>
  </div>
</template>
