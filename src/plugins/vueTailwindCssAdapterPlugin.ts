import { App, DirectiveBinding } from "vue";

export type GetStyleFunction = (s: string) => string;

export interface VueTailwindCssAdapterOptions {
  generateBorderClasses?: boolean;
  generateBackgroundClasses?: boolean;
  generateTextColorClasses?: boolean;
  theme: any;
}

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
    //generate the style tag
    const newStyleTag = window.document.createElement("style");
    if (options) {
      newStyleTag.innerHTML += "";
      newStyleTag.innerHTML += "\n:root{";
      Object.keys(options.theme).forEach((variableName) => {
        Object.keys(options.theme[variableName]).forEach((shadingStep) => {
          const compoundariableName = `${variableName}-${shadingStep}`;
          const compoundariableValue = options.theme[variableName][shadingStep];
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

      newStyleTag.innerHTML += "}";
    }

    newStyleTag.innerHTML += additionalClasses.join("\n");
    root.appendChild(newStyleTag);

    function getStyleForVariable(varName: string): string {
      return generatedVariables[varName];
    }
    function getVariables(): any {
      return generatedVariables;
    }
    function getTheme(): any {
      return options.theme;
    }

    app.provide("getStyleForVariable", getStyleForVariable);
    app.provide("getVariables", getVariables);
    app.provide("getTheme", getTheme);
  },
};
