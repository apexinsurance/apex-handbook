import { shallowRef } from 'vue'
import Default from '@/layouts/default.vue'

const DefaultComponent = shallowRef(Default)

export const regionRoute = {
  path: '/region',
  name: 'Регионы',
  component: DefaultComponent,
  meta: {
    title: 'Регионы',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/region/index.vue'),
      meta: {
        title: 'Регионы',
        icon: 'place',
        breadcrumb: false,
      },
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/region/edit.vue'),
      meta: {
        title: 'Изменить регион',
        hidden: true,
      },
    },
    {
      path: 'create',
      component: () => import('@/views/region/create.vue'),
      meta: {
        title: 'Создать регион',
        hidden: true,
      },
    },
  ],
}
