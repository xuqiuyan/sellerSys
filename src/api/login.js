import request from '@/utils/request'

export function login(mobile, verifyCode) {
  console.log('verifyCode' + verifyCode)
  return request({
    url: '/login',
    method: 'post',
    data: {
      mobile: mobile,
      verifyCode: verifyCode
    }
  })
}
export function getInfo() {
  return request({
    url: '/sellers/sellerType',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
