# Taro-Shadcn-MobX-ts

[Taro][1] project scaffold based on [TypeScript][2], [React][3], [MobX][4]
and [Shadcn UI for Taro][5], powered by [VPT][6]

[![CI & CD](https://github.com/idea2app/Taro-Shadcn-MobX-ts/actions/workflows/main.yml/badge.svg)][7]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][8]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][9]

## Demo

This scaffold provides three example pages:

1. `pages/home`: a MobX counter
2. `pages/component`: a dual-thumb range slider and cascading area selector
3. `pages/interface`: an infinite-scrolling GitHub repository list powered by
   `mobx-restful`

Run `pnpm dev-h5` to preview them in a browser.

## Technology stack

- Language: [TypeScript v7][2]
- Component engine: [React v19][3]
- State management: [MobX v7][4] + [MobX-RESTful][10]
- Component suite: [Shadcn UI for Taro][5] + [Tailwind CSS v4][11]
- Build toolchain: [Vite v8][12] + [VPT][6]
- CI / CD: GitHub [Actions][13] + [WeChat miniprogram-ci][14]

## Extra components

1. [Scroll List](src/components/ScrollList.tsx)
2. [Range Field](src/components/RangeField.tsx)
3. [Area Select](src/components/AreaSelect.tsx)

## Best practice

1. Install GitHub apps in your organization or account:
   1. [Probot settings][15]: set up Issue labels & Pull Request rules
   2. [PR badge][16]: set up Online [VS Code][17] editor entries in Pull
      Request description

2. Click the **[<kbd>Use this template</kbd>][18] button** on the top of this
   GitHub repository's home page, then create your own repository in the
   app-installed namespace above

3. Click the **[<kbd>Open in GitHub Codespaces</kbd>][8] button** on the top of
   ReadMe file, then an **online VS Code development environment** will be
   started immediately

4. Set `WMA_ID` and `WMA_UPLOAD_KEY` as [Repository secrets][19], then every
   commit pushed to `main` can build and upload the WeChat Mini Program

5. Recommend adding a [Notification step in GitHub Actions][20] for your Team
   IM app

6. Remind the PMs & users of your product to submit **Feature/Enhancement**
   requests or **Bug** reports with [Issue forms][21] instead of IM messages or
   Mobile Phone calls

7. Collect all these issues into [Project kanbans][22], then create **Pull
   requests** & add `closes #issue_number` into its description for automation

## Development

### Install dependencies

Node.js 24 or later and pnpm are required.

```shell
npm i pnpm -g
pnpm i
```

### Start Dev-server

```shell
pnpm dev-h5
# or
pnpm dev-wx
```

### Mini-app Debug

The WeChat build is generated in `dist/wx/`. Import the project root into WeChat
DevTools after starting the development server.

#### Windows

```shell
winget install Tencent.WeixinDevTools
```

#### macOS

```shell
brew install --cask wechatwebdevtools
```

## Deployment

```shell
pnpm build-h5
# or
pnpm build-wx
```

Production files are generated in `dist/h5/` or `dist/wx/`. The GitHub Actions
workflow uploads the WeChat build when its required repository secrets are set.

[1]: https://docs.taro.zone/
[2]: https://www.typescriptlang.org/
[3]: https://react.dev/
[4]: https://mobx.js.org/
[5]: https://github.com/louisyoungx/taro-shadcn
[6]: https://vpt.js.org/
[7]: https://github.com/idea2app/Taro-Shadcn-MobX-ts/actions/workflows/main.yml
[8]: https://codespaces.new/idea2app/Taro-Shadcn-MobX-ts
[9]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Taro-Shadcn-MobX-ts
[10]: https://github.com/idea2app/mobx-restful
[11]: https://tailwindcss.com/
[12]: https://vite.dev/
[13]: https://github.com/features/actions
[14]: https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
[15]: https://github.com/apps/settings
[16]: https://pullrequestbadge.com/
[17]: https://code.visualstudio.com/
[18]: https://github.com/new?template_name=Taro-Shadcn-MobX-ts&template_owner=idea2app
[19]: https://github.com/idea2app/Taro-Shadcn-MobX-ts/settings/secrets/actions
[20]: https://github.com/idea2app/Lark-Next-Bootstrap-ts/blob/c274370181050567a79fedc3ebeaad600ec6caa1/.github/workflows/main.yml#L31-L52
[21]: https://github.com/idea2app/Taro-Shadcn-MobX-ts/issues/new/choose
[22]: https://github.com/idea2app/Taro-Shadcn-MobX-ts/projects
