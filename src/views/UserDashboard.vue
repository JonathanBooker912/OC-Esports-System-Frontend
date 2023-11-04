<script setup>
import { onMounted } from "vue"
import MetricChart from "../components/MetricChart.vue"

const averageAccuracy = [
  {
    id: 1,
    value: "97.2",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-03-15"
  },
  {
    id: 2,
    value: "88.6",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-04-21"
  },
  {
    id: 3,
    value: "81.4",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-02-10"
  },
  {
    id: 4,
    value: "76.9",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-04-05"
  },
  {
    id: 5,
    value: "92.3",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-05-12"
  },
  {
    id: 6,
    value: "75.6",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-03-29"
  },
  {
    id: 7,
    value: "84.7",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-02-18"
  },
  {
    id: 8,
    value: "79.1",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-05-03"
  },
  {
    id: 9,
    value: "77.5",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-01-27"
  },
  {
    id: 10,
    value: "89.8",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-04-14"
  },
  {
    id: 11,
    value: "95.0",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-03-05"
  },
  {
    id: 12,
    value: "76.4",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-05-09"
  },
  {
    id: 13,
    value: "80.2",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-02-15"
  },
  {
    id: 14,
    value: "88.5",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-04-30"
  },
  {
    id: 15,
    value: "79.7",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-03-08"
  },
  {
    id: 16,
    value: "85.3",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-02-27"
  },
  {
    id: 17,
    value: "76.8",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-05-18"
  },
  {
    id: 18,
    value: "75.1",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-01-13"
  },
  {
    id: 19,
    value: "87.6",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-04-02"
  },
  {
    id: 20,
    value: "93.4",
    metricId: 11,
    metricName: "Avg Accuracy",
    date: "2023-03-20"
  }
];

</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Dashboard (WIP)</v-toolbar-title>
    </v-toolbar>
    <v-card class="w-25 mt-4">
      <v-card-title class="left"> Incomplete Tasks </v-card-title>
      <v-list lines="one">
        <v-list-item> Task A </v-list-item>
        <v-list-item> Task B </v-list-item>
        <v-list-item> Task C </v-list-item>
      </v-list>
      <!-- <v-action>
        <v-btn class="ma-3"> View All </v-btn>
      </v-action> -->
    </v-card>
  <MetricChart :dataPoints="averageAccuracy"/>
  </v-container>
</template>
