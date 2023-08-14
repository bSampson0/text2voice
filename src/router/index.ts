import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'text2voice',
      component: () => import('../views/Text2VoiceView.vue')
    },
    {
      path: '/text2voice',
      name: 'text2voice',
      component: () => import('../views/Text2VoiceView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    },
    {
      // Wildcard route
      path: '/:pathMatch(.*)',
      redirect: '/text2voice'
    }
  ]
})

export default router
