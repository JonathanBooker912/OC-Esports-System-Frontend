import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import Dashboard from "./views/Dashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";
import EditPermissions from "./views/EditPermissions.vue";
import PlayerInfo from "./views/PlayerInfo.vue";
import ViewAlias from "./views/ViewAlias.vue";
import AddAccount from "./views/AddAccount.vue";

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
    {
      path: "/playerInfo",
      name: "playerInfo",
      component: PlayerInfo,
      props: true,
    },
    {
      path: "/EditPermissions",
      name: "editPermissions",
      component: EditPermissions,
    },
    // {
    //   path: "/users",
    //   name: "userList",
    //   component: UserList,
    // }
    {
      path: "/viewAlias",
      name: "viewAlias",
      component: ViewAlias,
      props: true,
    },
    {
      path: "/addAccount",
      name: "addAccount",
      component: AddAccount,
      props: true,
    },
  ],
});

// router.beforeEach(async (to) => {
//   if (Utils.getStore("user") == null) {
//     return "/login";
//   }
// });

export default router;
