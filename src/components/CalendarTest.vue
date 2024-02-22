<template>

    <v-table>

      <tbody>
        <tr :key="item.id" v-for="item in data">
 
          <td v-if="item.id >= 0" rowspan="1" class="d-flex align-top" >
            <CalendarEvent :data="item"/>
          </td>

          <td v-else></td>
        </tr>
      </tbody>
    </v-table>

</template>

<script setup>
import { ref, nextTick, onMounted } from "vue"
import CalendarEvent from "./CalendarEvent.vue";

const table = ref(null)
const showOverlay = ref(true)
const events = ref([
  {
    id: 1,
    startIndex: 6,
    length: 3,
    offset: 2
  },
  {
    id: 2,
    startIndex: 10,
    length: 2,
    offset: 1
  },
  {
    id: 3,
    startIndex: 12,
    length: 7,
    offset: 3
  },
])

const currentEvent = ref(0)

const data = ref([])

onMounted(()=> {
  for(let i = 0; i < 23; i++){
    let item = events.value.find((item) => item.startIndex == i)
    data.value.push(item || {id: (i * -1) -1})
  }
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