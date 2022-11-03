import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ()=>import(/* webpackChunkName: "home" */ '../views/HomeView.vue' )
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "registration" */ '../views/SignView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'home'}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (!to.name) return;
  if (to.name === 'sign' && store.getters['isAuth']) return {name: 'home'};
  if (to.name !== 'sign' && !store.getters['isAuth']) return {name: 'sign'};
});


export default router
