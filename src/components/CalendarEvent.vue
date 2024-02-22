<script setup>
import {ref, computed} from "vue"
const props = defineProps({
  show: Boolean,
  data: {
    type: Object,
    // required: true,
  },
});

const height = computed(()=>{
  return `height: ${props.data.length * 35}px;`
})

const topOffset = computed(() => {
  return `margin-top: ${props.data.offset * 15}px;`
})

</script>

<template>
    <v-card class="w-100 minute-30" :style="height + topOffset" color="red">
              Event Text
    </v-card>
</template>

<style scoped>

</style>
