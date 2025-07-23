<template>
  <div class="row">
    <mxm-dropdown :items="items" size="large" split-button>
      Large List
    </mxm-dropdown>
    <mxm-dropdown :items="items" split-button> Default List </mxm-dropdown>
    <mxm-dropdown :items="items" size="small" split-button>
      small List
    </mxm-dropdown>
  </div>
</template>

<script setup lang="ts">
import { type DropdownItemProps } from "mxm-ui";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];
</script>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>