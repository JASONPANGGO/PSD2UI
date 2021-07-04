#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('./package.json')
const path = require('path')
const { psd2ui } = require('./PSD2UI')

program.version(version)

program
    .requiredOption('-s, --src <Path>', 'psd或zip地址')
    .option('-o, --output <Path>', '项目输出地址')
    .option('-n, --name <String>', '输出的项目命名', 'PSD2UI_' + Date.now())
    .option('-t, --template <Path>', '使用的模板地址', path.join(process.env.PLAYSMART_PATH, 'tempProject/'))
    .option('-q, --quality <Number>', '导出项目的图片质量0～100，不传入代表不压缩')
    .option('-ps --playsmart', '是否为PlaySmart项目', false)
    .option('-th --traceheap', '跟踪运行过程中堆内存使用状况', false)
    .option('-l --logs', '是否保存运行日志', false)
    .parse()

const options = program.opts();

(async () => {
    await psd2ui(options)
    process.exit(0)
})()
