<script setup>
import Calendar from "./CalendarTest.vue"
</script>

<template>
    <v-card class="scrollpane">
        <v-row no-gutters>
        <v-table>


            <tbody>
                <tr :key="i" v-for="i in 23">
                    <td>
                        {{i < 13 ? i : i - 12}}{{i > 11 ? 'pm' : 'am'}}
                    </td>
                </tr>
            </tbody>
        </v-table>
        <Calendar />
        <v-divider vertical/>
        <Calendar />
        <v-divider vertical/>
        <Calendar />

        </v-row>
    </v-card>
</template>

<style scoped>
.scrollpane {
  height: 80vh; /* Set the height to 80% of the viewport height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  border: 1px solid #ccc; /* Optional: Add a border for visual clarity */
}
</style>