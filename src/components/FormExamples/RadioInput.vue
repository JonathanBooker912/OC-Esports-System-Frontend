<script setup>
import { ref } from "vue";
const props = defineProps({
  id: { required: true },
  value: { required: true },
  items: { required: true },
  label: { required: true },
  vuelidate: { required: true },
  readonly: { required: false },
});

function out() {
  console.log(ahhh.value);
}

const ahhh = ref();
</script>

<template>
  <v-radio-group
    :id="props.id"
    :label="props.label"
    v-model="ahhh"
    class="pa-2"
    :items="props.items"
    :error-messages="props.vuelidate[props.id].$errors.map((e) => e.$message)"
    @input="props.vuelidate[props.id].$touch"
    @blur="props.vuelidate[props.id].$touch"
    @update:modelValue="out"
  >
    <v-radio
      v-for="option in items"
      :key="option"
      :label="option"
      :value="option"
    ></v-radio>
  </v-radio-group>
</template>
