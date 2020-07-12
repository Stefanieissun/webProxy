/*
 * @Date: 2020-07-12 14:50:35
 * @LastEditors: Leo
 * @LastEditTime: 2020-07-12 16:19:26
 * @FilePath: \webproxy\src\fs.ts
 * @Description: Do not edit
 */
import fs from 'fs-extra'
import { platform } from 'os'

export async function appendHost (content:string) {
  try {
    const windHostsPath = 'C://Windows/System32/drivers/etc/hosts'
    const linuxHostsPath = '/etc/hosts'
    const os = platform()
    const path = os === 'linux' ? linuxHostsPath : windHostsPath
    await fs.appendFile(path, `\n${content}`)
    return 'success'
  } catch (error) {
    return error.message
  }
}
