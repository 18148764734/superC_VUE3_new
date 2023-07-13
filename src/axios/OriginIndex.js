import axios from 'axios'
import { ElMessage,ElLoading,ElNotification  } from 'element-plus'
import Cookies from 'js-cookie'
const service = axios.create({
    baseURL:'https://y3sops.39nat.com'
    // baseURL:' http://127.0.0.1:8088'

})

let loading ;
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsImV4cCI6MTY4MDUxODQzNywidXNlcm5hbWUiOiIxMjM0In0.ZZIX5u9i_7lpGaeyt8liy53cxbzKPQVn9MsH527LT5U'
    let token = Cookies.get('token')

    if(token){
      config.headers['token'] = token
    }
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    loading.close()
    return response;
  }, function (error) {
    loading.close()
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElNotification({
      title: 'Error',
      message: error.response.statusText,
      type: 'error',
    })
    return Promise.reject(error);
  });

export default service