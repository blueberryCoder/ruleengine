<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const count = ref<number>(0)

    function increment(): void {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
})
</script>

<template>

  <template v-if="count % 2 == 1">
    <button @click="increment">
      {{ count }}
    </button>
  </template>

  <template v-else>
    <button @click="increment" >
      this is a button {{ count }}
    </button>
  </template>
</template>
