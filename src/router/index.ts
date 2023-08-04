import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';
import Home from '@/views/Home/index.vue';
import type { Route } from '@/types';

export const routes: Route[] = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/cat',
    name: 'cat',
    component: () => import('@/views/Cat/index.vue'),
    meta: {
      windowOption: {
        title: '猫猫',
        alwaysOnTop: true,
        decorations: false,
        transparent: true,
        minWidth: 306,
        minHeight: 177
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
});

export default router;
