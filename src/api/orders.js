import request from '@/utils/request'
// 创建订单
export function createOrders(referrerId, sellerType) {
  return request({
    url: '/orders',
    method: 'post',
    data: {
      referrerId: referrerId,
      sellerType: sellerType
    }
  })
}
// 获取订单
export function getOrders() {
  return request({
    url: '/orders',
    method: 'get'
  })
}
