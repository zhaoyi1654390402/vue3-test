# [Vite](https://github.com/vitejs/vite) + [Vue3](https://vue3js.cn/docs/zh/guide/introduction.html) + TS + [Ant Design of Vue 2.0 UI](https://2x.antdv.com/docs/vue/introduce-cn/) + Scss 尝试
- vite安装创建项目 
  - `git clone https://github.com/vitejs/vite.git` 拉取代码到本地 
  - `cd vite`进入目录 
  - `yarn` 安装依赖 
  - `yarn build` 打包 
  - `yarn link` 链接项目
  - 创建项目 `yarn create vite-app  vue3-test` 或 `npm init vite-app vue3-test`
  - 进入目录 `cd vue3-test` 
  - 安装依赖 `yarn` 或 `npm i` 
  - 安装ts vue-router axios sass等 `npm i -S typescript vue-router@next axios` `npm i sass sass-loader --save-dev`
  - 安装 Ant Design of Vue 2.0 UI框架(支持vite及ts,目前支持vue3的库有antd和vant，注意安装的时候需要在后面@版本) `npm install ant-design-vue@next --save` 或 `yarn add ant-design-vue@next`
      - 按需加载需要的UI组件`npm install -D babel-plugin-import`
      ```json
        // .babelrc or babel-loader option
        {
          "plugins": [
            ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] 
          ]
        }
      ```
      - 按需引入实例 
      ```js
          import 'ant-design-vue/dist/antd.css';
          import { DatePicker } from 'ant-design-vue';
          app.use(DatePicker);
      ```
  - 运行 `yarn dev` 或`npm run dev`
- [配置vite.config.js](https://github.com/vitejs/vite/blob/master/src/node/config.ts)
  - 新建`vite.config.ts`文件
  - 设置路径别名
    ```js
        module.exports={
           alias: {
                '/@/': path.resolve(__dirname, './src'),
                '/@views/': path.resolve(__dirname, './src/views'),
                '/@components/': path.resolve(__dirname, './src/components'),
                '/@utils/': path.resolve(__dirname, './src/utils'),
            }
        }
    ```
  - 设置接口代理
    ```js
        proxy: {  
            //参考https://github.com/vitejs/vite#dev-server-proxy
         "/api": {
             target:'http://xxxxxxx',
             changeOrigin: true,
             rewrite: path => path.replace(/^\/api/, '')
         }
    },
    ``` 
- 路由配置[参考](https://github.com/vuejs/vue-router-next)
  ```js
  import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'Home',
      component: import('/@views/Home.vue'),
    }
  ];
  const router = createRouter({
      history: createWebHistory(),
      routes,
  });
    export default router;
  ```
- 使用jsx[参考](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)
  - 安装`npm install @vue/babel-plugin-jsx -D`
  - 配置babel
  ```json
    {
      "plugins": ["@vue/babel-plugin-jsx"]
    }
  ```
  - ts中使用tsconfig.json中配置(如果在vite项目中.vue文件使用jsx语法仅需配置tsconfig.json，无需安装 @vue/babel-plugin-jsx)
  ```json
  {
    "compilerOptions": {
      "jsx": "preserve"
    }
  }
  ```
- 部分问题
  - VSCode 找不到 vue 模块问题,在 src 目录中增加 shims-vue.d.ts 文件
    ```js
       declare module '*.vue' {
            import { defineComponent } from 'vue';
            const component: ReturnType<typeof defineComponent>;
            export default component;
        }
    ```
  - 如果遇到scss加载报错问题（安装时未加-dev）
    ```json
        "devDependencies": {
            "sass": "^1.29.0", // 将其依赖从dependencies移动到devDependencies 中
            "vite": "^1.0.0-rc.8",
            "@vue/compiler-sfc": "^3.0.2"
        }
    ```
  - 使用typescript
    - 将 main.js 改成 main.ts,修改index.html中引入文件拓展名,组件中的 script 代码块定义 lang="ts"
    `<script type="module" src="/src/main.ts"></script>`
    ```js
    //main.ts
    import { createApp } from "vue";
    import App from "./App.vue";
    import "./index.css";
    import router from "./router";
    import "ant-design-vue/dist/antd.css";
    import { DatePicker } from "ant-design-vue";
    const app = createApp(App);
    app.use(DatePicker);
    app.use(router);
    app.mount("#app");
    ```