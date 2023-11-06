<script setup>
import PlayerMetricChart from "../components/Charts/PlayerMetricChart.vue";
</script>

<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Dashboard (WIP)</v-toolbar-title>
    </v-toolbar>
    <v-col class="w-50">
      <PlayerMetricChart :alias-id="1" :metric-id="11" />
      <PlayerMetricChart :alias-id="1" :metric-id="18" />
      <PlayerMetricChart :alias-id="1" :metric-id="19" />
    </v-col>
  </v-container>
</template>
