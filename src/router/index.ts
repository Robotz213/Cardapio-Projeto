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
  ],
})

export default router
