<script setup lang="ts">

const { pageList, activePage } = defineProps<{
    pageList: Array<{ path: string, title: string }>
    activePage: string
}>()

// defineEmits(['tabChange'])

const emit = defineEmits<{ 
    tabChange: [path: string]
    tabRemove: [path: string]
 }>()



function handleTabChange(path: string) {
  console.log('tab change jump to ' + path)
  emit('tabChange', path)
}

function handleEdit(key: string, action: 'add' | 'remove') {
  if (action === 'add') {
    // Add new tab
    console.warn('Add new tab is not supported')
  } else {
    // Remove tab
    emit('tabRemove', key)
  }
}

</script>

<template>
    <div>
        <!-- https://antdv.com/components/tabs/#Tabs -->
        <a-tabs :activeKey="activePage" 
        type="editable-card"
        hideAdd
        @change="handleTabChange"
        @edit="handleEdit"
        >
            <a-tab-pane v-for="item in pageList" 
            :key="item.path" 
            :tab="item.title">
                <!-- <div>{{ item.label }}</div> -->
                
            </a-tab-pane>
        </a-tabs>
    </div>
</template>