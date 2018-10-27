import request from '@/utils/request'
export function fetchMemberList(listQuery) {
  return request({
    url: '/users?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
