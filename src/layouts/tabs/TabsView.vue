<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref, computed, onMounted, reactive, h, watch } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
import TabsHead from './TabsHead.vue'
import { message } from 'ant-design-vue'; // 引入message组件
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import options from '../../router/config'
const pageList = ref<{ path: string, title: string }[]>([])

// 获取路由实例
const router = useRouter()
const menuItem = parseRouterConfig(options)


const items = reactive(
  menuItem
);

const state = reactive({
  collapsed: false,
  selectedKeys: [items[0].key],
  openKeys: [items[0].key],
  preOpenKeys: [items[0].key],
});

// parse router config to menu
function parseRouterConfig(options: any): any[] {

  const homeRoute = options['routes'].find((route: any) => {
    return route.path === '/'
  })

  const menuItem = homeRoute['children'].map((route: any) => {
    // 顶级路由使用绝对路径
    const fullPath = route.path.startsWith('/') ? route.path : `/${route.path}`
    return mapRouterToPage(route, fullPath)
  })
  return menuItem;
}

function mapRouterToPage(route: any, fullPath: string): any {
  return {
    key: fullPath,
    label: route.name,
    path: fullPath,
    title: route.name,
    icon: () => h(PieChartOutlined),
    onClick: function () {
      if (!route.children) {
        handleMenuClick(fullPath)
      }
    },
    children: route.children?.map((child: any) => {
      // 子路由路径基于父路由的完整路径
      const childPath = child.path.startsWith('/')
        ? child.path
        : `${fullPath}/${child.path}`
      return mapRouterToPage(child, childPath)
    })
  }
}

console.log(`current router is ${router.currentRoute.value.path}`)
if (pageList.value.findIndex(item => item.path === router.currentRoute.value.path) == -1) {
  createPage(router.currentRoute.value)
}
const activePage = ref<string>(router.currentRoute.value.path)
updateMenu()

// 处理菜单项点击事件
function handleMenuClick(path: string) {
  console.log('menu click jump to ' + path)
  router.push(path)
}

// 处理标签页点击事件
function handleTabChange(path: string) {
  console.log('tab change jump to ' + path)
  router.push(path)
}

function handleTabRemove(path: string) {
  if (pageList.value.length === 1) {
    // 使用Ant Design的message组件显示提示
    message.warning('不能关闭最后一个标签页');
    return
  }
  let index = pageList.value.findIndex(item => item.path === path)
  if (index !== -1) {
    // 删除对应的页面
    pageList.value.splice(index, 1)
  }
  // 如果当前关闭的标签页是当前激活的标签页
  if (path === activePage.value) {
    index = index >= pageList.value.length ? pageList.value.length - 1 : index
    activePage.value = pageList.value[index].path
    router.push(activePage.value)
  }
}



// 根据当前路由路径设置激活的菜单项
onMounted(() => {

})

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);

watch(() => router.currentRoute.value, (newRouter) => {
  console.log(`new path is ${JSON.stringify(newRouter.name)}`)
  if (pageList.value.findIndex(item => item.path === newRouter.path) == -1) {
    createPage(newRouter)
  }
  activePage.value = newRouter.path

  // update menu
  updateMenu()
})

function updateMenu() {
  // find openKeys
  // state.openKeys = [openKey]
  // find selectedKeys
  state.selectedKeys = [activePage.value]
  console.log(`update menu, openKeys: ${state.openKeys}, selectedKeys: ${state.selectedKeys}`)
}

function createPage(newRouter: RouteLocationNormalizedLoaded) {

  pageList.value.push({
    path: newRouter.path,
    title: String(newRouter.name)
  })
}

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};

</script>

<template>
  <a-layout style="height: 100%; width: 100%;">
    <a-layout-sider :width="264" :collapseWidth="80" v-model:collapsed="state.collapsed">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="logo" class="logo-image">
        <h1 v-if="!state.collapsed" class="logo-title">Rule Engine</h1>
      </div>
      <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
        :inline-collapsed="state.collapsed" :style="{ width: '100%', height: '100%' }" :items="items">
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="site-layout-header">
        <div class="header-container">
          <div class="left-section">
            <a-button @click="toggleCollapsed" class="toggle-button" type="text">
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
          <TabsHead :pageList="pageList" :activePage="activePage" @tabChange="handleTabChange"
            @tabRemove="handleTabRemove"></TabsHead>
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
