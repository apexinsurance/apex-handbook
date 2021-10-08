import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const bankRoute: RouteRecordRaw = {
  path: '/bank',
  name: 'Банки',
  component: DefaultComponent,
  meta: {
    title: 'Города',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/bank/index.vue'),
      meta: {
        title: 'Банки',
        icon: 'account_balance',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/bank/edit.vue'),
      meta: {
        title: 'Изменить банк',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/bank/create.vue'),
      meta: {
        title: 'Создать банк',
        hidden: true,
      },
    },
  ],
}
