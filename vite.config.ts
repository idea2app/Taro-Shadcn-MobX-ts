import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vpt, { type VptTarget } from 'vite-plugin-taro'

// `RegExp.escape` (TC39 stage 4) is required by vite-plugin-taro's WeChat style
// transform, but is not yet implemented in every Node 22.x build. Polyfill it
// so `build:wx` keeps working on older V8 engines.
if (typeof (RegExp as { escape?: (value: string) => string }).escape !== 'function') {
    ;(RegExp as unknown as { escape: (value: string) => string }).escape = (value: string) =>
        value.replace(/[\\^$.*+?()[\]{}|/]/g, '\\$&').replace(/-/g, '\\x2d')
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_VPT_')
    const target = getTarget(env)
    const wechatAppId = env.VITE_VPT_WECHAT_APP_ID || 'touristappid'

    return {
        resolve: {
            alias: { '@': fromRoot('src') }
        },
        build: {
            outDir: fromRoot('dist', target)
        },
        plugins: [
            vpt({
                target,
                app: 'src/app.tsx',
                pages: [
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
                ],
                appJson: {
                    window: {
                        backgroundTextStyle: 'light',
                        navigationBarBackgroundColor: '#fff',
                        navigationBarTitleText: 'Taro-Shadcn-MobX-ts',
                        navigationBarTextStyle: 'black'
                    }
                },
                projectConfigJson: {
                    appid: wechatAppId,
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
                },
                projectPrivateConfigJson: {
                    setting: {
                        urlCheck: false
                    }
                },
                sitemapJson: {
                    rules: [{ action: 'allow', page: '*' }]
                }
            })
        ]
    }
})

const targetEnvName = 'VITE_VPT_TARGET'
const projectRoot = fileURLToPath(new URL('.', import.meta.url))

function getTarget(env: Record<string, string>): VptTarget {
    const target = env[targetEnvName]
    if (target === 'wx' || target === 'h5') return target
    throw new Error(`${targetEnvName} must be "wx" or "h5".`)
}

function fromRoot(...segments: string[]): string {
    return path.resolve(projectRoot, ...segments)
}
