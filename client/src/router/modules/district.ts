import { RouteRecordRaw } from 'vue-router'
import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const districtRoute: RouteRecordRaw = {
  path: '/district',
  name: 'Районы',
  component: DefaultComponent,
  meta: {
    title: 'Районы',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/district/index.vue'),
      meta: {
        title: 'Районы',
        icon: 'villa',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/district/edit.vue'),
      meta: {
        title: 'Изменить район',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/district/create.vue'),
      meta: {
        title: 'Создать район',
        hidden: true,
      },
    },
  ],
}
