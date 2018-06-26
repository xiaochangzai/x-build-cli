#! /usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer')

program.version('1.0.7')
    .option('-v, --version', 'v 1.0.7')
    .option('i, typescript [name]', '初始化项目')
    .option('i, tsvue [name]', '初始化项目')
    .parse(process.argv);
    const nameQuestion = {
        type: 'input',
        message: `项目名称: `,
        name: 'name',
        default: program.typescript || program.tsvue
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

      init(program.typescript, 'xiaochangzai/typescriptstartproject')
      init(program.tsvue, 'xiaochangzai/TypeScript-Vue-Starter')
function init (name, githubSrc) {
  if (name) {
    console.info('')
    if (name) {
        console.info('');
        inquirer.prompt([
          nameQuestion,
          versionQuestion,
          portQuestion,
          templateQuestion,
          remQuestion
        ]).then(function(answers){
            const spinner = ora('正在创建项目' + program.init).start(); 
            download(githubSrc, program.init, function (err) { 
                if (!err) { 
                    // 可以输出一些项目成功的信息 
                    
                    spinner.clear()
                    console.info(chalk.blueBright('下载成功'));
                    spinner.clear()
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

                    callback()
                 }else{ 
                     // 可以输出一些项目失败的信息 
                     console.error('下载项目失败')
                 } 
                }) 
        });
   
    }
}
}

function callback () {
  if (answers.template === true) {
    fs.unlinkSync(`${process.cwd()}/${answers.name}/src/index.html`);
  } else {
    fs.unlinkSync(`${process.cwd()}/${answers.name}/src/index.pug`);
  }
  fs.readFile(`${process.cwd()}/${answers.name}/package.json`, (err, data) => {
    if (err) throw err;
    let _data = JSON.parse(data.toString())
    _data.name = answers.name
    _data.version = answers.version
    _data.port = answers.port
    _data.template = answers.template ? "pug" : "html"
    _data.rem = answers.rem
    let str = JSON.stringify(_data, null, 4);
    fs.writeFile(`${process.cwd()}/${answers.name}/package.json`, str, function (err) {
      if (err) throw err;
      process.exit()
    })
  });
}