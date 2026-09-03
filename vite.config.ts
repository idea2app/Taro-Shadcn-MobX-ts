import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vpt, { type VptTarget } from 'vite-plugin-taro';
import swc from 'unplugin-swc';

import {
  appJson,
  pages,
  projectConfigJson,
  projectPrivateConfigJson,
  sitemapJson
} from './config/taro.ts';

const targetEnvName = 'VITE_VPT_TARGET';
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

const fromRoot = (...segments: string[]) =>
  path.resolve(projectRoot, ...segments);

const getTarget = (env: Record<string, string>): VptTarget => {
  const target = env[targetEnvName];

  if (target === 'wx' || target === 'h5') return target;

  throw new Error(`${targetEnvName} must be "wx" or "h5".`);
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_VPT_');
  const target = getTarget(env);
  const wechatAppId = env.VITE_VPT_WECHAT_APP_ID || 'touristappid';

  return {
    resolve: {
      alias: { '@': fromRoot('src') }
    },
    build: {
      outDir: fromRoot('dist', target)
    },
    plugins: [
      swc.vite({
        tsconfigFile: 'tsconfig.app.json',
        jsc: {
          target: 'es2022',
          parser: { syntax: 'typescript', tsx: true, decorators: true },
          transform: {
            decoratorVersion: '2022-03',
            useDefineForClassFields: true,
            react: { runtime: 'automatic' }
          }
        }
      }),
      vpt({
        target,
        app: 'src/app.tsx',
        pages,
        appJson,
        projectConfigJson: { ...projectConfigJson, appid: wechatAppId },
        projectPrivateConfigJson,
        sitemapJson
      })
    ]
  };
});
