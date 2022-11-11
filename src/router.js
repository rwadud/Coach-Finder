import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const CoachList = () => import('./pages/coaches/CoachList.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestList = () => import('./pages/requests/RequestList.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches', name: 'home' },
    { path: '/coaches', component: CoachList, name: 'coaches' },
    {
      name: 'coach',
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          name: 'contact',
          path: 'contact',
          component: ContactCoach,
          props: true,
        },
      ],
    },
    {
      name: 'registerCoach',
      path: '/register-coach',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      name: 'requests',
      path: '/requests',
      component: RequestList,
      meta: { requiresAuth: true },
    },
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnAuth: false },
    },
    { name: 'notfound', path: '/:any(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
