<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home-view">
    <h1>首页</h1>
    <div class="dashboard-content">
      <p>欢迎使用规则引擎管理系统！</p>
      <div class="dashboard-cards">
        <div class="card">
          <h3>规则统计</h3>
          <div class="card-content">
            <p>当前共有27条规则</p>
          </div>
        </div>
        <div class="card">
          <h3>测试数据</h3>
          <div class="card-content">
            <p>本周已执行120次测试</p>
          </div>
        </div>
        <div class="card">
          <h3>系统状态</h3>
          <div class="card-content">
            <p>所有服务运行正常</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.home-view {
  width: 100%;
  min-width: 100%;
}

.dashboard-content {
  margin-top: 20px;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  width: 100%;
}

.dashboard-cards {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 250px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  padding: 15px;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #409EFF;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.card-content {
  font-size: 16px;
}
</style>
