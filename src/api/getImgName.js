import request from '@/utils/request'

export default function getImgName() {
  return request({
    url: '/newid',
    method: 'get'
  })
}
