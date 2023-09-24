import { createRouter, createWebHistory } from 'vue-router';

import Wallet from '../components/route';


const routes = [...Wallet];
const initializeRouter = () => {
    // eslint-disable-next-line new-cap
    const router = new createRouter({
      history: createWebHistory(),
      routes,
      scrollBehavior() {
        return { x: 0, y: 0 };
      },
    });
    router.beforeEach((to, from, next) => {
      if (to.path === '/') {
        next({ name: 'Wallet' });
      }else if (!to.matched.length) {
        next({ name: 'Error', params: { type: 'page-not-found' } });
      } else {
        next();
      }
    });
    return router;
  };
  
  export { initializeRouter };
  