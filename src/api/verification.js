import request from '@/utils/request'
// 获取核销记录
export function fetchVerificationList(listQuery) {
  return request({
    url: '/verification/verificationList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}

// 获取红包记录
export function fetchRedPacketList(listQuery) {
  return request({
    url: '/verification/redPacketList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}

// 获取礼品记录
export function fetchGiftsList(listQuery) {
  return request({
    url: '/verification/giftsList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
