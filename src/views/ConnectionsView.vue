<script setup lang="ts">
</script>

<template>
  <div class="connections-view">
    <h1>数据连接</h1>
    <div class="connections-content">
      <p>这里是数据连接页面，您可以在这里管理和配置数据源连接。</p>
      <div class="placeholder-box">数据连接列表将在这里显示</div>
    </div>
  </div>
</template>

<style scoped>
.connections-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.connections-content {
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
