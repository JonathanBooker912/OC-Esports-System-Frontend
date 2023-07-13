<script setup>
import UserServices from "../services/userServices.js";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import DataTable from "../components/DataTable.vue";

const router = useRouter();
const users = ref([]);
const itemsPerPage = ref(5);
const headers = ref([
  { title: "Users", align: "start", sortable: false, key: "id" },
  { title: "First Name", align: "end", key: "fName" },
  { title: "Last Name", align: "end", key: "lName" },
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

const editUser = (userId) => {
  router.push({ name: "editUsers", params: { userId: userId } });
};

function deleteUser(id) {}
</script>
<template>
  <div>
    <DataTable :data="users" @edit-user="editUser"></DataTable>
  </div>
</template>
<style scoped></style>
