<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">    
    <mxm-alert type="primary">Primary alert</mxm-alert>
    <mxm-alert type="success">Success alert</mxm-alert>
    <mxm-alert type="info">Info alert</mxm-alert>
    <mxm-alert type="warning">Warning alert</mxm-alert>
    <mxm-alert type="danger">Error alert</mxm-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <mxm-alert type="primary" title="Primary alert" />
    <mxm-alert type="success" title="Success alert" />    
    <mxm-alert type="info" title="Info alert" />
    <mxm-alert type="warning" title="Warning alert" />
    <mxm-alert type="danger" title="Error alert" />
  </div>
</template>