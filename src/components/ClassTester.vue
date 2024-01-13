<script setup lang="ts">
import { ref, inject } from 'vue'

const props = defineProps<{ varName: string, showAll: boolean }>()
const getTheme = inject("getTheme") as any
const ownTheme = ref(getTheme()[props.varName])

function generateStyleClassName(prefix: string, shadingStep: string) {
  return prefix + "-" + props.varName + "-" + shadingStep + " "
}

</script>

<template>
  <div style="text-align: left;">
    <h3 :class="generateStyleClassName('color', 950)" v-if="props.showAll">{{ props.varName }}</h3>
    <div style="display: flex;">
      <div class="" v-for="shadingstep in Object.keys(ownTheme)" :key="shadingstep" style="text-align: center;">
        <div style="width: 60px;height: 60px;" :class="generateStyleClassName('background', shadingstep)"
          :title="ownTheme[shadingstep]"></div>
        <div v-if="props.showAll">{{ shadingstep }}</div>

      </div>
    </div>
    <div style="margin-top: 1rem;" v-if="props.showAll">
      <button
        :class="generateStyleClassName('background', 50) + generateStyleClassName('color', 900) + generateStyleClassName('border', 800)">Test</button>
      <button :class="generateStyleClassName('background', 500) + generateStyleClassName('color', 50)"
        style="margin-left: 1rem;">Test</button>
      <button :class="generateStyleClassName('border', 500) + generateStyleClassName('color', 500)"
        style="margin-left: 1rem;">Test</button>



    </div>
  </div>
</template>
