<script setup>
import { ref, onMounted } from "vue";

import ViewPlayerData from "./ViewPlayerData.vue";
import AddPlayerData from "./AddPlayerData.vue";

import MatchServices from "../../../services/matchServices.js";
import TeamServices from "../../../services/teamServices.js";

const props = defineProps({
  matchId: {
    type: Number,
    default: -1,
  },
  participantId: {
    type: Number,
    default: -1,
  },
});

const currentTab = ref("1");
const titleId = ref(-1);

const getTitleId = async () => {
  const match = await MatchServices.getMatch(props.matchId);
  const team = await TeamServices.getTeam(match.data.teamId);
  titleId.value = team.data.titleId;
}

const switchCurrentTab = () => {
  if (currentTab.value == "1") {
    currentTab.value = "2";
  } else {
    currentTab.value = "1";
  }
};

onMounted(()=> {
  getTitleId();
})
</script>

<script>
export default {
  computed: {
    cols() {
      const { xs, sm } = this.$vuetify.display;
      return xs ? 12 : sm ? 10 : 8;
    },
  },
};
</script>

<template>
  <v-col :cols="cols" class="mx-auto" v-if="titleId != -1">
    <v-card>
      <v-tabs v-model="currentTab" color="primary" dark slider-color="primary">
        <v-tab value="1">View Player Data</v-tab>
        <v-tab value="2">Add Player Data</v-tab>
      </v-tabs>
      <v-divider />
      <v-window v-model="currentTab">
        <v-window-item value="1"> <ViewPlayerData :matchId="props.matchId" :titleId="titleId" :participantId="props.participantId"/> </v-window-item>
        <v-window-item value="2">
          <AddPlayerData :titleId="titleId" :participantId="props.participantId" @cancel="switchCurrentTab" />
        </v-window-item>
      </v-window>
    </v-card>
  </v-col>
</template>
<style scoped></style>
