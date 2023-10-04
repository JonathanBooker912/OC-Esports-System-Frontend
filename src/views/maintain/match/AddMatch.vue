<script setup>
import TeamServices from "../../../services/teamServices.js";
import MatchServices from "../../../services/matchServices.js";

import { ref, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormValidator from "../../../components/FormComponents/support/FormValidator";

import TextField from "../../../components/FormComponents/TextField.vue";
import Select from "../../../components/FormComponents/Select.vue";
import matchServices from "../../../services/matchServices.js";

const validator = new FormValidator();
const emit = defineEmits(["cancel"]);

const validateForm = async () => {
  if (await validator.isFormValid()) {
    addMatch();
  } else {
    return;
  }
};

const addMatch = () => {
  MatchServices.createMatch(match.value)
  .then((response) => {
    if (response.status == 200){
      showDialog.value = true;
    }
    else {
      error.value = response.data.message;
    }
  })
  .catch((err) => {
    errorMsg.value = err.response.data.message;
    showDialog.value = true;
  })
};

const errorMsg = ref("");
const showDialog = ref(false);
const teams = ref([]);
const match = ref({
  name: "",
  teamId: null,
});


const getTeams = () => {
  TeamServices.getAllTeams()
  .then((response) => {
    teams.value = response.data.rows.map((team) => {
      return { name: team.name, value: team.id };
    });
  })
  .catch((err) => {
    errorMsg.value = err.response.data.message;
    showDialog.value = true;
  })
}

const resetAdd = () => {
  showDialog.value = false;
  match.name = "";
  match.teamId = null;
};

const cancel = () => {
  emit("cancel");
}

onMounted(() => {
  getTeams();
});
</script>

<template>
  <div>
    <div class="w-75 mx-auto mt-4">
      <TextField
      v-model="match.name"
      label="Match Name"
      :validators="{ required }"
      />
      <Select
      v-model="match.teamId"
      :items="teams"
      label="Team"
      :validators="{ required }"
      />
    </div>
    <div class="text-center">
      <v-btn color="primary" @click="validateForm" class="ma-4">Save</v-btn>
      <v-btn @click="cancel" class="ma-4">Cancel</v-btn>
    </div>
    <v-dialog v-model="showDialog" width="auto">
      <v-card>
        <v-card-text>
          {{ errorMsg ? errorMsg : "Successfully Added Team!" }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="resetAdd">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
