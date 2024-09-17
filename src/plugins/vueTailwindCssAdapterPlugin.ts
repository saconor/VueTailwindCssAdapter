import { App, DirectiveBinding } from "vue";
import tinycolor from "tinycolor2";
export type GetStyleFunction = (s: string) => string;

export interface VueTailwindCssAdapterOptions {
  generateBorderClasses?: boolean;
  generateBackgroundClasses?: boolean;
  generateTextColorClasses?: boolean;
  theme: any;
  theme2: any;
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
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
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
  r = r + m;
  g = g + m;
  b = b + m;

  // Convert RGB to luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function generateColorScheme(
  initialHSL: string,
  numColors = 5,
  luminanceRange = [0.05, 0.95]
) {
  // Extract initial luminance and hue
  const color = tinycolor(initialHSL).toHsl();
  let initialLuminance = color.l;
  let initialHue = color.h;

  // Calculate the luminance step size
  let luminanceStep = (luminanceRange[1] - luminanceRange[0]) / (numColors - 1);

  // Generate the color scheme in HSL
  let colorSchemeHSL = [];
  for (let i = 0; i < numColors; i++) {
    // Calculate luminance for the current step
    let targetLuminance = luminanceRange[0] + i * luminanceStep;

    // Adjust the luminance of the initial color
    let luminanceDifference = targetLuminance - initialLuminance;
    let adjustedLuminance = color.l + luminanceDifference;

    // Clip values to be within the valid range
    adjustedLuminance = Math.max(0, Math.min(1, adjustedLuminance));

    // Adjust hue based on the luminance to balance brightness
    let hueMultiplier = 1 - Math.abs(adjustedLuminance - 0.5) * 2;
    let adjustedHue = (initialHue + i * 0.1 * hueMultiplier) % 360;
    console.log(adjustedLuminance);
    let saturationMultiplier = 1 - Math.abs(adjustedLuminance - 0.5) * 0.6;
    let adjustedSaturation = color.s * saturationMultiplier;

    // Clip saturation to be within the valid range
    adjustedSaturation = Math.max(0, Math.min(1, adjustedSaturation));

    // Create a new HSL color
    let newHSL = `hsl(${Math.ceil(adjustedHue)}, ${Math.ceil(
      adjustedSaturation * 100
    )}%, ${Math.ceil(adjustedLuminance * 100)}%)`;
    colorSchemeHSL.push(newHSL);
  }

  let shadingsteps = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ];
  const returnvalue = {} as any;
  for (let i = 0; i < shadingsteps.length; i++) {
    returnvalue[shadingsteps[i]] = colorSchemeHSL[i];
  }
  //returnvalue["50"] = initialHSL;
  return returnvalue;
}

// Example usage

// TODO: Doc string --> what does this plugin do in a nutshell
export default {
  install: (app: App, options: VueTailwindCssAdapterOptions): void => {
    let root = window.document.querySelector("html > head");
    if (!root) {
      root = window.document.createElement("head");
      document.getRootNode().appendChild(root);
    }

    const additionalClasses: string[] = [];
    let generatedVariables = {} as any;
    let generatedTheme2 = {} as any;
    //generate the style tag
    const newStyleTag = window.document.createElement("style");
    if (options) {
      newStyleTag.innerHTML += "";
      newStyleTag.innerHTML += "\n:root{";
      Object.keys(options.theme).forEach((variableName) => {
        let shadingsteps = options.theme[variableName];
        Object.keys(shadingsteps).forEach((shadingStep) => {
          const compoundariableName = `${variableName}-${shadingStep}`;
          const compoundariableValue = shadingsteps[shadingStep];
          newStyleTag.innerHTML += `\n--${compoundariableName}:${compoundariableValue};`;
          generatedVariables[`${compoundariableName}`] = compoundariableValue;
          if (options.generateBackgroundClasses)
            additionalClasses.push(
              `.background-${compoundariableName}{background-color:${compoundariableValue};}`
            );
          if (options.generateBorderClasses)
            additionalClasses.push(
              `.border-${compoundariableName}{border:1px solid ${compoundariableValue};}`
            );
          if (options.generateTextColorClasses)
            additionalClasses.push(
              `.color-${compoundariableName}{color:${compoundariableValue};}`
            );
        });
      });
      Object.keys(options.theme2).forEach((variableName) => {
        //let shadingsteps = generateShadingSteps(options.theme[variableName]);
        let shadingsteps = generateColorScheme(
          options.theme2[variableName],
          11,
          [0.95, 0.1]
        );
        console.log(shadingsteps);
        generatedTheme2[variableName] = shadingsteps;
        Object.keys(shadingsteps).forEach((shadingStep) => {
          const compoundariableName = `${variableName}-${shadingStep}`;
          const compoundariableValue = shadingsteps[shadingStep];
          newStyleTag.innerHTML += `\n--${compoundariableName}:${compoundariableValue};`;
          generatedVariables[`${compoundariableName}`] = compoundariableValue;
          console.log(
            hslToLuminance(compoundariableValue),
            hslToLuminance(generatedVariables[`${variableName}-50`])
          );
          if (options.generateBackgroundClasses) {
          }
          let textColor =
            hslToLuminance(generatedVariables[`${variableName}-50`]) -
              hslToLuminance(compoundariableValue) <
            0.4
              ? 950
              : 50;
          additionalClasses.push(
            `.background-${compoundariableName}{background-color:${compoundariableValue};color: var(--${variableName}-${textColor})}`
          );

          if (options.generateBorderClasses) {
            additionalClasses.push(
              `.border-${compoundariableName}{border:1px solid ${compoundariableValue}}`
            );
          }
          if (options.generateTextColorClasses)
            additionalClasses.push(
              `.color-${compoundariableName}{color:${compoundariableValue};}`
            );
        });
      });

      newStyleTag.innerHTML += "}";
    }
    newStyleTag.id = "vueStylePlugin";
    newStyleTag.innerHTML += additionalClasses.join("\n");
    root.appendChild(newStyleTag);

    function getStyleForVariable(varName: string): string {
      return generatedVariables[varName];
    }
    function getVariables(): any {
      return generatedVariables;
    }
    function getTheme(): any {
      return { ...options.theme, ...generatedTheme2 };
    }

    app.provide("getStyleForVariable", getStyleForVariable);
    app.provide("getVariables", getVariables);
    app.provide("getTheme", getTheme);
  },
};
