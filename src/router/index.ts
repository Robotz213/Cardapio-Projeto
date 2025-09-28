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
      component: () => import('../views/cardapio/CardapioView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/CartView.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/payment/PaymentView.vue'),
    },
  ],
})

export default router
