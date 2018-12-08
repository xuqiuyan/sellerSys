import request from '@/utils/request'
// 是否设置奖项，返回id
export function getLotteries() {
  return request({
    url: '/lotteries',
    method: 'get'
  })
}
// 创建抽奖
export function createLotteries(title) {
  return request({
    url: '/lotteries',
    method: 'post',
    data: {
      title
    }
  })
}
// 编辑抽奖
export function editLotteries(title, id) {
  return request({
    url: '/lotteries/' + id,
    method: 'put',
    data: {
      title
    }
  })
}
// 获取所有抽奖阶段
export function getStages(lotteryId) {
  return request({
    url: '/lotteries/' + lotteryId + '/stages',
    method: 'get'
  })
}
// 获取一个抽奖阶段
export function getStage(lotteryId, stageId) {
  return request({
    url: '/lotteries/' + lotteryId + '/stages/' + stageId,
    method: 'get'
  })
}
// 创建抽奖阶段
export function setStage(lotteryId, stage) {
  return request({
    url: '/lotteries/' + lotteryId + '/stages',
    method: 'post',
    data: {
      startAt: stage.startAt, // 固定填1
      price: stage.price, // 价格
      costRate: stage.costRate / 100 // {成本所占比例}
    }
  })
}
// 编辑抽奖阶段
export function editStage(lotteryId, stage) {
  return request({
    url: '/lotteries/' + lotteryId + '/stages/' + stage.id,
    method: 'put',
    data: {
      startAt: stage.startAt, // 固定填1
      price: stage.price, // 价格
      costRate: stage.costRate / 100 // {成本所占比例}
    }
  })
}
// 获取奖项设置
export function getAwards(lotteryId, stageId) {
  return request({
    url: '/lotteries/' + lotteryId + '/stages/' + stageId + '/awards',
    method: 'get'
  })
}

// 设置奖项
export function setAwards(lotteryId, stageId, awards) {
  // 传递json数据
  request.interceptors.request.use(config => {
    config.headers['content-type'] = 'application/json'
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })
  return request({
    url: '/lotteries/' + lotteryId + '/stages/' + stageId + '/awards',
    method: 'put',
    data: awards
  })
}
