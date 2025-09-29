import { useToast } from 'primevue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/cardapio',
    },
    {
      path: '/cardapio',
      name: 'cardapio',
      component: () => import('@/views/cardapio/CardapioView.vue'),
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('@/views/cart/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/checkout/CheckoutView.vue'),
      beforeEnter: (to, from, next) => {
        const cartItems: ItemCardapio[] = JSON.parse(sessionStorage.getItem('cart') || '[]')
        if (cartItems.length === 0) {
          const toast = useToast()
          toast.add({
            severity: 'info',
            summary: 'Carrinho Vazio',
            detail: 'Adicione itens ao carrinho antes de acessar.',
            life: 3000,
          })
          next('/cardapio') // Redirect to cardapio if cart is empty
        } else {
          next() // Proceed to cart if there are items
        }
      },
    },
  ],
})

export default router
