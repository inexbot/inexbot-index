import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva:{},
  history:{
    type:'hash'
  },
  alias: {
    components: '@/components',
    API: '@/components/API',
    images: '@/images',
    page: '@/page',
  },
  
});
