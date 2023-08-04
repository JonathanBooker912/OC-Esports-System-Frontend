<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import TextField from "../components/FormComponents/TextField.vue";
import EmailListItem from "../components/View/EmailListItem.vue";

import FormValidator from "../components/FormComponents/support/FormValidator";

import UserServices from "../services/userServices";
import { required, email } from "@vuelidate/validators"; // Check before deleting this

const router = useRouter();

const addMethod = ref(0);

const validator = new FormValidator();

const validateForm = async () => {
  if (await validator.isFormValid()) {
    await addEmails();
  } else {
    return;
  }
};

const useCustomDelimiter = ref(false);
const selectedDelimiter = ref("");
const separatorOptions = [", ", ",", " ", "\t", "\n", ":", "|"];

const userInputList = ref("");
const emails = ref([]);
const showDialog = ref(false);
const loading = ref(false);

const createUser = async (userEmail) => {
  UserServices.createUser({ email: userEmail }).then((response) => {});
};

const addEmails = async () => {
  loading.value = true;
  if (addMethod.value == 0) {
    createUser(data.value.email);
  } else {
    for (let i = 0; i < emails.value.length; i++) {
      let response = await UserServices.getUserByEmail(emails.value[i]);
      if (response.data.length == 0) {
        UserServices.createUser({ email: emails.value[i] });
        removeEmail(emails.value[i]);
        i--;
      }
    }
    loading.value = false;
    showDialog.value = true;
  }
};

const findDelimiter = () => {
  separatorOptions.every((delimiter) => {
    if (userInputList.value.includes(delimiter)) {
      console.log(delimiter);
      selectedDelimiter.value = delimiter;
      return false;
    }
    return true;
  });
};

const parseEmails = () => {
  if (!useCustomDelimiter.value) findDelimiter();

  emails.value = userInputList.value.split(selectedDelimiter.value);
  userInputList.value = "";
};

const removeEmail = (email) => {
  emails.value = emails.value.filter((value) => value != email);
};

const returnToDashboard = () => {
  router.push({ name: "Dashboard" });
};
</script>

<script>
export default {
  computed: {
    cols() {
      const { xs, sm } = this.$vuetify.display;
      return xs ? 12 : sm ? 10 : 6;
    },
  },
};
</script>

<template>
  <v-col class="mx-auto pt-16" :cols="cols">
    <v-card>
      <v-card-title primary-title> Add Account </v-card-title>
      <v-radio-group v-model="addMethod" class="pa-2" color="text primary">
        <v-radio label="Add One" v-bind:value="0"></v-radio>
        <v-radio label="Add List" v-bind:value="1"></v-radio>
      </v-radio-group>

      <TextField
        class="w-75 mx-auto pt-6"
        v-model="emails[0]"
        label="Email"
        v-if="addMethod == 0"
        :validators="{ required, email }"
      />
      <div class="w-75 mx-auto pt-6" v-if="addMethod == 1">
        <div v-if="emails.length < 1">
          <v-textarea
            name="values"
            label="Values"
            v-model="userInputList"
          ></v-textarea>
          <v-row class="mx-3">
            <v-checkbox
              label="Custom Delimiter"
              v-model="useCustomDelimiter"
              value="value"
            ></v-checkbox>
            <v-text-field
              v-if="useCustomDelimiter"
              name="name"
              label="Delimiter"
              id="id"
              v-model="selectedDelimiter"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-btn
              color="accent"
              class="mx-auto mt-2 mb-6"
              @click="parseEmails()"
              :disabled="userInputList.length < 1"
              >Split Values</v-btn
            >
          </v-row>
        </div>
        <EmailListItem
          v-for="email in emails"
          :key="emails.indexOf(email)"
          v-model="emails[emails.indexOf(email)]"
          @emailRemoved="removeEmail(email)"
        />
      </div>

      <v-row
        class="justify-center mb-4 mt-3"
        v-if="addMethod == 0 || emails.length > 0"
      >
        <v-btn color="success" class="w-25 mx-4" @click="validateForm"
          >Add</v-btn
        >
        <v-btn color="secondary" class="w-25 mx-4" @click="returnToDashboard()"
          >Cancel</v-btn
        >
      </v-row>

      <v-overlay
        v-model="loading"
        contained
        class="align-center justify-center"
      >
        <v-progress-circular indeterminate></v-progress-circular>
      </v-overlay>
    </v-card>

    <v-dialog v-model="showDialog" width="auto">
      <v-card>
        <v-list v-if="emails.length > 0">
          <v-list-item
            v-for="email in emails"
            :key="emails.indexOf(email)"
            :title="`'${email}' already exists!`"
          ></v-list-item>
        </v-list>
        <v-card-text v-else> Successfully Added Emails! </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>
