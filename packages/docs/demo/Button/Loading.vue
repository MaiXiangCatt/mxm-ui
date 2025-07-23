<template>
  <div>
    <mxm-button type="primary" loading>Loading</mxm-button>
    <mxm-button type="primary" loading loading-icon="circle-notch">Loading</mxm-button>
    <mxm-button type="primary" loading>
      <template #loading>
        <mxm-icon icon="moon" spin style="margin-right: 6px;"></mxm-icon>
      </template>
      Loading
    </mxm-button>
  </div>
</template>