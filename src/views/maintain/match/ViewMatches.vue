<script setup>
import MatchServices from "../../../services/matchServices.js";
import TeamServices from "../../../services/teamServices.js";

import { ref, onMounted } from "vue";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import FormValidator from "../../../components/FormComponents/support/FormValidator";
import { useDataTableStore } from "../../../stores/dataTableStore.js";

import DataTable from "../../../components/DataTable.vue";
import ConfirmAction from "../../../components/ConfirmAction.vue";
import TextField from "../../../components/FormComponents/TextField.vue";
import Select from "../../../components/FormComponents/SelectBox.vue";
import { storeToRefs } from "pinia";

const store = useDataTableStore();
const { itemsPerPage, page } = storeToRefs(store);

const router = useRouter();

const validator = new FormValidator();

const validateForm = async () => {
  if (await validator.isFormValid()) {
    updateMatch();
  } else {
    return;
  }
};

const matches = ref([]);
const count = ref(5);
const dialog = ref(false);
const showConfirm = ref(false);
const selectedMatch = ref({});
const matchToDelete = ref(null);
const errorMsg = ref("");
const showError = ref(false);

const teams = ref([]);

const actions = [
  { label: "Edit", event: "edit-match" },
  { label: "View MatchData", event: "view-matchData" },
  { label: "Delete", event: "delete-match" },
];

const handleActionEvent = (payload) => {
  if (payload.event == "edit-match") viewMatch(payload.value);

  if (payload.event == "view-matchData") {
    router.push({
      name: "maintainMatchData",
      params: { matchId: payload.value },
    });
  }

  if (payload.event == "delete-match") {
    matchToDelete.value = payload.value;
    showConfirmDialog();
  }
};

const showConfirmDialog = () => {
  showConfirm.value = !showConfirm.value;
};

const getMatches = (itemsPerPage, page) => {
  MatchServices.getAllMatches(itemsPerPage, page)
    .then((response) => {
      console.log(response.data.rows);
      matches.value = response.data.rows;
      count.value = response.data.count;
    })
    .catch((err) => {
      // Create UI to add visual error checking
      errorMsg.value = err.message;
      showError.value = true;
    });
};

async function getMatchForId(matchId) {
  await MatchServices.getMatch(matchId)
    .then((response) => {
      selectedMatch.value = response.data;
    })
    .catch((err) => {
      errorMsg.value = err.message;
      showError.value = true;
    });
}

const search = (filter) => {
  if (filter == "" || filter == null) {
    getMatches(itemsPerPage.value, page.value);
  } else {
    MatchServices.search(filter, itemsPerPage.value, page.value)
      .then((response) => {
        matches.value = response.data.rows;
        count.value = response.data.count;
      })
      .catch((err) => {
        errorMsg.value = err.message;
        showError.value = true;
      });
  }
};

const viewMatch = async (userId) => {
  await getMatchForId(userId);
  dialog.value = true;
};

const deleteMatch = () => {
  MatchServices.deleteMatch(matchToDelete.value)
    .then(() => {
      getMatches(5, 1);
    })
    .catch((error) => {
      errorMsg.value = error.response.data.message;
      showError.value = true;
    });
  showConfirmDialog();
};

const updateMatch = () => {
  const updatedMatch = {
    name: selectedMatch.value.name,
    teamId: selectedMatch.value.teamId,
  };
  MatchServices.updateMatch(selectedMatch.value.id, updatedMatch)
    .then(() => {
      dialog.value = false;
      getMatches(itemsPerPage, 1);
    })
    .catch((error) => {
      errorMsg.value = error.message;
      showError.value = true;
      // Handle the error, like showing an error message
    });
};

const getTeams = () => {
  TeamServices.getAllTeams()
    .then((response) => {
      teams.value = response.data.rows.map((team) => {
        return { name: team.name, value: team.id };
      });
    })
    .catch((err) => {
      errorMsg.value = err.message;
      showError.value = true;
    });
};

const reloadTable = (itemsPerPage) => {
  getMatches(itemsPerPage, 1);
};

const viewMetrics = () => {};

onMounted(() => {
  getMatches(5, 1);
  getTeams();
});
</script>

<template>
  <div>
    <DataTable
      :data="matches"
      :count="count"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'teamId', label: 'Team ID' },
      ]"
      :actions="actions"
      @action-event="handleActionEvent"
      @search="search"
      @reload="reloadTable"
    ></DataTable>
    <ConfirmAction
      :show="showConfirm"
      action="Delete"
      @action="deleteMatch"
      @cancel="showConfirmDialog"
    />
    <div class="text-center">
      <v-dialog v-model="dialog" class="w-50">
        <v-card v-if="dialog">
          <v-toolbar color="primary" title="Edit Match">
            <v-btn icon="mdi-arrow-left" @click="dialog = false"></v-btn>
          </v-toolbar>
          <v-card-text>
            <TextField
              v-model="selectedMatch.name"
              label="Match Name"
              :validators="{ required }"
            />
            <div class="text-h5 pa-5">
              <Select
                v-model="selectedMatch.teamId"
                label="Team"
                :items="teams"
                :validators="{ required }"
              />
            </div>
          </v-card-text>
          <div class="text-center">
            <v-btn color="primary" class="ma-4" @click="validateForm"
              >Save</v-btn
            >
            <v-btn class="ma-4" @click="dialog = false">Cancel</v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="showError" width="auto">
      <v-card>
        <v-card-text>
          {{ errorMsg }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showError = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
