import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/LoginPage.vue";

import Dashboard from "./views/UserDashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";
import PlayerInfo from "./views/PlayerInfo.vue";
import ViewAlias from "./views/ViewAlias.vue";
import MaintainUsers from "./views/maintain/users/MaintainUsers.vue";
import MaintainTeams from "./views/maintain/teams/MaintainTeams.vue";

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
  ],
});

// router.beforeEach(async (to) => {
//   if (Utils.getStore("user") == null) {
//     return "/login";
//   }
// });

export default router;
