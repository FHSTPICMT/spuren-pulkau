import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/GalleryPage.vue'),
  },
  {
    path: '/gps',
    name: 'Gps',
    component: () => import('@/views/GpsPage.vue'),
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/InfoPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
