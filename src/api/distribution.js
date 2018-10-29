import request from '@/utils/request'
// 获取核销记录
export function fetchDistributionList(listQuery) {
  return request({
    url: '/distribution/distributionList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
// 获取渠道列表
export function fetchChannelsList(listQuery) {
  return request({
    url: '/distribution/channelsList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
