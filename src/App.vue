<script setup lang="ts">
import { inject, ref } from "vue"
import ClassTester from './components/ClassTester.vue';
const getTheme = inject("getTheme") as any
let showAll = ref(false)
</script>

<template>
  <div>
    <div>
      <label for="showAll">showAll</label>
      <input type="checkbox" v-model="showAll" name="showAll" id="showAll">
    </div>
    <div v-for="varName in Object.keys(getTheme())" :key="varName" :style="showAll ? 'margin-bottom: 1rem;' : ''">
      <ClassTester :varName="varName" :showAll="showAll"></ClassTester>
    </div>

  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
