import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '纳博特开放平台-工业机器人开放平台',
  favicon: 'http://www.inexbot.com/favicon.ico',
  metas: [
    {
      name: 'keywords',
      content:
        '机器人,工业机器人,工业机器人控制系统,控制系统,工业,工业自动化,机器人控制系统,scara控制系统,工业机器人二次开发平台,多轴运动控制系统,机器人运动控制系统',
    },
    {
      name: 'description',
      content:
        '纳博特在基于深度学习的人工智能控制、基于三维视觉的环境感知技术、关节型机器人动力学参数辨识、机器人高速高精度轨迹跟踪、机器人无序抓取、机器人力控打磨、机器人拖动示教等人工智能与机器人技术领域拥有核心技术与国家发明专利，发布了基于PC架构的机器人控制器产品，可用于工业机器人和CNC控制、机器视觉自动检测等机器人智能自动化系统，获得数百家客户的成功应用，系统综合性能达到世界领先水平，遥遥领先国内同类产品，填补国内相关行业的多项技术空白。纳博特的产品可广泛应用于弧焊焊接、电子装配、机械加工， 喷涂、码垛、切割、冲压等众多领域。',
    },
  ],
  // publicPath:
  //   'https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/index/',
  history: {
    type: 'hash',
  },
  dynamicImport: {},
  alias: {
    components: '@/components',
    API: '@/components/API',
    images: '@/images',
    page: '@/page',
  },
});
