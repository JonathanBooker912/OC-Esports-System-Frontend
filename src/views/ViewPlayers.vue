<script setup>
import UserServices from "../services/userServices.js";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";

const users = ref([]);
const itemsPerPage = ref(5);
const headers = ref([
  { title: "Users", align: "start", sortable: false, key: "id" },
  { title: "First Name", align: "end", key: "fName" },
  { title: "Last Name", align: "end", key: "lName" },
  ,
  { title: "Email", align: "end", key: "email" },
]);

const getUsers = () => {
  UserServices.getAll()
    .then((response) => {
      users.value = response.data;
    })
    .catch((err) => {
      // Create UI to add visual error checking
      console.log(err);
    });
};
onMounted(() => {
  getUsers();
});
</script>
<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="users"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<style scoped></style>
