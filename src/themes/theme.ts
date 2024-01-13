import { VueTailwindCssAdapterOptions } from "../plugins/vueTailwindCssAdapterPlugin";
export let defaultTheme: VueTailwindCssAdapterOptions = {
  generateBackgroundClasses: true,
  generateBorderClasses: true,
  generateTextColorClasses: true,
  theme: {
    success: {
      50: "hsl(152, 88%, 97%)",
      100: "hsl(155, 95%, 93%)",
      200: "hsl(154, 87%, 85%)",
      300: "hsl(154, 84%, 73%)",
      400: "hsl(154, 76%, 58%)",
      500: "hsl(155, 77%, 45%)",
      600: "hsl(155, 84%, 36%)",
      700: "hsl(155, 79%, 29%)",
      800: "hsl(155, 71%, 24%)",
      900: "hsl(156, 67%, 20%)",
      950: "hsl(157, 88%, 10%)",
    },
    error: {
      50: "hsl(0, 100%, 97%)",
      100: "hsl(0, 100%, 94%)",
      200: "hsl(0, 100%, 89%)",
      300: "hsl(0, 100%, 81%)",
      400: "hsl(0, 100%, 70%)",
      500: "hsl(0, 100%, 60%)",
      600: "hsl(0, 87%, 51%)",
      700: "hsl(0, 88%, 42%)",
      800: "hsl(0, 84%, 36%)",
      900: "hsl(0, 76%, 31%)",
      950: "hsl(0, 90%, 15%)",
    },
    warning: {
      50: "hsl(62, 100%, 95%)",
      100: "hsl(63, 100%, 88%)",
      200: "hsl(60, 100%, 76%)",
      300: "hsl(58, 100%, 63%)",
      400: "hsl(55, 100%, 52%)",
      500: "hsl(52, 100%, 48%)",
      600: "hsl(47, 100%, 41%)",
      700: "hsl(42, 99%, 36%)",
      800: "hsl(38, 88%, 29%)",
      900: "hsl(35, 79%, 26%)",
      950: "hsl(33, 89%, 14%)",
    },
    info: {
      50: "hsl(198, 87%, 97%)",
      100: "hsl(201, 81%, 94%)",
      200: "hsl(199, 80%, 86%)",
      300: "hsl(197, 82%, 74%)",
      400: "hsl(196, 80%, 60%)",
      500: "hsl(196, 76%, 48%)",
      600: "hsl(198, 84%, 36%)",
      700: "hsl(198, 82%, 32%)",
      800: "hsl(199, 77%, 27%)",
      900: "hsl(200, 69%, 24%)",
      950: "hsl(202, 68%, 16%)",
    },
  },
};