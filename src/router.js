import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import Dashboard from "./views/Dashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";
import EditPermissions from "./views/EditPermissions.vue";
import PlayerInfo from "./views/PlayerInfo.vue";
import ViewAlias from "./views/ViewAlias.vue";
import AddAccount from "./views/maintain/users/AddAccount.vue";
import MaintainUsers from "./views/maintain/users/MaintainUsers.vue";
import MaintainTeams from "./views/maintain/teams/MaintainTeams.vue";
import EditUsers from "./views/EditUsers.vue";

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
    {
      path: "/viewAlias",
      name: "viewAlias",
      component: ViewAlias,
      props: true,
    },
    {
      path: "/maintainUsers",
      name: "maintainUsers",
      component: MaintainUsers,
      props: true,
    },
    {
      path: "/maintainTeams",
      name: "maintainTeams",
      component: MaintainTeams,
      props: true,
    },
    {
      path: "/editUsers/:userId",
      name: "editUsers",
      component: EditUsers,
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
