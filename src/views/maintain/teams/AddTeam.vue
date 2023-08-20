<script setup>
import TeamServices from "../../../services/teamServices.js";
import TitleServices from "../../../services/titleServices";

import { ref, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormValidator from "../../../components/FormComponents/support/FormValidator";

import TextField from "../../../components/FormComponents/TextField.vue";
import Select from "../../../components/FormComponents/Select.vue";

const validator = new FormValidator();

const validateForm = async () => {
  if (await validator.isFormValid()) {
    addTeam();
  } else {
    return;
  }
};

const addTeam = () => {
  TeamServices.addTeam(team.value)
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        showDialog.value = true;
      } else {
        console.log(response);
        error.value = response.data.message;
      }
    })
    .catch((error) => {
      errorMsg.value = error.response.data.message;
      showDialog.value = true;
    });
};

const errorMsg = ref("");
const showDialog = ref(false);
const titles = ref();
const team = ref({
  name: "",
  isFlagship: "",
  titleId: null,
});

const getTitles = () => {
  TitleServices.getTitles().then((response) => {
    titles.value = response.data.map((title) => {
      return { name: title.name, value: title.id };
    });
  });
};

const resetAdd = () => {
  showDialog.value = false;
  team.value = {
    name: "",
    isFlagship: "",
    titleID: null,
  };
};

onMounted(() => {
  getTitles();
});
</script>

<template>
  <div>
    <div class="w-75 mx-auto mt-4">
      <Select
        v-model="team.titleId"
        :items="titles"
        label="Title"
        :validators="{ required }"
      />
      <TextField
        v-model="team.name"
        label="Team Name"
        :validators="{ required }"
      />
      <v-checkbox v-model="team.isFlagship" label="Is Flagship"></v-checkbox>
    </div>
    <div class="text-center">
      <v-btn color="primary" @click="validateForm" class="ma-4">Save</v-btn>
      <v-btn @click="dialog = false" class="ma-4">Cancel</v-btn>
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
