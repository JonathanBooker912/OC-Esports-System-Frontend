<script setup>
const props = defineProps(["label", "data", "icon-name"]);
</script>
<template>
  <tr>
    <td>
      <v-icon class="pl-2 pr-5">{{ props.iconName }}</v-icon
      >{{ props.label }}
    </td>
    <td>{{ props.data }}</td>
  </tr>
</template>
