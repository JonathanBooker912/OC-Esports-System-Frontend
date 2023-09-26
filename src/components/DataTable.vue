<script setup>
import { ref, onMounted, computed } from "vue";

const filter = ref();
const itemsPerPage = ref(5);
const hasLoaded = ref(false);
const page = ref(1);

const props = defineProps({
  data: {
    type: Array,
    default: null,
  },
  // Define the columns dynamically with keys and labels
  columns: {
    type: Array,
    default: null,
  },
  // Other props...
  count: {
    type: Number,
    default: 0,
  },
  actions: {
    type: Array,
    default: null,
  },
});

const emitValues = ["search"];
props.actions
  .map((action) => action.event)
  .forEach((event) => emitValues.push(event));

const emit = defineEmits(["search", "action-event"]);

const changeItemsPerPage = () => {
  page.value = 1;
  search();
};

const totalItems = computed(() => {
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
  <v-card class="pa-6">
    <v-row class="justify-end">
      <v-text-field
        v-model="filter"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        style="max-width: 20%"
        name="Search"
        label="Search"
        @change="search"
      />
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
                v-for="action in props.actions"
                :key="action.label"
                class="mx-2"
                :color="
                  action.event.includes('delete') ? 'accent' : 'secondary'
                "
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
        v-model="itemsPerPage"
        style="max-width: 85px"
        class="mr-4"
        :items="[5, 10, 25, 50]"
        variant="outlined"
        label="Items Per Page"
        @update:model-value="changeItemsPerPage"
      />
      <v-pagination
        v-if="hasLoaded"
        v-model="page"
        class="w-auto mx-2"
        :length="totalItems"
        :total-visible="4"
        @update:model-value="search"
      />
    </v-row>
  </v-card>
</template>
<style scoped></style>
