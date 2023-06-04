import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import Dashboard from "./views/Dashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      alias: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/",
      alias: "/playerForm",
      name: "playerForm",
      component: EditPlayerInfo,
    },
  ],
});

export default router;
