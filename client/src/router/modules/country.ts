import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const countryRoute: RouteRecordRaw = {
  path: '/country',
  name: 'Cтраны',
  component: DefaultComponent,
  meta: {
    title: 'Cтраны',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/country/index.vue'),
      meta: {
        title: 'Cтраны',
        icon: 'flag',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/country/edit.vue'),
      meta: {
        title: 'Изменить страну',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/country/create.vue'),
      meta: {
        title: 'Создать страну',
        hidden: true,
      },
    },
  ],
}
