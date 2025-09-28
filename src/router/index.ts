import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
    },
  ],
})

export default router
