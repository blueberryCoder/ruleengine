<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, computed, onMounted, reactive, h, watch } from "vue";
// Import Element Plus components
import ElementPlus from 'element-plus'
import { ElMenu, ElMenuItem, ElSubMenu, ElMenuItemGroup, ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
// Import icons
import {
  Document,
  Menu,
  Location,
  Setting,
  House,
  Histogram,
  Lock,
  CircleCheck,
  Connection
} from '@element-plus/icons-vue'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';

import { useRouter, useRoute } from 'vue-router'

// 获取路由实例
const router = useRouter()
const route = useRoute()

// Define the active menu item based on current route
const activeIndex = ref('1')
// Define if sidebar is collapsed
const isCollapsed = ref(false)

// Function to toggle sidebar collapse
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

// 处理菜单项点击事件
function handleMenuClick(path: string) {
  console.log('jump to ' + path)
  router.push(path)
}

// Rule Engine related data
const menuItems = [
  { id: '1', icon: House, title: '首页', path: '/' },
  { id: '2', icon: Document, title: '规则管理', path: '/rules' },
  { id: '3', icon: CircleCheck, title: '规则测试', path: '/test' },
  { id: '4', icon: Histogram, title: '统计分析', path: '/stats' },
  { id: '5', icon: Connection, title: '数据连接', path: '/connections' },
  { id: '6', icon: Setting, title: '系统设置', path: '/settings' }
]

const items = reactive(
  [
    {
      key: '1',
      icon: () => h(PieChartOutlined),
      label: '首页',
      title: '首页',
      path: '/',
      onClick: function () { handleMenuClick('/') }
    },
    {
      key: '2',
      icon: () => h(MailOutlined),
      label: '规则管理',
      path: '/rules',
      onClick: function () { handleMenuClick('/rules') }
    },
    {
      key: '3',
      icon: () => h(MailOutlined),
      label: '规则测试',
      path: '/test',
      onClick: function () { handleMenuClick('/test') }
    },
    {
      key: '4',
      icon: () => h(MailOutlined),
      label: '统计分析',
      path: '/stats',
      onClick: function () { handleMenuClick('/stats') }
    },
    {
      key: '5',
      icon: () => h(MailOutlined),
      label: '数据连接',
      path: '/connections',
      onClick: function () { handleMenuClick('/connections') }
    },
    {
      key: '6',
      icon: () => h(MailOutlined),
      label: '系统设置',
      path: '/settings',
      onClick: function () { handleMenuClick('/settings') },
      children: [
        {
          key: '6-1',
          label: '用户管理',
          path: '/settings/users',
          onClick: function () { handleMenuClick('/settings/users') }
        },
        {
          key: '6-2',
          label: '角色管理',
          path: '/settings/roles',
          onClick: function () { handleMenuClick('/settings/roles') }
        }
      ]
    }
  ]
)

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['1'],
  preOpenKeys: ['2'],
});

// 根据当前路由路径设置激活的菜单项
onMounted(() => {
  const currentPath = route.path
  const menuItem = menuItems.find(item => item.path === currentPath)
  if (menuItem) {
    activeIndex.value = menuItem.id
  }
})
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>

<template>
  <a-layout style="height: 100%; width: 100%;">
    <a-layout-sider 
    :width="264" 
    :collapseWidth="80" v-model:collapsed="state.collapsed" >
    <div class="logo-container">
      <img src="@/assets/logo.svg" alt="logo" class="logo-image">
      <h1 v-if="!state.collapsed" class="logo-title">Rule Engine</h1>
    </div>
      <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="state.collapsed" :style="{ width: '100%',height: '100%' }" :items="items">
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="site-layout-header">
        <div class="header-container">
          <div class="left-section">
            <a-button 
            @click="toggleCollapsed" 
            class="toggle-button"
            type="text">
              <MenuUnfoldOutlined v-if="state.collapsed" />
              <MenuFoldOutlined v-else />
            </a-button>
         </div>
          <div class="user-info">
            <span>管理员</span>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <!-- Main Content -->
        <div class="content-wrapper">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>

<style>
/* 添加全局样式重置，确保没有默认边距和填充 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f0f2f5;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<style scoped>
.app-container {
  background-color: red;

}

.sidebar {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 100%;
  background-color: #304156;
  color: #bfcbd9;
  transition: width 0.3s;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.toggle-button {
  align-self: flex-start;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.sidebar-menu {
  /* flex: 1; */
  width: 100%;
}

.main-content {
  flex: 1;
  width: calc(100% - 264px);
  /* left: 64px; */
  transition: width 0.3s, left 0.3s;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 20px;
  height: 64px;
}

.logo {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.sidebar-header h2 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  white-space: nowrap;
}

.collapse-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  color: #bfcbd9;
  border-bottom: 1px solid #1f2d3d;
  margin-bottom: 10px;
}

.sidebar-menu {
  border-right: none;
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: calc(100% - 64px);
  position: absolute;
  left: 64px;
  top: 0;
  bottom: 0;
  right: 0;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  flex-shrink: 0;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  width: 100%;
  z-index: 1;
}

.main-header h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
}

/* 
 * 新的内容包裹器样式 - 不设置最大宽度限制，完全占满空间 
 */
.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: #f0f2f5;
  width: 100%;
  height: calc(100% - 64px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Reset Element Plus styles */
:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-menu-item),
:deep(.el-submenu__title) {
  height: 50px;
  line-height: 50px;
}

:deep(.ant-layout-content) {
  padding: 16px;
  overflow-y: auto;
}

/* 添加logo容器样式 */
.logo-container {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #001529;
  transition: all 0.3s;
}

.logo-image {
  height: 32px;
  width: 32px;
  margin-right: 16px;
  margin-left: 16px;
}

.logo-title {
  color: white;
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.3s;
}

/* 头部样式 */
:deep(.ant-layout-header) {
  background: white;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.site-layout-header {
  height: 64px;
  padding: 0;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.left-section {
  display: flex;
  align-items: center;
}

.site-title {
  margin: 0 0 0 16px;
  font-size: 18px;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
}

.toggle-button {
  margin-right: 16px;
  font-size: 16px;
}

:deep(.ant-btn.toggle-button) {
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 4px 8px;
}

:deep(.ant-btn.toggle-button:hover) {
  color: #1890ff;
  background: transparent;
}

:deep(.ant-btn.toggle-button:focus) {
  outline: none;
  box-shadow: none;
}
</style>
