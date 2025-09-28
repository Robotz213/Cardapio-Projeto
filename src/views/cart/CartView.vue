<script setup lang="ts">
import usercard from '@/assets/img/usercard.png'
import { Button, Card } from 'primevue'
import { computed, onBeforeMount, ref } from 'vue'
const cartItems = ref<ItemCardapio[]>([])
onBeforeMount(() => {
  const cartRaw = JSON.parse(sessionStorage.getItem('cart') || '[]')

  // Função para normalizar o preço
  function normalizePrice(price: string | number): number {
    if (typeof price === 'string') {
      // Remove caracteres não numéricos e converte vírgula para ponto
      return Number(price.replace(/[^\d,]/g, '').replace(',', '.')) || 0
    }
    return Number(price) || 0
  }

  // Agrupa itens pelo id e soma as quantidades
  const groupedItems: Record<number, ItemCardapio> = {}

  cartRaw.forEach((item: ItemCardapio) => {
    const id = item.id
    const quantity = item.quantity ? Number(item.quantity) : 1
    const price = normalizePrice(item.price)

    if (!groupedItems[id]) {
      groupedItems[id] = { ...item, price, quantity }
    } else {
      groupedItems[id].quantity = (groupedItems[id].quantity || 0) + quantity
    }
  })

  cartItems.value = Object.values(groupedItems)
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

<template>
  <div>
    <div class="cart-content">
      <h1 class="text-2xl font-bold mb-6">Carrinho de Compras</h1>
      <TransitionGroup
        name="list"
        tag="ul"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card v-for="item in items" :key="item.id">
          <template #header>
            <img alt="user header" class="rounded-t-md" :src="usercard" />
          </template>
          <template #title>
            <span class="font-bold text-lg">{{ item.name }}</span>
          </template>
          <template #content>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>
            <p class="text-gray-600 mb-1">
              Preço unitário: <span class="font-bold">R$ {{ Number(item.price).toFixed(2) }}</span>
            </p>
            <p class="text-green-700 font-bold mt-2">
              Subtotal: R$ {{ (Number(item.price) * (item.quantity ?? 1)).toFixed(2) }}
            </p>
          </template>
          <template #footer>
            <Button
              @click="removeItem(item.id)"
              class="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remover
            </Button>
          </template>
        </Card>
      </TransitionGroup>
      <div v-if="items.length > 0" class="flex justify-end items-center mt-8">
        <span class="text-lg font-semibold mr-4">Total:</span>
        <span class="text-xl font-bold text-green-600">{{ totalPriceFormatted }}</span>
      </div>
    </div>

    <Transition name="cart-empty" :duration="1500">
      <div
        v-if="items.length === 0"
        class="cart-empty text-center text-gray-500 font-bold text-3xl"
      >
        Seu carrinho está vazio.
      </div>
    </Transition>

    <Transition name="checkout">
      <div class="checkout-container" v-if="items.length > 0">
        <Button
          icon="pi pi-shopping-cart"
          class="checkout-button"
          @click="$router.push('/checkout')"
          badgeClass="p-badge-danger"
        >
          Finalizar Compra ({{ totalPriceFormatted }})
        </Button>
      </div>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.checkout-container {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-bottom: 2rem;
}

.checkout-container .checkout-button {
  width: 100%;
  height: 5rem;
}

.cart-empty {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cart-content {
  margin-bottom: 5rem;
  padding: 2.3rem;
}

.checkout-enter-active,
.checkout-leave-active {
  transition: all 0.5s ease;
}

.checkout-enter-from,
.checkout-leave-to {
  transform: translateY(120px);
}
</style>
