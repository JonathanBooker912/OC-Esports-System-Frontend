<script setup>
import PlayerMetricChartList from "../components/PlayerMetricChartList.vue";
</script>

<template>
  <v-container>
    <h1>Player Statistics</h1>
    <v-row>
      <v-col cols="4">
     
      </v-col>
      <v-col class="w-75 float-right">
        <PlayerMetricChartList :alias-id="1" :title-id="1"/>
      </v-col>
    </v-row>
  </v-container>
</template>
