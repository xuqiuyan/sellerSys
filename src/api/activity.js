import request from '@/utils/request'

export function fetchActivityList(listQuery) {
  return request({
    url: '/activityList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
// 中奖名单
export function fetchRewardList(listQuery) {
  return request({
    url: '/activityList/rewardList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
// 用户排名
export function fetchRankingList(listQuery) {
  return request({
    url: '/activityList/rankingList?start=' + (listQuery.page - 1) * listQuery.limit + '&length=' + listQuery.limit,
    method: 'get'
  })
}
