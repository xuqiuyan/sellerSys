import request from '@/utils/request'

// export function login(mobile, password, verifyCode) {
//   return request({
//     url: '/login',
//     method: 'post',
//     data: {
//       mobile,
//       password,
//       verifyCode
//     }
//   })
// }
export function login(mobile, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      mobile,
      password
    }
  })
}
export function getInfo() {
  return request({
    url: '/administrators/roles',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
