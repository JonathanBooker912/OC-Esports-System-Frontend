<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";

const props = defineProps(["modelValue", "label", "items", "validators"]);

const emit = defineEmits(["update:modelValue"]);

const isMounted = ref(false);

const data = ref({});
const rules = reactive({});

let v$;

onMounted(() => {
  data.value[props.label] = props.modelValue;
  rules[props.label] = props.validators;

  isMounted.value = true;
  v$ = useVuelidate(rules, data);
});
</script>

<template>
  <v-combobox
    v-if="isMounted"
    class="pa-2"
    :name="props.label"
    :label="props.label"
    :items="props.items"
    v-model="data[props.label]"
    :error-messages="v$[props.label].$errors.map((e) => e.$message)"
    @input="v$[props.label].$touch"
    @blur="v$[props.label].$touch"
    @update:modelValue="emit('update:modelValue', data[props.label])"
  ></v-combobox>
</template>
