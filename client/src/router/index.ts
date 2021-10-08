import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Default from '@/layouts/default.vue'
import { shallowRef } from 'vue'

import { countryRoute, regionRoute, districtRoute, cityRoute } from './modules'
import { bankRoute } from './modules/bank'
import { currencyRoute } from './modules/currency'

export const DefaultComponent = shallowRef(Default)

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: 'Login',
      hidden: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not found',
    component: DefaultComponent,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import('@/views/404.vue'),
        meta: {
          hidden: true,
        },
      },
    ],
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/country',
  },
  countryRoute,
  regionRoute,
  districtRoute,
  cityRoute,
  bankRoute,
  currencyRoute,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constRoutes,
})

export default router
