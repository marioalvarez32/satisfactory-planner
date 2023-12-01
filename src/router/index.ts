import { createRouter, createWebHashHistory } from 'vue-router';
import ProductionPlanner from '@/Client/Planner/ProductionPlanner.vue';

const Home = { template: '<div>Home</div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/planner', component: ProductionPlanner },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export { router };
