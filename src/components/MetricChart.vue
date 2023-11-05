<script setup>
import { onMounted, ref } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import dataPointParser from "../utils/metricParser.js";

const data = ref([]);
const dataLoaded = ref(false);

const props = defineProps({
  dataPoints: {
    type: Array,
    default: null,
  },
  metricName: {
    type: String,
    default: "",
  },
});

const chartData = {
  labels: [],
  datasets: [
    {
      label: props.metricName,
      data: [],
      borderColor: "#80162B",
      backgroundColor: "#80162B",
      tension: 0.2,
    },
  ],
};

const chartOptions = {
  responsive: true,
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
);

const processData = () => {
  data.value.forEach((dataPoint) => {
    const parsedData = dataPointParser(dataPoint, "Float");
    chartData.labels.push(parsedData.id);
    chartData.datasets[0].data.push(parsedData.value);
  });
};

const sortData = () => {
  data.value.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Compare the dates and return the comparison result
    return dateA - dateB;
  });
};

onMounted(() => {
  data.value = props.dataPoints;
  sortData();
  processData();
  dataLoaded.value = true;
});
</script>

<template>
  <v-card v-if="dataLoaded" class="w-50 ma-2">
    <v-card-title>{{ props.metricName }}</v-card-title>
    <Line :options="chartOptions" class="ma-3" :data="chartData" />
  </v-card>
</template>
