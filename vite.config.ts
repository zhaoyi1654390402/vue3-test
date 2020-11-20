import { SharedConfig } from "vite";
import path from "path";
const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};
// 
const config: SharedConfig = {
    // 导入别名
    alias: {
        "/@/": pathResolve("./src"),
        "/@views/": pathResolve("./src/views"),
        "/@components/": pathResolve("./src/components"),
        "/@utils/": pathResolve("./src/utils"),
    },
    // 配置Dep优化行为
    optimizeDeps: {
        include: ["lodash"],
    },
    // 为开发服务器配置自定义代理规则。
    // proxy: {
    //     '/api': {
    //         target: '',
    //         changeOrigin: true,
    //         rewrite: path => path.replace(/^\/api/, '')
    //     }
    // }
};

module.exports = config;
