<script setup lang="ts">

const { pageList, activePage } = defineProps<{
    pageList: Array<{ path: string, title: string }>
    activePage?: string
}>()

// defineEmits(['tabChange'])

const emit = defineEmits<{ tabChange: [path: string] }>()



function handleTabChange(path: string) {
  console.log('tab change jump to ' + path)
//   router.push(path)
    emit('tabChange', path)
}

</script>

<template>
    <div>
        <a-tabs :activeKey="activePage" @change="handleTabChange">
            <a-tab-pane v-for="item in pageList" :key="item.path" 
            :tab="item.title">
                <!-- <div>{{ item.label }}</div> -->
                
            </a-tab-pane>
        </a-tabs>
    </div>
</template>