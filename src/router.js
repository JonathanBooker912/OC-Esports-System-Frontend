import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/LoginPage.vue";

import Dashboard from "./views/UserDashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";
import PlayerInfo from "./views/PlayerInfo.vue";
import ViewAlias from "./views/ViewAlias.vue";
import MaintainUsers from "./views/maintain/users/MaintainUsers.vue";
import MaintainTeams from "./views/maintain/teams/MaintainTeams.vue";

import AuthServices from "./services/authServices.js";
import { nextTick } from "vue";

function authenticateUser(to, from, next){
  // Grabs the user from local storage and turns it into a JSON object that we can use
  const user = JSON.parse(localStorage.getItem("user"));

  // Calls the backend to validate the token
  AuthServices.validateToken(user).then((res) => {
    // If the backend returns with an all good, then we can direct the user
    //  to where they were trying to go
    next();
  }).catch(() => {
    // If the backend returns with any error, I just redirect them to 
    //  the login page
    next({path:"/login"});
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
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

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === undefined && to.path !=="/login"){
    next({path: "/login"});
  }
  else if (to.path == "/"){
    authenticateUser(to, from, next);
  }
  else {
    next();
  }
})

export default router;
