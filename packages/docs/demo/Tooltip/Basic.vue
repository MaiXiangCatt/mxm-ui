<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <mxm-tooltip
        class="box-item"
        content="Top Left prompts info"
        placement="top-start"
      >
        <mxm-button>top-start</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Top Center prompts info"
        placement="top"
      >
        <mxm-button>top</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Top Right prompts info"
        placement="top-end"
      >
        <mxm-button>top-end</mxm-button>
      </mxm-tooltip>
    </div>
    <div class="row">
      <mxm-tooltip
        class="box-item"
        content="Left Top prompts info"
        placement="left-start"
      >
        <mxm-button>left-start</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <mxm-button>right-start</mxm-button>
      </mxm-tooltip>
    </div>
    <div class="row">
      <mxm-tooltip
        class="box-item"
        content="Left Center prompts info"
        placement="left"
      >
        <mxm-button class="mt-3 mb-3">left</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Right Center prompts info"
        placement="right"
      >
        <mxm-button>right</mxm-button>
      </mxm-tooltip>
    </div>
    <div class="row">
      <mxm-tooltip
        class="box-item"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <mxm-button>left-end</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <mxm-button>right-end</mxm-button>
      </mxm-tooltip>
    </div>
    <div class="row center">
      <mxm-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <mxm-button>bottom-start</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <mxm-button>bottom</mxm-button>
      </mxm-tooltip>
      <mxm-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <mxm-button>bottom-end</mxm-button>
      </mxm-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>