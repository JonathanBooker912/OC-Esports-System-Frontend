import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/LoginPage.vue";

import Dashboard from "./views/UserDashboard.vue";
import EditPlayerInfo from "./views/EditPlayerInfo.vue";
import PlayerInfo from "./views/PlayerInfo.vue";
import ViewAlias from "./views/ViewAlias.vue";
import MaintainUsers from "./views/maintain/users/MaintainUsers.vue";
import MaintainTeams from "./views/maintain/teams/MaintainTeams.vue";
import MaintainMatches from "./views/maintain/match/MaintainMatches.vue";
import MaintainTitles from "./views/maintain/titles/MaintainTitles.vue";
import MaintainTitleMetrics from "./views/maintain/metrics/MaintainTitleMetrics.vue";
import MaintainMatchData from "./views/maintain/matchData/MaintainMatchData.vue";
import MaintainMatchParticipants from "./views/maintain/matchParticipants/MaintainMatchParticipants.vue"
import MaintainPlayerData from "./views/maintain/playerData/MaintainPlayerData.vue"


import AuthServices from "./services/authServices.js";

function authenticateUser(to, from, next) {
  // Grabs the user from local storage and turns it into a JSON object that we can use
  const user = JSON.parse(localStorage.getItem("user"));

  // Calls the backend to validate the token
  AuthServices.validateToken(user)
    .then(() => {
      // If the backend returns with an all good, then we can direct the user
      //  to where they were trying to go
      next();
    })
    .catch(() => {
      // If the backend returns with any error, I just redirect them to
      //  the login page
      next({ path: "/login" });
    });
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
      path: "/maintain/users",
      name: "maintainUsers",
      component: MaintainUsers,
      props: true,
    },
    {
      path: "/maintain/teams",
      name: "maintainTeams",
      component: MaintainTeams,
      props: true,
    },
    {
      path: "/maintain/titles",
      name: "maintainTitles",
      component: MaintainTitles,
      props: true,
    },
    {
      path: "/maintain/matches",
      name: "maintainMatches",
      component: MaintainMatches,
      props: true,
    },
    {
      path: "/maintain/titles/:titleId/metrics",
      name: "maintainTitleMetrics",
      component: MaintainTitleMetrics,
      props: (route) => ({ titleId: Number(route.params.titleId) }),
    },
    {
      path: "/matchData/match/:matchId",
      name: "maintainMatchData",
      component: MaintainMatchData,
      props: (route) => ({ matchId: Number(route.params.matchId) }),
    },
    {
      path: "/maintain/matches/:matchId/participants",
      name: "maintainMatchParticipants",
      component: MaintainMatchParticipants,
      props: (route) => ({ matchId: Number(route.params.matchId) }),
    },
    {
      path: "/maintain/matches/:matchId/participants/:participantId",
      name: "maintainPlayerData",
      component: MaintainPlayerData,
      props: (route) => ({ 
        matchId: Number(route.params.matchId),
        participantId: Number(route.params.participantId) 
      }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === undefined && to.path !== "/login") {
    next({ path: "/login" });
  } else if (to.path == "/") {
    authenticateUser(to, from, next);
  } else {
    next();
  }
});

export default router;
