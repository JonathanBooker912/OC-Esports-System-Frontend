<script setup>
import { ref, onMounted } from "vue";
import userServices from "../services/userServices";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const user = ref({});
const props = defineProps({
  userId: {
    required: true,
  },
});

function getPlayerInfo() {
  userServices
    .get(props.userId)
    .then((response) => {
      user.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  getPlayerInfo();
});
</script>
<template>
  <div>
    <v-form class="container">
      <v-text-field v-model="user.fName" label="First Name"></v-text-field>
      <v-text-field v-model="user.lName" label="Last Name"></v-text-field>
      <v-text-field
        v-model="user.phoneNumber"
        label="Phone Number"
      ></v-text-field>
      <v-text-field v-model="user.email" label="Email"></v-text-field>
      <v-text-field v-model="user.address" label="Address"></v-text-field>
      <v-select v-model="user.shirtSize" label="Shirt Size"></v-select>
      <v-select v-model="user.pantSize" label="Pant Size"></v-select>
      <v-checkbox v-model="user.outsidePC" label="Outside PC?"></v-checkbox>
      <v-checkbox v-model="user.fullVacc" label="Full Vacc"></v-checkbox>
      <v-text-field
        v-model="user.classification"
        label="Classification"
      ></v-text-field>
      <v-text-field v-model="user.role" label="Role"></v-text-field>
      <v-btn></v-btn>
    </v-form>
  </div>
</template>
<style scoped>
.container {
  width: 70%;
  height: 70%;
}
</style>
