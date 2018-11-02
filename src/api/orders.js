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
// 提交流水号
export function setOrders(orderId, transactionNo, url, referrerId, sellerId) {
  return request({
    url: '/orders/evidence?referrerId=' + referrerId + '&sellerId=' + sellerId,
    method: 'post',
    data: {
      orderId: orderId,
      transactionNo: transactionNo,
      photoUrl: url
    }
  })
}
