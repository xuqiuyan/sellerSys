import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/order',
    component: () => import('@/views/order/index'),
    name: 'order',
    sellerType: [1]
  },
  {
    path: '/activity',
    component: Layout,
    meta: { title: '活动管理', icon: 'activity', sellerType: [2] },
    children: [
      {
        path: 'activityList',
        name: 'activityList',
        component: () => import('@/views/activity/activityList'),
        meta: { title: '活动列表', sellerType: [2] }
      },
      {
        path: 'nameList',
        name: 'nameList',
        component: () => import('@/views/activity/nameList'),
        meta: { title: '获奖名单', sellerType: [2] }
      }
    ]
  },
  {
    path: '/award',
    component: Layout,
    meta: { title: '抽奖管理', icon: 'huodong', sellerType: [3] },
    children: [
      {
        path: 'index',
        name: 'allAward',
        component: () => import('@/views/award/index'),
        meta: { title: '所有抽奖', sellerType: [3] }
      },
      {
        path: 'setStage',
        name: 'setStage',
        component: () => import('@/views/award/setStage'),
        meta: { title: '阶段设置', sellerType: [3] },
        hidden: true
      },
      {
        path: 'setAward',
        name: 'setAward',
        component: () => import('@/views/award/setAward'),
        meta: { title: '奖项设置', sellerType: [3] },
        hidden: true
      }
    ]
  },
  {
    path: '/verification',
    component: Layout,
    meta: { title: '核销管理', icon: 'activity', sellerType: [2] },
    children: [
      {
        path: 'verificationList',
        name: 'verificationList',
        component: () => import('@/views/verification/verificationList'),
        meta: { title: '核销记录', sellerType: [2] }
      },
      {
        path: 'redPacketList',
        name: 'redPacketList',
        component: () => import('@/views/verification/redPacketList'),
        meta: { title: '红包记录', sellerType: [2] }
      },
      {
        path: 'giftsList',
        name: 'giftsList',
        component: () => import('@/views/verification/giftsList'),
        meta: { title: '礼品记录', sellerType: [2] }
      }
    ]
  },
  {
    path: '/distribution',
    component: Layout,
    meta: { title: '分销管理', icon: 'activity', sellerType: [2] },
    children: [
      {
        path: 'salesManList',
        name: 'salesManList',
        component: () => import('@/views/distribution/salesManList'),
        meta: { title: 'vip管理', sellerType: [2] }
      },
      {
        path: 'channelsList',
        name: 'channelsList',
        component: () => import('@/views/distribution/channelsList'),
        meta: { title: '渠道管理', sellerType: [2] }
      },
      {
        path: 'setDistribution',
        name: 'setDistribution',
        component: () => import('@/views/distribution/setDistribution'),
        meta: { title: '分销设置', sellerType: [2] }
      }
    ]
  },
  {
    path: '/bonuses',
    component: Layout,
    meta: { title: '我的分润', icon: 'shouyi', sellerType: [2] },
    children: [
      {
        path: 'index',
        name: 'bonuses',
        component: () => import('@/views/bonuses/index'),
        meta: { title: '我的分润', icon: 'shouyi', sellerType: [2] }
      }
    ]
  }
]
