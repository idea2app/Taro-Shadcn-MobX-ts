import type { VptJsonObject, VptPageOption } from 'vite-plugin-taro';

export const pages: VptPageOption[] = [
  {
    path: 'pages/home/index',
    config: { navigationBarTitleText: '首页' }
  },
  {
    path: 'pages/component/index',
    config: { navigationBarTitleText: '高级组件演示' }
  },
  {
    path: 'pages/interface/index',
    config: { navigationBarTitleText: '请求接口' }
  }
];

export const appJson: VptJsonObject = {
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro-Shadcn-MobX-ts',
    navigationBarTextStyle: 'black'
  }
};

export const projectConfigJson: VptJsonObject = {
  projectname: 'taro-shadcn-mobx-ts',
  description: '',
  compileType: 'miniprogram',
  setting: {
    urlCheck: false,
    es6: false,
    postcss: false,
    minified: false,
    compileHotReLoad: true,
    enhance: false,
    uglifyFileName: false,
    preloadBackgroundData: false,
    newFeature: true,
    autoAudits: false,
    coverView: true,
    showShadowRootInWxmlPanel: false,
    scopeDataCheck: false,
    useCompilerModule: false
  }
};

export const projectPrivateConfigJson: VptJsonObject = {
  setting: {
    urlCheck: false
  }
};

export const sitemapJson: VptJsonObject = {
  rules: [{ action: 'allow', page: '*' }]
};
