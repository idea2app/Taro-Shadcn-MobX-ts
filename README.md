# Taro-Shadcn-MobX-ts

Taro scaffold for Web &amp; mini-app, based on TypeScript, Vite, React, Tailwind CSS &amp; Shadcn UI.

Built with:

- [VPT (vite-plugin-taro)](https://vpt.js.org/llms.txt) — Vite 8 + React 19 + Taro build tool-chain for WeChat Mini Program & H5.
- [Taro-Shadcn](https://github.com/louisyoungx/taro-shadcn) — Shadcn UI components adapted for Taro.
- [MobX](https://mobx.js.org/) & [MobX-RESTful](https://github.com/idea2app/mobx-restful) for state management & data fetching.

It re-implements the example pages of [Taro-Vant-MobX-ts](https://github.com/idea2app/Taro-Vant-MobX-ts):

- `pages/home` — a MobX counter demo.
- `pages/component` — advanced form controls: a dual-thumb range slider & a cascading area selector.
- `pages/interface` — an infinite-scrolling list fetched from the GitHub REST API via `mobx-restful`.

## Development

```sh
pnpm install

# WeChat Mini Program
pnpm dev:wx
pnpm build:wx

# H5 / Web
pnpm dev:h5
pnpm build:h5
```
