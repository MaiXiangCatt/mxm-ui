<template>
  <div class="row">
    <mxm-dropdown :items="items">
      <mxm-button type="primary">
        Dropdown List
        <mxm-icon icon="angle-down" style="margin-left: 8px" />
      </mxm-button>
    </mxm-dropdown>
    <mxm-dropdown
      :items="items"
      type="primary"
      @click="handleClick"
      split-button
    >
      Dropdown List
    </mxm-dropdown>
  </div>
</template>


<script setup lang="ts">
import { type DropdownItemProps, MxmMessage } from "mxm-ui";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
  MxmMessage.info("button click");
}
</script>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>