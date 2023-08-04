<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import AliasServices from "../services/aliasServices.js";
import AliasComponent from "../components/View/AliasComponent.vue";

const aliases = ref({});
const message = ref("Add, Edit, or Delete Aliases");
const titles = ref({});

const props = defineProps({
  id: {
    required: true,
  },
});

const retrieveAliases = () => {
  AliasServices.getAllForUser(props.id)
    .then((response) => {
      aliases.value = response.data;
    })
    .catch((err) => {
      message.value = err.response.data.message;
    });
};

function deleteAlias() {}

function editAlias() {}

onMounted(() => {
  retrieveAliases();
});
</script>

<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Alias View</v-toolbar-title>
      </v-toolbar>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Title</th>
            <th class="text-left">GamerTag</th>
          </tr>
        </thead>
        <tbody>
          <AliasComponent
            v-for="alias in aliases"
            :key="alias.id"
            :alias="alias"
            :isAdd="False"
            @addAlias="retrieveAliases"
            @deleteAlias="deleteAlias"
          />
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>
