import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const cityRoute: RouteRecordRaw = {
  path: '/city',
  name: 'Города',
  component: DefaultComponent,
  meta: {
    title: 'Города',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/city/index.vue'),
      meta: {
        title: 'Города',
        icon: 'location_city',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/city/edit.vue'),
      meta: {
        title: 'Изменить город',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/city/create.vue'),
      meta: {
        title: 'Создать город',
        hidden: true,
      },
    },
  ],
}
