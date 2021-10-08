import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const currencyRoute: RouteRecordRaw = {
  path: '/currency',
  name: 'Валюта',
  component: DefaultComponent,
  meta: {
    title: 'Валюта',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/currency/index.vue'),
      meta: {
        title: 'Валюта',
        icon: 'attach_money',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/currency/edit.vue'),
      meta: {
        title: 'Изменить валюта',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/currency/create.vue'),
      meta: {
        title: 'Создать валюта',
        hidden: true,
      },
    },
  ],
}
