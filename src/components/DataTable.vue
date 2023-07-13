<script setup>
import { ref, onMounted } from "vue";

defineProps(["data"]);
defineEmits(["edit-user", "delete-user"]);
</script>
<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <td class="text-left">First Name</td>
        <td class="text-left">Last Name</td>
        <td class="text-left">Email</td>
        <td class="text-center">Actions</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in data" :key="user.id">
        <td>{{ user.fName }}</td>
        <td>{{ user.lName }}</td>
        <td>{{ user.email }}</td>
        <td class="text-center">
          <v-btn @click="$emit('edit-user', user.id)">Edit</v-btn>
          <v-btn @click="$emit('delete-user', user.id)">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<style scoped></style>
