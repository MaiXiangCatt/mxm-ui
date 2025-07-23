<template>
  <mxm-button @click="() => dropdownRef?.open()">open</mxm-button>
  <mxm-button @click="() => dropdownRef?.close()">close</mxm-button>
  <br />
  <mxm-dropdown ref="dropdownRef" :items="items" manual>
    <span class="dropdown-link">
      Dropdown List
      <er-icon icon="angle-down" />
    </span>
  </mxm-dropdown>
</template>

<script setup lang="ts">
import type { DropdownItemProps, DropdownInstance } from "mxm-ui";
import { ref } from "vue";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];
const dropdownRef = ref<DropdownInstance>();
</script>

<style scoped>
.dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--mxm-color-primary);
  margin-top: 20px;
  i {
    margin-left: 8px;
  }
}
</style>