<script setup lang="ts">
</script>

<template>
  <div class="settings-view">
    <h1>系统设置</h1>
    <div class="settings-content">
      <p>这里是系统设置页面，您可以在这里配置规则引擎的全局设置项。</p>
      <div class="placeholder-box">设置选项将在这里显示</div>
    </div>
  </div>
</template>

<style scoped>
.settings-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.settings-content {
  margin-top: 20px;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  flex: 1;
  overflow: auto;
}

.placeholder-box {
  margin-top: 20px;
  padding: 40px;
  background-color: #f9f9f9;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  text-align: center;
  color: #606266;
}
</style>
