<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMenuStore } from "../stores/dataTableStore.js";

const store = useMenuStore();
const { itemsPerPage, page } = storeToRefs(store);
const filter = ref();
const hasLoaded = ref(false);

const props = defineProps({
  data: Array,
  // Define the columns dynamically with keys and labels
  columns: Array,
  // Other props...
  count: Number,
  actions: Array,
});

const emitValues = ["search"];
props.actions
  .map((action) => action.event)
  .forEach((event) => emitValues.push(event));

const emit = defineEmits(["search", "action-event", "reload"]);

const changeItemsPerPage = () => {
  search();
}

const totalItems = computed(() => {
  return props ? Math.ceil(props.count / itemsPerPage.value) : 0;
});

function search() {
  emit("search", filter.value);
}

function reload() {
  emit("reload");
}

onMounted(() => {
  hasLoaded.value = true;
});
</script>

<template>
  <v-card class="pa-6">
    <v-row class="justify-space-between">
      <v-btn 
      @click="reload"
      name="Reload"
      style="max-width: 15%;"
      variant="outlined"
      prepend-icon="mdi-refresh">Reload</v-btn>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        style="max-width: 20%"
        name="Search"
        @change="search"
        v-model="filter"
        label="Search"
      ></v-text-field>
    </v-row>
    <v-row style="justify-content: center">
      <v-table v-if="data.length !== 0">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" class="text-left">
              {{ column.label }}
            </th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td v-for="column in columns" :key="column.key">
              {{ item[column.key] }}
            </td>
            <td class="text-center">
              <v-btn
                class="mx-2"
                :color="
                  action.event.includes('delete') ? 'accent' : 'secondary'
                "
                v-for="action in props.actions"
                :key="action.label"
                @click="
                  $emit('action-event', {
                    event: action.event,
                    value: item.id,
                  })
                "
              >
                {{ action.label }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <p v-else>No Results Found</p>
    </v-row>
    <v-row class="justify-end mt-10">
      <v-select
        style="max-width: 85px"
        class="mr-4"
        v-model="itemsPerPage"
        :items="[5, 10, 25, 50]"
        @update:modelValue="changeItemsPerPage"
        variant="outlined"
        label="Items Per Page"
      >
      </v-select>
      <v-pagination
        class="w-auto mx-2"
        v-if="hasLoaded"
        :length="totalItems"
        v-model="page"
        @update:modelValue="search"
        :total-visible="4"
      ></v-pagination>
    </v-row>
  </v-card>
</template>
<style scoped></style>
