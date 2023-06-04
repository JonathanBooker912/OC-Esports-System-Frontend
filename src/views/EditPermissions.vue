<script>
import UserItem from "../components/UserItem.vue"
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/userServices.js"

const Users = ref({});

const getUsers = () => {
    UserServices.getAll()
    .then((response) =>
    Users.value = response.data
    )
    .catch((error) => 
    console.log(error))
};
</script>

<template>
  <div>
    <UserItem v-for="user in Users" 
    :key="user.id"
    :user="user"></UserItem>
  </div>
</template>

<style>

</style>