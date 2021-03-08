import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";

import copy from "rollup-plugin-copy";

const plugins = [
  lwc({
    rootDir: "./elements",
    sourcemap: true,
    stylesheetConfig: {
      customProperties: {
        allowDefinition: true,
      },
    },
  }),
  replace({
    values: { ...env() },
  }),
  copy({
    targets: [{ src: "public/*", dest: ".dist" }],
  }),
];

export default [
  {
    input: "./modules/case.js",
    output: {
      dir: ".dist/modules",
      format: "esm",
      sourcemap: true,
    },
    treeshake: {
      moduleSideEffects: true,
    },
    manualChunks: (id) => {
      if (/node_modules\/@?lwc/.test(id)) return "lwc";
    },
    plugins,
  },
];

function env() {
  return {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  };
}
