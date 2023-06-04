<script setup>
import ocLogo from "/nav_main.svg";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import Utils from "../config/utils";
import AuthServices from "../services/authServices";

const router = useRouter();
const user = ref(null);
const title = ref("Esports Portal");
const initials = ref("");
const name = ref("");
const logoURL = ref("");

const resetMenu = () => {
  user.value = null;
  user.value = Utils.getStore("user");
  if (user.value) {
    initials.value = user.value.fName[0] + user.value.lName[0];
    name.value = user.value.fName + " " + user.value.lName;
  }
};

const logout = () => {
  AuthServices.logoutUser(user.value)
    .then((response) => {
      console.log(response);
      Utils.removeItem("user");
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  logoURL.value = ocLogo;
  resetMenu();
});
</script>

<script>
import { ref } from "vue";
const drawer = ref(false);
export default {
  computed: {
    displayDrawer() {
      const { sm, xs } = this.$vuetify.display;
      return sm || xs ? true : false;
    },
    drawerState() {
      const { sm, xs } = this.$vuetify.display;
      if (!sm && !xs) drawer.value = false;
      return !sm && !xs ? false : drawer.value;
    },
    drawerWidth() {
      const { sm, xs } = this.$vuetify.display;
      return sm ? 450 : xs ? 350 : 500;
    },
  },
};
</script>

<template>
  <div>
    <v-app-bar app>
      <router-link :to="{ name: 'Dashboard' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="100"
          width="100"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user && !displayDrawer">
        <!--<v-btn class="mx-2" :to="{ name: 'tutorials' }"> List </v-btn>
        <v-btn class="mx-2" :to="{ name: 'add' }"> Add Tutorial </v-btn>-->
      </div>
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
        v-if="user && !displayDrawer"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon x-large>
            <v-avatar v-if="user" color="secondary">
              <span class="accent--text font-weight-bold">{{ initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="secondary" class="mt-2 mb-2">
                <span class="accent--text font-weight-bold">{{
                  initials
                }}</span>
              </v-avatar>
              <h3>{{ name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="displayDrawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerState"
      location="right"
      :width="drawerWidth"
      temporary
    >
      <v-list>
        <!--<v-btn class="mx-2" :to="{ name: 'tutorials' }"> List </v-btn>
        <v-btn class="mx-2" :to="{ name: 'add' }"> Add Tutorial </v-btn>-->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
