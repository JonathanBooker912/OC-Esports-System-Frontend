<script setup>
import { ref, onMounted } from "vue";
import userServices from "../services/userServices";

const user = ref({});
const props = defineProps({
  userId: {
    required: true,
  },
});

function getPlayerInfo() {
  userServices
    .get(props.userId)
    .then((response) => {
      user.value = response.data;
      console.log(user.value);
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  getPlayerInfo();
});
</script>
<template>
  <div>
    <!--Need to create a form for this-->
  </div>
</template>
