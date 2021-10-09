import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const bcvRoute: RouteRecordRaw = {
  path: '/bcv',
  name: 'BCV',
  component: DefaultComponent,
  meta: {
    title: 'BCV',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/bcv/index.vue'),
      meta: {
        title: 'BCV',
        icon: 'price_check',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/bcv/edit.vue'),
      meta: {
        title: 'Изменить bcv',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/bcv/create.vue'),
      meta: {
        title: 'Создать bcv',
        hidden: true,
      },
    },
  ],
}
