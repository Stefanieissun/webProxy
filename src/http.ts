/* eslint-disable no-unused-expressions */
/*
 * @Date: 2020-07-11 19:02:04
 * @LastEditors: Leo
 * @LastEditTime: 2020-07-12 14:13:34
 * @FilePath: \webproxy\src\http.ts
 * @Description: Do not edit
 */
// node做三方代理的时候，如果headers引用req的，需要把headers中的host改成代理放的host，不然会有
import { createServer } from 'http'
import Axios from 'axios'
export type THttpMethod = 'get'|'post'|'delete'|'put'|'patch'|'options';

/**
 * @description 检测是否是网址
 * @param url 网址
 */
export function checkUrl (url:string) {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(url)
}

export function create (http:string, port:number) {
  createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const httpProto = http.split('//')[0]
    const host = http.split('//')[1].split('/')[0]
    const url = httpProto + '//' + host + req.url
    req.headers.host = host
    Axios.request({
      url,
      method: req.method as THttpMethod,
      withCredentials: true,
      headers: req.headers,
      responseType: 'stream'
    }).then(data => data.data.pipe(res)).catch(err => console.error(err.message))
  }).listen(port, () => console.log(`running at ${port}`))
}
