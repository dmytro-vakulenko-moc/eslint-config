/* Lets TypeScript (and the ESLint TypeScript parser) resolve `*.vue` imports.
   vue-tsc understands SFCs natively; this shim covers plain `tsc`/the editor and
   ESLint's projectService so `import App from './App.vue'` is typed, not `any`. */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent;

  export default component;
}
