<script setup>
import { ref, onMounted, nextTick } from 'vue'
import FacilityStationServices from "../services/facilityStationServices.js"
import Calendar from "./CalendarTest.vue"
import ReservationDialog from "./ReservationDialog.vue"

const stations = ref([])
const dataLoaded = ref(false)
const scrollPane = ref(null)
const showDialog = ref(false)
const selectedEvent = ref(-1)

const getStations = () => {
    FacilityStationServices.getAll()
    .then((response) => {
        stations.value = response.data
        dataLoaded.value = true;
    })
}

const handleShow = (reservationID) => {
    console.log("show dialog", reservationID)
    showDialog.value = !showDialog.value
    selectedEvent.value = reservationID
}

onMounted(async () =>{
    getStations()
    await nextTick()
    scrollPane.value.$el.scrollTop = (52*10) // set scroll position
})
</script>

<template>
    <v-card >
        <v-table>
            <thead>
                <tr>
                    <td class="text-left" style="width: 73px;"></td>
                    <td v-for="station in stations" :key="station.id" class="pl-0" style="width:150px;">
                        {{station.name}}
                    </td>
                </tr>
            </thead>
        </v-table>
        <v-divider></v-divider>
        <v-row no-gutters class="scrollpane" ref="scrollPane">
        <v-table>

            <tbody>
                <tr :key="i" v-for="i in 23">
                    <td class="text-caption w-100 d-flex align-start">
                        {{i < 13 ? i : i - 12}}{{i > 11 ? 'pm' : 'am'}}
                    </td>
                </tr>
            </tbody>
        </v-table>
        <div v-for="station in stations" :key="station.id">
            <Calendar :station-id="station.id" @show-event="handleShow"/>
            <v-divider vertical/>
        </div>
        </v-row>
        <ReservationDialog :showDialog="showDialog" :reservation-id="selectedEvent"/>
    </v-card>
</template>

<style scoped>
.scrollpane {
  height: 70vh; /* Set the height to 80% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  border: 1px solid #ccc; /* Optional: Add a border for visual clarity */
}
</style>