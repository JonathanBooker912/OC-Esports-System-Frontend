<script setup>
const props = defineProps({
  id: { required: true },
  value: { required: true },
  items: { required: true },
  label: { required: true },
  vuelidate: { required: true },
  readonly: { required: false },
});
</script>

<template>
  <v-combobox
    :id="props.id"
    :label="props.label"
    v-model="props.value"
    class="pa-2"
    :items="props.items"
    :error-messages="props.vuelidate[props.id].$errors.map((e) => e.$message)"
    @input="props.vuelidate[props.id].$touch"
    @blur="props.vuelidate[props.id].$touch"
  ></v-combobox>
</template>
