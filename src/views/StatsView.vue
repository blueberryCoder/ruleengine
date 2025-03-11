<script setup lang="ts">
</script>

<template>
  <div class="stats-view">
    <h1>统计分析</h1>
    <div class="stats-content">
      <p>这里是统计分析页面，您可以在这里查看规则执行的统计数据和分析结果。</p>
      <div class="placeholder-box">统计图表将在这里显示</div>
    </div>
  </div>
</template>

<style scoped>
.stats-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stats-content {
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
