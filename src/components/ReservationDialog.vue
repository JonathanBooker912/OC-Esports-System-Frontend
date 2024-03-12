<script setup>
import moment from "moment"
import { ref, onMounted, computed, watch } from "vue"
import FacilityReservationServices from "../services/facilityReservationServices.js"

const props = defineProps({
    showDialog: {
        type: Boolean,
        default: false,
    },
    reservationId: {
        type: Number,
        required: true
    }
})

const show = ref(false)
const loading = ref(true)
const reservationInfo = ref(null)

watch(props, async () => {
    if(props.reservationId > 0){
        await getReservation()
        show.value = true
    }
})

const getReservation = async () => {
    await FacilityReservationServices.getById(props.reservationId)
    .then((response) => {
        reservationInfo.value = response.data
        reservationInfo.value.startTime = moment(reservationInfo.value.startTime).utcOffset(0)
        reservationInfo.value.endTime = moment(reservationInfo.value.endTime).utcOffset(0)

        loading.value = false
    })
}

const backgroundColor = computed(() => {
    return `background-color: ${reservationInfo.value.team.teamColor};`
})

const startTime = computed(() => {
    return reservationInfo.value.startTime.format('h:mm a')
})
const endTime = computed(() => {
    return reservationInfo.value.endTime.format('h:mm a')
})

onMounted(() => {
    show.value = props.showDialog
})
</script>

<template>
    <v-dialog v-model="show" contained>
        <v-card>
            <div v-if="!loading">
                <v-card-title :style="backgroundColor"/>
                <v-card-title>
                    {{reservationInfo.team.name}}: {{ reservationInfo.reservationType}}
                </v-card-title>
                <v-card-text>
                    {{startTime}} - {{endTime}}
                </v-card-text>
            </div>
        </v-card>
    </v-dialog>
</template>
