import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from 'vite-plugin-dts'
import { readdirSync } from "fs";
import { delay } from "lodash-es";
import shell from 'shelljs'
import hooks from './hooksPlugin'

const TRY_MOVE_STYLES_DELAY = 800 as const

const COMP_NAMES = [
  "Alert",
  "Button",
  "Collapse",
  "Dropdown",
  "Form",
  "Icon"
] as const;

function moveStyles() {
  try {
    readdirSync('./dist/es/theme')
    shell.mv('./dist/es/theme', './dist')
  } catch(_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY)
  }
}

export default defineConfig({
  plugins: [
    vue(), 
    dts({
    tsconfigPath: '../../tsconfig.build.json',
    outDir: 'dist/types',
  }),
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles
    })
],
  build: {
    outDir: 'dist/es',
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'mxm-ui',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if(assetInfo.name === "style.css") return "index.css";
          if(assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name as string)) {
            return `theme/[name].[ext]`
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if(id.includes("plugin-vue:export-helper")) {
            return "utils"
          }
          if(id.includes("node_modules")) {
            return "vendor"
          }
          if(id.includes("/packages/hooks")) {
            return "hooks"
          }
          if(id.includes("/packages/utils")) {
            return "utils"
          }
          for(const item of COMP_NAMES) {
            if(id.includes(`/packages/components/${item}`)) {
              return item
            }
          }
        }
      }
    }
  },
})