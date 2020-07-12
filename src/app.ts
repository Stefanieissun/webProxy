#! /usr/bin/env node
/*
 * @Date: 2020-07-11 18:23:25
 * @LastEditors: Leo
 * @LastEditTime: 2020-07-12 16:30:44
 * @FilePath: \webproxy\src\app.ts
 * @Description: 输入
 */

import inquirer from 'inquirer'
import chalk from 'chalk'
import { create, checkUrl } from './http'
import { appendHost } from './fs'
process.on('SIGINT', function () {
  console.log('Exit now!')
  // TODO: 退出之前先回复hosts文件
  process.exit()
})
inquirer.prompt([
  {
    type: 'input',
    name: 'url',
    default: null,
    message: chalk.blue('请输入要代理的网址'),
    validate: function (data) {
      if (checkUrl(data)) {
        return true
      }
      return chalk.red.redBright('请输入正确的网址')
    }
  },
  {
    type: 'input',
    name: 'port',
    default: 80,
    message: chalk.blue('请输入额本地的端口')
  }
]).then(async response => {
  // TODO: 判断操作系统
  const createHost = (response.url as string).split('//')[1] + '.test'
  const res = await appendHost(`127.0.0.1 ${createHost}`)
  console.log('res', res)
  if (res !== 'success') {
    return false
  }
  await create(response.url, response.port)
  console.log(chalk.yellow(`如果你启用的是80端口,请访问${createHost}`))
  return false
})
