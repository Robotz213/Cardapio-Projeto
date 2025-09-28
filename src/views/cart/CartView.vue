<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Carrinho de Compras</h1>
    <div v-if="items.length === 0" class="text-center text-gray-500">Seu carrinho está vazio.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-lg font-semibold mb-2">{{ item.name }}</h2>
          <p class="text-gray-600 mb-1">
            Quantidade: <span class="font-bold">{{ item.quantity }}</span>
          </p>
          <p class="text-gray-600 mb-1">
            Preço unitário: <span class="font-bold">R$ {{ Number(item.price).toFixed(2) }}</span>
          </p>
          <p class="text-green-700 font-bold mt-2">
            Subtotal: R$ {{ (Number(item.price) * (item.quantity ?? 1)).toFixed(2) }}
          </p>
        </div>
        <button
          @click="removeItem(item.id)"
          class="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remover
        </button>
      </div>
    </div>
    <div v-if="items.length > 0" class="flex justify-end items-center mt-8">
      <span class="text-lg font-semibold mr-4">Total:</span>
      <span class="text-xl font-bold text-green-600">{{ totalPriceFormatted }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'

const cartItems = ref<ItemCardapio[]>([])

onBeforeMount(() => {
  const cartRaw = JSON.parse(sessionStorage.getItem('cart') || '[]')
  const parsePrice = (price: string | number) => {
    if (typeof price === 'string') {
      return Number(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0
    }
    return Number(price) || 0
  }
  // Agrupa itens pelo id
  const grouped: Record<number, ItemCardapio> = {}
  cartRaw.forEach((item: ItemCardapio) => {
    const id = item.id
    if (!grouped[id]) {
      grouped[id] = {
        ...item,
        price: parsePrice(item.price),
        quantity: item.quantity ? Number(item.quantity) : 1,
      }
    } else {
      grouped[id].quantity =
        Number(grouped[id].quantity ?? 1) + (item.quantity ? Number(item.quantity) : 1)
    }
  })
  cartItems.value = Object.values(grouped)
})
const items = computed(() => cartItems.value)

const removeItem = (itemId: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== itemId)

  const cartRaw = JSON.parse(sessionStorage.getItem('cart') || '[]')
  const updatedCart = cartRaw.filter((item: ItemCardapio) => item.id !== itemId)
  sessionStorage.setItem('cart', JSON.stringify(updatedCart))
}

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0)
})

const totalPriceFormatted = computed(() => `R$ ${totalPrice.value.toFixed(2)}`)
</script>

<style scoped>
/* Adicione estilos customizados se necessário */
</style>
