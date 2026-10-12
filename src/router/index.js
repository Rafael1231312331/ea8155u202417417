/**
 * Application Routing
 * @author Rafael André Barrenechea Bustamante
 */
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../animals/presentation/views/home-view.vue')
  },
  {
    path: '/shelter',
    children: [
      {
        path: 'animals/new',
        name: 'new-animal-intake',
        component: () => import('../animals/presentation/views/new-animal-intake-view.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import('../shared/presentation/views/page-not-found-view.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
