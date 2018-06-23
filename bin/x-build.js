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
      
      const portQuestion = {
        type: 'input',
        message: `server端口: `,
        name: 'port',
        default: '3000'
      };
      
      const templateQuestion = {
        type: 'confirm',
        message: `使用pug(jade)模版引擎? `,
        name: 'template',
        default: true
      };
      
      const remQuestion = {
        type: 'confirm',
        message: `使用px2rem布局? `,
        name: 'rem',
        default: true
      };

      
if (program.init) { 
    console.info('')
    if (program.init) {
        console.info('');
        inquirer.prompt([
          nameQuestion,
          versionQuestion,
          portQuestion,
          templateQuestion,
          remQuestion
        ]).then(function(answers){
            const spinner = ora('正在创建项目' + program.init).start(); 
            download('xiaochangzai/MyDemo1', program.init, function (err) { 
                if (!err) { 
                    // 可以输出一些项目成功的信息 
                    
                    spinner.clear()
                    console.info(chalk.blueBright('下载成功'));
                    console.info('');
                    console.info(chalk.green('-----------------------------------------------------'));
                    console.info('');
                    spinner.succeed(['项目创建成功,请继续进行以下操作:'])
                    console.info('')

                    console.info('cd ' + program.init)
                    console.info('npm install')
                    console.info('npm run dev')
                    console.info('')
                    console.info('')
                 }else{ 
                     // 可以输出一些项目失败的信息 
                     console.error('下载项目失败')
                 } 
                }) 
        });
   
    }
}