import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import VueTailWindCssAdaper from "./plugins/vueTailwindCssAdapterPlugin.js";
import { defaultTheme } from "./themes/theme";

createApp(App).use(VueTailWindCssAdaper, defaultTheme).mount("#app");
