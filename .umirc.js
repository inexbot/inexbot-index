import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  dynamicImport: {},
  alias: {
    components: '@/components',
    API: '@/components/API',
    images: '@/images',
  },
});
