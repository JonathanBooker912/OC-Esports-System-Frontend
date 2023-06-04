<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const props = defineProps(["modelValue", "label"]);
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
  <v-radio-group
    v-model="data.fieldValue"
    class="pa-2"
    :error-messages="v$.fieldValue.$errors.map((e) => e.$message)"
    @input="v$.fieldValue.touch"
    @blur="v$.fieldValue.touch"
    @update:modelValue="emit('update:modelValue', data.fieldValue)"
    color="text primary"
  >
    <p>{{ props.label }}</p>
    <v-radio label="Yes" v-bind:value="true"></v-radio>
    <v-radio label="No" v-bind:value="false"></v-radio>
  </v-radio-group>
</template>
