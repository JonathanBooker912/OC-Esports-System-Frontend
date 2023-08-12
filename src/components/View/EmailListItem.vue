<script setup>
import { ref, onMounted } from "vue";
import TextField from "../FormComponents/TextField.vue";
import { required, email } from "@vuelidate/validators";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue", "emailRemoved"]);

const isMounted = ref(false);
const emailValue = ref("");

onMounted(() => {
  emailValue.value = props.modelValue;
  isMounted.value = true;
});
</script>

<template>
  <v-row v-if="isMounted" class="align-center">
    <TextField
      label="Email"
      v-model="emailValue"
      :validators="{ required, email }"
      @update:modelValue="emit('update:modelValue', emailValue)"
    />
    <v-icon class="pb-5" @click="emit('emailRemoved')"> mdi-close </v-icon>
  </v-row>
</template>
