import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const unitRoute: RouteRecordRaw = {
  path: '/unit',
  name: 'Ед. изм',
  component: DefaultComponent,
  meta: {
    title: 'Ед. изм',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/unit/index.vue'),
      meta: {
        title: 'Ед. изм',
        icon: 'copyright',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/unit/edit.vue'),
      meta: {
        title: 'Изменить ед. изм',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/unit/create.vue'),
      meta: {
        title: 'Создать ед. изм',
        hidden: true,
      },
    },
  ],
}
