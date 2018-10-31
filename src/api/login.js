import request from '@/utils/request'

export function register(mobile, password, referrerId, verifyCode) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      mobile,
      password,
      referrerId,
      verifyCode
    }
  })
}
export function login(mobile, verifyCode) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      mobile,
      verifyCode
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
