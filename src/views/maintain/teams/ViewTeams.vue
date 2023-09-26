<script setup>
import TeamServices from "../../../services/teamServices.js";
import { ref, onMounted } from "vue";
import { required } from "@vuelidate/validators";
import FormValidator from "../../../components/FormComponents/support/FormValidator";

import DataTable from "../../../components/DataTable.vue";
import ConfirmAction from "../../../components/ConfirmAction.vue";
import TextField from "../../../components/FormComponents/TextField.vue";

const validator = new FormValidator();

const validateForm = async () => {
  if (await validator.isFormValid()) {
    updateTeam();
    dialog.value = false;
  } else {
    return;
  }
};

const teams = ref([]);
const count = ref(5);
const dialog = ref(false);
const showConfirm = ref(false);
const selectedTeam = ref({});
const teamToDelete = ref(null);
const errorMsg = ref("");
const showError = ref(false);

const actions = [
  { label: "Edit", event: "edit-team" },
  { label: "Delete", event: "delete-team" },
];

const handleActionEvent = (payload) => {
  if (payload.event == "edit-team") viewTeam(payload.value);

  if (payload.event == "delete-team") {
    teamToDelete.value = payload.value;
    showConfirmDialog();
  }
};

const showConfirmDialog = () => {
  showConfirm.value = !showConfirm.value;
};

const getUsers = (itemsPerPage, page) => {
  TeamServices.getAllTeams(itemsPerPage, page)
    .then((response) => {
      teams.value = response.data.rows;
      count.value = response.data.count;
    })
    .catch((err) => {
      // Create UI to add visual error checking
      console.log(err);
    });
};

async function getTeamForID(teamId) {
  await TeamServices.getTeam(teamId)
    .then((response) => {
      selectedTeam.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

const search = (filter, itemsPerPage, page) => {
  if (filter == "" || filter == null) {
    getUsers(itemsPerPage, page);
  } else {
    TeamServices.search(filter, itemsPerPage, page)
      .then((response) => {
        teams.value = response.data.rows;
        count.value = response.data.count;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const viewTeam = async (userId) => {
  await getTeamForID(userId);
  dialog.value = true;
};

const deleteTeam = () => {
  TeamServices.deleteTeam(teamToDelete.value)
    .then(() => {
      getUsers(5, 1);
    })
    .catch((error) => {
      errorMsg.value = error.response.data.message;
      showError.value = true;
    });
  showConfirmDialog();
};

const updateTeam = () => {
  const updatedTeam = {
    name: selectedTeam.value.name,
    isFlagship: selectedTeam.value.isFlagship,
  };
  TeamServices.updateTeam(selectedTeam.value.id, updatedTeam)
    .then(() => {
      getUsers(5, 1);
    })
    .catch((error) => {
      console.error("Error updating team:", error);
      // Handle the error, like showing an error message
    });
};

onMounted(() => {
  getUsers(5, 1);
});
</script>

<template>
  <div>
    <DataTable
      :data="teams"
      :count="count"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'isFlagship', label: 'Is Flagship' },
      ]"
      :actions="actions"
      @action-event="handleActionEvent"
      @search="search"
    />
    <ConfirmAction
      :show="showConfirm"
      action="Delete"
      @action="deleteTeam"
      @cancel="showConfirmDialog"
    />
    <div class="text-center">
      <v-dialog v-model="dialog" class="w-50">
        <v-card v-if="dialog">
          <v-toolbar color="primary" title="Edit Team">
            <v-btn icon="mdi-arrow-left" @click="dialog = false" />
          </v-toolbar>
          <v-card-text>
            <TextField
              v-model="selectedTeam.name"
              label="Team Name"
              :validators="{ required }"
            />
            <div class="text-h5 pa-5">
              <v-checkbox
                v-model="selectedTeam.isFlagship"
                label="Is Flagship"
              />
            </div>
          </v-card-text>
          <div class="text-center">
            <v-btn color="primary" class="ma-4" @click="validateForm">
              Save
            </v-btn>
            <v-btn class="ma-4" @click="dialog = false"> Cancel </v-btn>
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
          <v-btn color="primary" block @click="showError = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
