import request from '@/utils/request'

export function orders(referrerId, sellerType) {
  return request({
    url: '/orders',
    method: 'post',
    data: {
      referrerId: referrerId,
      sellerType: sellerType
    }
  })
}

