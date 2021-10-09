import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const currencyRateRoute: RouteRecordRaw = {
  path: '/currency-rate',
  name: 'Курс валюты',
  component: DefaultComponent,
  meta: {
    title: 'Курс валюты',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/currency-rate/index.vue'),
      meta: {
        title: 'Курс валюты',
        icon: 'payments',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/currency-rate/edit.vue'),
      meta: {
        title: 'Изменить курс валюта',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/currency-rate/create.vue'),
      meta: {
        title: 'Создать курс валюта',
        hidden: true,
      },
    },
  ],
}
