import request from '@/utils/request'
export default function getAuth(type) {
  var date = new Date()
  return request({
    url: '/cos/authorization?type=' + type,
    method: 'get',
    data: { pathname: '/' + date.getTime() }
  })
}
