<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

// 密码强度检查
function checkPasswordStrength(pwd: string): boolean {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(pwd)
  const hasLowerCase = /[a-z]/.test(pwd)
  const hasNumbers = /\d/.test(pwd)
  const hasSpecialChar = /[!@#$%^&*]/.test(pwd)
  
  return pwd.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar
}

// 防止XSS的输入净化
function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '')
}

// 模拟防暴力破解的登录限制
const loginAttempts = ref(0)
const isLocked = ref(false)
const lockoutDuration = 30000 // 30秒

async function handleLogin() {
  try {
    if (isLocked.value) {
      errorMessage.value = '账号已被锁定，请稍后再试'
      return
    }

    // 输入验证
    if (!username.value || !password.value) {
      errorMessage.value = '用户名和密码不能为空'
      return
    }

    // 密码强度检查
    if (!checkPasswordStrength(password.value)) {
      errorMessage.value = '密码必须包含大小写字母、数字和特殊字符，且长度至少8位'
      return
    }

    // 清理输入
    const cleanUsername = sanitizeInput(username.value)
    
    // 模拟API调用
    const response = await mockLoginAPI(cleanUsername, password.value)
    
    if (response.success) {
      // 登录成功，重置计数器
      loginAttempts.value = 0
      router.push('/dashboard')
    } else {
      handleFailedLogin()
    }
  } catch (error) {
    errorMessage.value = '登录过程中发生错误'
    console.error('Login error:', error)
  }
}

function handleFailedLogin() {
  loginAttempts.value++
  
  if (loginAttempts.value >= 3) {
    isLocked.value = true
    errorMessage.value = '登录失败次数过多，账号已被锁定'
    
    setTimeout(() => {
      isLocked.value = false
      loginAttempts.value = 0
      errorMessage.value = ''
    }, lockoutDuration)
  } else {
    errorMessage.value = '用户名或密码错误'
  }
}

// 模拟登录API
async function mockLoginAPI(username: string, password: string) {
  // 这里应该是真实的API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: username === 'admin' && password === 'Admin123!'
      })
    }, 1000)
  })
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleLogin" class="form">
      <h2>安全登录</h2>
      
      <div class="form-group">
        <label for="username">用户名:</label>
        <input 
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          :disabled="isLocked"
          class="input"
        >
      </div>

      <div class="form-group">
        <label for="password">密码:</label>
        <input 
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          :disabled="isLocked"
          class="input"
        >
      </div>

      <div v-if="errorMessage" class="text-error">
        {{ errorMessage }}
      </div>

      <button 
        type="submit" 
        :disabled="isLocked"
        class="btn btn-primary"
        :class="{ 'btn-disabled': isLocked }"
      >
        登录
      </button>
    </form>
  </div>
</template>

<style scoped>
/* 组件特定的样式（如果有的话）可以放在这里 */
</style> 