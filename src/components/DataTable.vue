<script setup>
import { ref, onMounted, computed } from "vue";

const filter = ref();
const itemsPerPage = ref(5);
const hasLoaded = ref(false);
const page = ref(1);

const props = defineProps(["data", "count"]);
const emit = defineEmits(["search", "view-user"]);

const length = computed(() => {
  return props ? Math.ceil(props.count / itemsPerPage.value) : 0;
});

function search() {
  emit("search", filter.value, itemsPerPage.value, page.value);
}

onMounted(() => {
  hasLoaded.value = true;
});
</script>
<template>
  <div style="padding: 20px">
    <v-row style="justify-content: space-between">
      <v-select
        style="max-width: 20%"
        v-model="itemsPerPage"
        :items="[5, 10, 25, 50]"
        @update:modelValue="search"
      >
      </v-select>
      <v-text-field
        variant="outlined"
        style="max-width: 20%"
        name="Search"
        @change="search"
        v-model="filter"
        label="Search"
      ></v-text-field>
    </v-row>
    <v-row style="justify-content: center">
      <v-table v-if="props.data.length != 0">
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
              <v-btn @click="$emit('view-user', user.id)">View More</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <p v-else>No Results Found</p>
    </v-row>
    <v-row style="justify-content: right">
      <v-pagination
        class="w-25"
        v-if="hasLoaded"
        :length="length"
        v-model="page"
        @update:modelValue="search"
      ></v-pagination>
    </v-row>
  </div>
</template>
<style scoped></style>
