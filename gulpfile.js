/*
 * @Author: pink
 * @Date: 2022-02-08 20:31:06
 * @LastEditors: pink
 * @LastEditTime: 2022-02-14 21:26:18
 * @Description: 自动构建入口文件
 */
const {src, dest, parallel, series} = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')
const imagemin = require('gulp-imagemin')
const del = require('del')


// html文件中出现的变量对象
const data = {
  pkg: require('./package.json'),
  data: new Date()
}

// 清除打包文件
const clean = () => {
  return del(['dist'])
}

// css样式调整
const style = () => {
  return src('src/assets/styles/*.scss',{base: 'src'})
    .pipe(sass({outputStyle: 'expended'}))
    .pipe(dest('dist'))
}

// js文件处理
const script = () => {
  return src('src/assets/scripts/*.js',{base: 'src'})
    .pipe(babel({presets: ['@babel/preset-env']}))//将js es6写法转化为es5
    .pipe(dest('dist'))
}

// 将基础的html文件进行打包
const page = () => {
  return src('src/*.html', {base: 'src'})
    .pipe(swig({data}))
    .pipe(dest('dist'))
}

// 图片资源处理
const image = () => {
  return src('src/assets/images/**', {base: 'src'})
    .pipe(imagemin())
    .pipe(dest('dist'))
}

// 项目中文件字体处理
const font = () => {
  return src('src/assets/fonts/**',{base: 'src'})
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**',{base: 'public'})
    .pipe(dest('dist'))
}

// 总体编译同步流程处理
const compile = parallel(style, script, page, image, font)

const build = series(clean, parallel(compile, extra)) 

module.exports = {
  compile,
  build
}
