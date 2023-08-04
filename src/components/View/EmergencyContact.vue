<script setup>
import { reactive, ref, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

const props = defineProps(["modelValue", "index"]);
const emit = defineEmits(["update:modelValue", "deleteContact"]);

const rules = reactive({
  fName: { required },
  lName: { required },
  phoneNumber: { required },
  relationship: { required },
});
function emitDelete() {
  emit("deleteContact");
}
const v$ = useVuelidate(rules, props.modelValue); // setup the vuelidate object
</script>

<template>
  <div>
    <v-card-title secondary class="d-flex align-center">
      Emergency Contact #{{ props.index + 1 }}
      <v-container class="w-auto justify-right" v-if="props.index != 0">
        <v-icon @click="emitDelete">mdi-trash-can</v-icon>
        <v-tooltip bottom activator="parent"> Remove Contact </v-tooltip>
      </v-container>
    </v-card-title>
    <v-text-field
      :name="'fNameContact' + props.index"
      label="Contact First Name"
      class="pa-2"
      v-model="props.modelValue.fName"
      :error-messages="v$.fName.$errors.map((e) => e.$message)"
      @input="v$.fName.$touch"
      @blur="v$.fName.$touch"
    ></v-text-field>

    <v-text-field
      :name="'lNameContact' + props.index"
      label="Contact Last Name"
      class="pa-2"
      v-model="props.modelValue.lName"
      :error-messages="v$.lName.$errors.map((e) => e.$message)"
      @input="v$.lName.$touch"
      @blur="v$.lName.$touch"
    ></v-text-field>

    <v-text-field
      :name="'phoneContact' + props.index"
      label="Contact Phone #"
      class="pa-2"
      v-model="props.modelValue.phoneNumber"
      :error-messages="v$.phoneNumber.$errors.map((e) => e.$message)"
      @input="v$.phoneNumber.$touch"
      @blur="v$.phoneNumber.$touch"
    ></v-text-field>

    <v-text-field
      :name="'relationshipContact' + props.index"
      label="Contact Relationship"
      class="pa-2"
      v-model="props.modelValue.relationship"
      :error-messages="v$.relationship.$errors.map((e) => e.$message)"
      @input="v$.relationship.$touch"
      @blur="v$.relationship.$touch"
    ></v-text-field>
  </div>
</template>
