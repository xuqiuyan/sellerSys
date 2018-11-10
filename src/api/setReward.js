import request from '@/utils/request'
// 是否设置奖项，返回id
export function getLotteries() {
  return request({
    url: '/lotteries',
    method: 'get'
  })
}
// 获取奖项设置
export function getAwards(id) {
  return request({
    url: '/awards/' + id,
    method: 'get'
  })
}

// 设置奖项
export function setAwards(title, awards) {
  // 传递json数据
  request.interceptors.request.use(config => {
    config.headers['content-type'] = 'application/json'
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })
  return request({
    url: '/awards',
    method: 'put',
    data: {
      title,
      awards
    }
  })
}
