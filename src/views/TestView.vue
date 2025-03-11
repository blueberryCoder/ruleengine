<script setup lang="ts">
</script>

<template>
  <div class="test-view">
    <h1>规则测试</h1>
    <div class="test-content">
      <p>这里是规则测试页面，您可以在这里测试规则的执行效果。</p>
      <div class="placeholder-box">测试界面将在这里显示</div>
    </div>
  </div>
</template>

<style scoped>
.test-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.test-content {
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
