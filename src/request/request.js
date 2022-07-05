import axios from 'axios';


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const request = createInctance();

function createInctance() {
  const instance = axios.create({
    baseURL: 'http://123.56.144.92:8881/', //这里要改成你后端的地址
    timeout: 5000
  })

  instance.interceptors.request.use(handerRequest);
  instance.interceptors.response.use(handerResponse);

  return instance;
}

function handerRequest(config) {
  NProgress.start();
  return config;
}

function handerResponse(response) {
  if (response.status != 200) {
    throw new Error('网络异常');
    return;
  }
  NProgress.done();
  console.log(response.data)
  return response.data;
}
