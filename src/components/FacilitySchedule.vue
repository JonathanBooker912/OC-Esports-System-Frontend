<script setup>
import { ref, onMounted } from 'vue'
import FacilityStationServices from "../services/facilityStationServices.js"
import CalendarTest from  "./CalendarTest.vue"

const stations = ref([])
const dataLoaded = ref(false)

const getStations = () => {
    FacilityStationServices.getAll()
    .then((response) => {
        stations.value = response.data
        dataLoaded.value = true;
    })
}

onMounted(() =>{
    getStations()
})

</script>

<template>
    <div v-if="dataLoaded">
        <CalendarTest v-for="station in stations" :key="station.id"/>
    </div>
</template>