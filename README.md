

## 项目初始化运行



代码地址克隆

`git clone xxxxx`



安装依赖

`npm i  `



这里本地需要全局安装gulp

`npm i -g gulp`



安装依赖也可以使用yarn add





## 开发笔记



1. module.exports导出使用，require 引入使用，遵循node.js 模块化规范
2. browserSync  server.router 值是文件夹要提供的（相对于当前的工作目录）

```js
const serve = () => {
  bs.init({
    server: {
      baseDir: 'dist',
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}
```



3. 自动加载插件处理 可以使用gulp-load-plugins插件使用时进行加载

   ```js
   
   // 热更新
   const browserSync = require('browser-sync')
   
   const plugins = loadPlugins()
   
   const style = () => {
     return src('src/assets/styles/*.scss',{base: 'src'})
       .pipe(plugins.sass({outputStyle: 'expended'}))
       .pipe(dest('dist'))
   }
   ```

   













## git 操作命令



1. `git branch`  查看分支

2. `git checkout` 切换某个分支

3. `git remote -v` 查看源

4. `git remote add 源名称 源地址` 添加某个源

   

github gitee 上传branch 默认为master push 的时候记得矫正branch

