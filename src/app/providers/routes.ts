
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home'),
  },
  {
    path: '/convert',
    name: 'convert',
    component: () => import('@/pages/convert'),
  },
]