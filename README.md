# Taro-Shadcn-MobX-ts

Taro scaffold for Web &amp; mini-app, based on TypeScript, Vite, React, Tailwind CSS &amp; Shadcn UI.

Built with:

- [VPT (vite-plugin-taro)](https://vpt.js.org/llms.txt) — Vite 8 + React 19 + Taro build tool-chain for WeChat Mini Program & H5.
- [taro-shadcn](https://github.com/louisyoungx/taro-shadcn) — Shadcn UI components adapted for Taro.
- [MobX](https://mobx.js.org/) & [mobx-restful](https://github.com/idea2app/mobx-restful) for state management & data fetching.

It re-implements the example pages of [Taro-Vant-MobX-ts](https://github.com/idea2app/Taro-Vant-MobX-ts):

- `pages/home` — a MobX counter demo.
- `pages/component` — advanced form controls: a dual-thumb range slider & a cascading area selector.
- `pages/interface` — an infinite-scrolling list fetched from the GitHub REST API via `mobx-restful`.

## Development

```sh
npm install

# WeChat Mini Program
npm run dev:wx
npm run build:wx

# H5 / Web
npm run dev:h5
npm run build:h5
```
