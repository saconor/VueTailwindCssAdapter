<script setup lang="ts">
import { ref, inject } from 'vue'

const props = defineProps<{ varName: string, showAll: boolean }>()
const getTheme = inject("getTheme") as any
const ownTheme = ref(getTheme()[props.varName])

function generateStyleClassName(prefix: string, shadingStep: string) {
  return prefix + "-" + props.varName + "-" + shadingStep + " "
}

function parseHSL(hslString: string) {
  const regex = /^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/i;
  const match = hslString.match(regex);

  if (match) {
    const h = parseFloat(match[1]) / 360;
    const s = parseFloat(match[2]) / 100;
    const l = parseFloat(match[3]) / 100;
    return [h, s, l];
  } else {
    console.error("Invalid HSL color string");
    return null;
  }
}


function hslToLuminance(hslString: string) {
  const [h, s, l] = parseHSL(hslString);

  // Convert HSL to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;

  let r, g, b;

  if (h < 1 / 6) {
    [r, g, b] = [c, x, 0];
  } else if (h < 2 / 6) {
    [r, g, b] = [x, c, 0];
  } else if (h < 3 / 6) {
    [r, g, b] = [0, c, x];
  } else if (h < 4 / 6) {
    [r, g, b] = [0, x, c];
  } else if (h < 5 / 6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  // Adjust RGB values to be in the range [0, 1]
  r = (r + m);
  g = (g + m);
  b = (b + m);

  // Convert RGB to luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}


let shadingsteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
</script>

<template>
  <div style="text-align: left;">
    <h3 :class="generateStyleClassName('color', 950)" v-if="props.showAll">{{ props.varName }}</h3>
    <div style="display: flex;">
      <div class="" v-for="shadingstep in shadingsteps" :key="shadingstep" style="text-align: center;position: relative;">
        <div style="width: 80px;height: 120px;margin-left: 2px;border-radius: 8px;margin-bottom: 2px;    display: flex;
    flex-direction: column;
    justify-content: center;" :class="generateStyleClassName('background', shadingstep)"
          :title="ownTheme[shadingstep]">
          <div>
            <div>{{ shadingstep }}</div>
            <div>{{ hslToLuminance(ownTheme[shadingstep]).toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 1rem;" v-if="props.showAll">
      <button
        :class="generateStyleClassName('background', 50) + generateStyleClassName('color', 900) + generateStyleClassName('border', 800)">Test</button>
      <button :class="generateStyleClassName('background', 500) + generateStyleClassName('color', 50)"
        style="margin-left: 1rem;">Test</button>
      <button :class="generateStyleClassName('border', 500) + generateStyleClassName('color', 500)"
        style="margin-left: 1rem;">Test</button>

      <div style="width:100%; padding: 0.5rem; border-radius:0.25rem;margin-top: 1rem;"
        :class="generateStyleClassName('background', 50) + generateStyleClassName('color', 900) + generateStyleClassName('border', 800)">
        Notification
      </div>


    </div>
  </div>
  <div>

  </div>
</template>
