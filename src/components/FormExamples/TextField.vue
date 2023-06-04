<script setup>
const props = defineProps({
  id: { required: true },
  value: { required: true },
  label: { required: true },
  vuelidate: { required: true },
  readonly: { required: false },
});
</script>

<template>
  <v-text-field
    :name="props.id"
    :label="props.label"
    class="pa-2"
    v-model="props.value"
    :error-messages="props.vuelidate[props.id].$errors.map((e) => e.$message)"
    @input="props.vuelidate[props.id].$touch"
    @blur="props.vuelidate[props.id].$touch"
    :readonly="props.readonly"
  ></v-text-field>
</template>
