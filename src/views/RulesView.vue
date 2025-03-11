<script setup lang="ts">
</script>

<template>
  <div class="rules-view">
    <h1>规则管理</h1>
    <div class="rules-content">
      <p>这里是规则管理页面，您可以在这里创建、编辑和管理规则。</p>
      <div class="placeholder-box">规则列表将在这里显示</div>
    </div>
  </div>
</template>

<style scoped>
.rules-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.rules-content {
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

h1 {
  margin: 0;
  margin-bottom: 10px;
}
</style>
