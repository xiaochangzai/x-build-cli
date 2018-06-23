#! /usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');

program.version('0.1.1')
    .option('i, init [name]', '初始化x-build项目')
    .parse(process.argv);

    const nameQuestion = {
        type: 'input',
        message: `项目名称: `,
        name: 'name',
        default: 'x-build'
      };
      
      const versionQuestion = {
        type: 'input',
        message: `初始版本: `,
        name: 'version',
        default: '0.0.1'
      };

if (program.init) { 
    const spinner = ora('正在创建项目' + program.init).start(); 
    download('xiaochangzai/MyDemo1', program.init, function (err) { 
        if (!err) { 
            // 可以输出一些项目成功的信息 
            console.info(chalk.blueBright('下载成功'));
         }else{ 
             // 可以输出一些项目失败的信息 
             console.error('下载项目失败')
         } 
        }) 
    }
