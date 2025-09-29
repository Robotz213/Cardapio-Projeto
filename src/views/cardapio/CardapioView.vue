<script setup lang="ts">
import { Button, Card } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'
import menu1 from './items/menu1.json'

const toast = useToast()
const items = ref<ItemCardapio[]>(menu1)
const Cart = ref<ItemCardapio[]>([])
const cart = computed(() => Cart.value.length > 0)

onMounted(() => {
  const cart: ItemCardapio[] = JSON.parse(sessionStorage.getItem('cart') || '[]')

  if (cart.length > 0) {
    Cart.value.push(...cart)
  }
})

const images = {
  heineken: import('@/assets/img/heineken.png'),
  skol: import('@/assets/img/skol.png'),
  budweiser: import('@/assets/img/budweiser.png'),
  brahma: import('@/assets/img/brahma.png'),
  antarctica: import('@/assets/img/antarctica.png'),
  skarloff: import('@/assets/img/skarloff.png'),
}

const addToCart = (item: ItemCardapio) => {
  const cart: ItemCardapio[] = JSON.parse(sessionStorage.getItem('cart') || '[]')
  cart.push(item)
  sessionStorage.setItem('cart', JSON.stringify(cart))

  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: `${item.name} adicionado ao carrinho!`,
    life: 3000,
  })

  Cart.value.push(item)
}
</script>

<template>
  <div class="cardapio-content">
    <h1 class="text-4xl font-bold mb-6">Cardápio</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <Card v-for="item in items" :key="item.id">
        <template #header>
          <img alt="user header" class="rounded-t-md" :src="heineken" />
        </template>
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

    <Transition name="cart">
      <div class="cart" v-if="cart">
        <Button
          icon="pi pi-shopping-cart"
          class="cart-button"
          @click="$router.push('/carrinho')"
          badgeClass="p-badge-danger"
        >
          Ir para o carrinho ({{ Cart.length }})
        </Button>
      </div>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
.cardapio-content {
  margin-bottom: 5rem;
  padding: 2.3rem;
}

.cart {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-bottom: 1.2rem;
}

.cart .cart-button {
  width: 100%;
  height: 5rem;
}

.cart-enter-active,
.cart-leave-active {
  transition: all 0.5s ease;
}

.cart-enter-from,
.cart-leave-to {
  transform: translateY(90px);
}
</style>
