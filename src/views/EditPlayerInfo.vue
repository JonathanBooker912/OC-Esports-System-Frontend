<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Utils from "../config/utils";

import TextField from "../components/FormInputs/TextField.vue";
import Combobox from "../components/FormInputs/Combobox.vue";
import RadioInput from "../components/FormInputs/RadioInput.vue";

import TitleServices from "../services/titleServices";

const user = ref();
const titles = ref();

const userInfo = ref({
  // storage for the form data
  fName: "",
  lName: "",
  email: "",
  phone: "",
  address: "",
  shirtSize: "",
  pantSize: "",
  outsidePC: "",
  fullVacc: "",
  classification: "",
  gradDate: "",
  title: "",
  gamertag: "",
});

const rules = reactive({
  // validation rules for each piece of data
  fName: { required },
  lName: { required },
  email: { required },
  phone: { required },
  address: { required },
  shirtSize: { required },
  pantSize: { required },
  outsidePC: { required },
  fullVacc: { required },
  classification: { required },
  gradDate: { required },
  title: { required },
  gamertag: { required },
});

const v$ = useVuelidate(rules, userInfo); // setup the vuelidate object

const validateForm = async () => {
  // validate the contents of the form before submitting
  const valid = await v$.value.$validate();
  if (valid && nameAvailable) {
    userAdded();
    showDialog.value = false;
  } else {
    return;
  }
};

function out() {
  console.log(userInfo.value);
}

const sizes = ref(["S", "M", "L", "XL", "XXL", "XXXL"]);

onMounted(() => {
  user.value = Utils.getStore("user");
  userInfo.value = { ...user.value };

  TitleServices.getTitles().then((response) => {
    titles.value = response.data;
    console.log(titles.value);
  });
});
</script>

<template>
  <v-container>
    <v-card title="Player Information" class="w-50 mx-auto">
      <v-container class="pa-4">
        <v-form class="mt-4">
          <v-text-field
            name="fName"
            label="First Name"
            class="pa-2"
            v-model="userInfo.fName"
            :error-messages="v$.fName.$errors.map((e) => e.$message)"
            @input="v$.fName.$touch"
            @blur="v$.fName.$touch"
            readonly
          ></v-text-field>

          <v-text-field
            name="lname"
            label="Last Name"
            class="pa-2"
            v-model="userInfo.lName"
            :error-messages="v$.lName.$errors.map((e) => e.$message)"
            @input="v$.lName.$touch"
            @blur="v$.lName.$touch"
            readonly
          ></v-text-field>

          <v-text-field
            name="email"
            label="Email"
            class="pa-2"
            v-model="userInfo.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
            readonly
          ></v-text-field>

          <v-text-field
            name="phone"
            label="Phone #"
            class="pa-2"
            v-model="userInfo.phone"
            :error-messages="v$.phone.$errors.map((e) => e.$message)"
            @input="v$.phone.$touch"
            @blur="v$.phone.$touch"
          ></v-text-field>

          <v-text-field
            name="address"
            label="Home Address"
            class="pa-2"
            v-model="userInfo.address"
            :error-messages="v$.address.$errors.map((e) => e.$message)"
            @input="v$.address.$touch"
            @blur="v$.address.$touch"
          ></v-text-field>

          <v-text-field
            name="gamertag"
            label="Gamertag"
            class="pa-2"
            v-model="userInfo.gamertag"
            :error-messages="v$.gamertag.$errors.map((e) => e.$message)"
            @input="v$.gamertag.$touch"
            @blur="v$.gamertag.$touch"
          ></v-text-field>

          <!-- This has to be a v-select because v-combobox
               doesn't destructure Javascript objects -->
          <v-select
            name="title"
            label="What game do you play?"
            class="pa-2"
            :items="titles"
            item-title="name"
            item-value="id"
            v-model="userInfo.title"
            :error-messages="v$.title.$errors.map((e) => e.$message)"
            @input="v$.title.$touch"
            @blur="v$.title.$touch"
          ></v-select>

          <v-combobox
            name="shirtSize"
            label="Shirt Size"
            v-model="userInfo.shirtSize"
            class="pa-2"
            :items="sizes"
            :error-messages="v$.shirtSize.$errors.map((e) => e.$message)"
            @input="v$.shirtSize.$touch"
            @blur="v$.shirtSize.$touch"
          ></v-combobox>

          <v-combobox
            name="pantSize"
            label="Pant Size"
            v-model="userInfo.pantSize"
            class="pa-2"
            :items="sizes"
            :error-messages="v$.pantSize.$errors.map((e) => e.$message)"
            @input="v$.pantSize.$touch"
            @blur="v$.pantSize.$touch"
          ></v-combobox>

          <v-radio-group
            id="outsidePC"
            label="Do you have a PC in your Dorm/Housing that you can compete with?"
            v-model="userInfo.outsidePC"
            class="pa-2"
            :error-messages="v$.outsidePC.$errors.map((e) => e.$message)"
            @input="v$.outsidePC.touch"
            @blur="v$.outsidePC.touch"
            color="text primary"
          >
            <v-radio label="Yes" value="true"></v-radio>
            <v-radio label="No" value="false"></v-radio>
          </v-radio-group>
        </v-form>
      </v-container>
      <v-container class="mt-0">
        <v-btn
          color="secondary"
          class="w-100 mx-auto ma-4"
          @click="validateForm"
          :disabled="!nameAvailable && passMatch ? true : false"
          >Save</v-btn
        >
        <v-btn color="accent" class="w-100 mx-auto ma-4" @click="out"
          >Cancel</v-btn
        >
      </v-container>
    </v-card>
  </v-container>
</template>
