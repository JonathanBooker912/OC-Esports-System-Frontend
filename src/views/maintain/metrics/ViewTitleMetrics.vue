<script setup>
import MetricServices from "../../../services/metricServices.js";
import { ref, onMounted } from "vue";
import { required } from "@vuelidate/validators";
import FormValidator from "../../../components/FormComponents/support/FormValidator";

import DataTable from "../../../components/DataTable.vue";
import ConfirmAction from "../../../components/ConfirmAction.vue";
import TextField from "../../../components/FormComponents/TextField.vue";
import ComboBox from "../../../components/FormComponents/ComboBox.vue"

const validator = new FormValidator();

const props = defineProps({
  titleId: {
    type: Number,
    default: -1,
  },
  dataTypes: {
    type: Array,
    default: []
  },
  metricTypes: {
    type: Array,
    default: []
  }
});

const validateForm = async () => {
  if (await validator.isFormValid()) {
    updateMetric();
    dialog.value = false;
  } else {
    return;
  }
};

const metrics = ref([]);
const count = ref(5);

const dialog = ref(false);
const showConfirm = ref(false);

const selectedMetric = ref({});
const metricToDelete = ref(null);

const errorMsg = ref("");
const showError = ref(false);

const actions = [
  { label: "Edit", event: "edit-team" },
  { label: "Delete", event: "delete-team" },
];

const handleActionEvent = (payload) => {
  if (payload.event == "edit-team") viewMetric(payload.value);

  if (payload.event == "delete-team") {
    metricToDelete.value = payload.value;
    showConfirmDialog();
  }
};

const showConfirmDialog = () => {
  showConfirm.value = !showConfirm.value;
};

const getMetrics = (itemsPerPage, page) => {
  MetricServices.getMetricsForTitle(props.titleId)
    .then((response) => {
      metrics.value = response.data;
      count.value = response.data.length;
    })
    .catch((err) => {
      // Create UI to add visual error checking
      console.log(err);
    });
};

async function getMetricForId(metricId) {
  await MetricServices.getMetric(metricId)
    .then((response) => {
      selectedMetric.value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

const search = (filter, itemsPerPage, page) => {
  if (filter == "" || filter == null) {
    getMetrics(itemsPerPage, page);
  } else {
    MetricServices.search(filter, itemsPerPage, page)
      .then((response) => {
        metrics.value = response.data.rows;
        count.value = response.data.count;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const viewMetric = async (metricId) => {
  await getMetricForId(metricId);
  dialog.value = true;
};

const deleteMetric = () => {
  MetricServices.deleteMetric(metricToDelete.value)
    .then((response) => {
      getMetrics(5, 1);
    })
    .catch((error) => {
      console.log(error)
      errorMsg.value = error.response.data.message;
      showError.value = true;
    });
  showConfirmDialog();
};

const updateMetric = () => {
  const updatedMetric = {...selectedMetric.value};

  MetricServices.updateMetric(selectedMetric.value.id, updatedMetric)
    .then(() => {
      getMetrics(5, 1);
    })
    .catch((error) => {
      console.error("Error updating team:", error);
      // Handle the error, like showing an error message
    });
};

onMounted(() => {
  getMetrics(5, 1);
});
</script>

<template>
  <div>
    <DataTable
      :data="metrics"
      :count="count"
      :columns="[
        { key: 'name', label: 'Name' },
        { key: 'metricType', label: 'Metric Type' },
        { key: 'dataType', label: 'Data Type' },
      ]"
      :actions="actions"
      @action-event="handleActionEvent"
      @search="search"
    />
    <ConfirmAction
      :show="showConfirm"
      action="Delete"
      @action="deleteMetric"
      @cancel="showConfirmDialog"
    />
    <div class="text-center">
      <v-dialog v-model="dialog" class="w-50">
        <v-card v-if="dialog">
          <v-toolbar color="primary" title="Edit Team">
            <v-btn icon="mdi-arrow-left" @click="dialog = false" />
          </v-toolbar>
          <v-card-text>
            <TextField
              v-model="selectedMetric.name"
              label="Team Name"
              :validators="{ required }"
            />
            <ComboBox
              v-model="selectedMetric.metricType"
              :items="props.metricTypes"
              label="Metric Type"
              :validators="{ required }"
            />
            <ComboBox
              v-model="selectedMetric.dataType"
              :items="props.dataTypes"
              label="Data Type"
              :validators="{ required }"
            />
          </v-card-text>
          <div class="text-center">
            <v-btn color="primary" class="ma-4" @click="validateForm">
              Save
            </v-btn>
            <v-btn class="ma-4" @click="dialog = false"> Cancel </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="showError" width="auto">
      <v-card>
        <v-card-text>
          {{ errorMsg }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="showError = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
