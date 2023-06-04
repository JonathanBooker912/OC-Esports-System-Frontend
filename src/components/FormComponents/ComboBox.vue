<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(["modelValue", "label", "items"]);
const data = ref({
  fieldValue: "",
});

const emit = defineEmits(["update:modelValue"]);

const rules = reactive({
  fieldValue: { required },
});

const v$ = useVuelidate(rules, data);

onMounted(() => {
  data.value.fieldValue = props.modelValue;
});
</script>

<template>
  <v-combobox
    :name="props.label"
    :label="props.label"
    v-model="data.fieldValue"
    class="pa-2"
    :items="props.items"
    :error-messages="v$.fieldValue.$errors.map((e) => e.$message)"
    @input="v$.fieldValue.$touch"
    @blur="v$.fieldValue.$touch"
    @update:modelValue="emit('update:modelValue', data.fieldValue)"
  ></v-combobox>
</template>
