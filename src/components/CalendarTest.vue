<script setup>
import moment from "moment"
import { ref, nextTick, onMounted } from "vue"
import CalendarEvent from "./CalendarEvent.vue";
import FacilityReservationServices from "../services/facilityReservationServices.js"

const props = defineProps({
  show: Boolean,
  stationId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['show-event'])

const table = ref(null)
const showOverlay = ref(true)

const currentEvent = ref(0)

const data = ref([])

const reservations = ref([])

const getReservations = () => {
  FacilityReservationServices.getAllByFacilityStationId(props.stationId)
  .then((response) => {
    reservations.value = response.data

    reservations.value.forEach((reservation) => {
      const startTime = moment(reservation.startTime).utcOffset(0)
      reservation.startIndex = startTime.hour() - 1
    })

    for(let i = 0; i < 23; i++){
      let item = reservations.value.find((item) => item.startIndex == i)
      data.value.push(item || {id: (i * -1) -1})
    }
  })
}

const emitShow = (reservationID) => {
  emit('show-event', reservationID)
}

onMounted(()=> {
  getReservations()
})

</script>

<style scoped>
.table {
  border-bottom: 1px solid;
}
.eventCard{
  height: fill;
}
</style>

<template>
  <v-row no-gutters class="px-0">
      <v-table>

        <tbody>
          <tr :key="item.id" v-for="item in data">
  
            <td v-if="item.id >= 0" rowspan="1" class="d-flex align-top px-1" style="width:150px;">
              <CalendarEvent :data="item" @show-event="emitShow"/>
            </td>

            <td v-else style="width:150px;"></td>
          </tr>
        </tbody>
      </v-table>
      <v-divider thickness="2" vertical></v-divider>
  </v-row>
</template>