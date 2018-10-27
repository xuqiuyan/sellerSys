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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
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
  // {
  //   path: '/financial',
  //   component: Layout,
  //   meta: { title: '财务管理', icon: 'financial', roles: ['admin', 'accountant', 'cashier'] },
  //   children: [
  //     {
  //       path: 'recharges',
  //       name: 'recharges',
  //       component: () => import('@/views/financial/recharges'),
  //       meta: { title: '充值记录', roles: ['admin'] }
  //     },
  //     {
  //       path: 'withdraw/reviews',
  //       name: 'withdrawReviews',
  //       component: () => import('@/views/financial/withdraw/reviews'),
  //       meta: { title: '审核提现', roles: ['admin', 'cashier'] }
  //     },
  //     {
  //       path: 'withdraw/approval',
  //       name: 'withdrawApproval',
  //       component: () => import('@/views/financial/withdraw/approval'),
  //       meta: { title: '审批提现', roles: ['admin', 'accountant'] }
  //     },
  //     {
  //       path: 'withdraw/detail',
  //       name: 'withdrawDetail',
  //       component: () => import('@/views/financial/withdraw/detail/index'),
  //       meta: { title: '提现详情', roles: ['admin', 'cashier', 'accountant'] },
  //       hidden: true
  //     },
  //     {
  //       path: 'index',
  //       name: 'liushui',
  //       component: () => import('@/views/financial/index'),
  //       meta: { title: '资金流水', roles: ['admin'] }
  //     },
  //     {
  //       path: 'bankcard',
  //       name: 'bankcard',
  //       component: () => import('@/views/financial/bankcard'),
  //       meta: { title: '银行卡管理', roles: ['admin'] }
  //     },
  //     {
  //       path: 'bonuses/index',
  //       name: 'bonuses',
  //       component: () => import('@/views/financial/bonuses/index'),
  //       meta: { title: '邀请奖励', roles: ['admin'] }
  //     },
  //     {
  //       path: 'bonuses/detail',
  //       name: 'bonusesDetail',
  //       component: () => import('@/views/financial/bonuses/detail/index'),
  //       meta: { title: '奖励详情', roles: ['admin'] },
  //       hidden: true
  //     },
  //     {
  //       path: 'pullout',
  //       name: 'pullout',
  //       component: () => import('@/views/financial/pullout'),
  //       meta: { title: '智能导出', roles: ['admin'] }
  //     }
  //   ]
  // },
  // {
  //   path: '/account',
  //   component: Layout,
  //   meta: { title: '账号管理', icon: 'financial', roles: ['admin'] },
  //   children: [{
  //     path: 'changePwd',
  //     name: 'changePwd',
  //     component: () => import('@/views/account/changePwd'),
  //     meta: { title: '修改密码', icon: 'financial', roles: ['admin'] }
  //   }]
  // },
  // {
  //   path: '/member',
  //   component: Layout,
  //   meta: { title: '会员管理', icon: 'bonuses', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'member',
  //       component: () => import('@/views/member/index'),
  //       meta: { title: '会员管理', icon: 'member' }
  //     }
  //   ]
  // },
  // {
  //   path: '/redPacket',
  //   component: Layout,
  //   meta: { title: '红包管理', icon: 'redpacket', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'redPacketSet',
  //       name: 'redPacketSet',
  //       component: () => import('@/views/redPacket/redPacketSet'),
  //       meta: { title: '红包设置' }
  //     },
  //     {
  //       path: 'redPacketList',
  //       name: 'redPacketList',
  //       component: () => import('@/views/redPacket/redPacketList'),
  //       meta: { title: '发放列表' }
  //     },
  //     {
  //       path: 'redPacketSend',
  //       name: 'redPacketSend',
  //       component: () => import('@/views/redPacket/redPacketSend'),
  //       meta: { title: '发放红包' }
  //     }
  //   ]
  // },
  // {
  //   path: '/Content',
  //   component: Layout,
  //   meta: { title: '内容审核', icon: 'content', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'company',
  //       name: 'company',
  //       component: () => import('@/views/Content/company'),
  //       meta: { title: '合作伙伴' }
  //     },
  //     {
  //       path: 'news',
  //       name: 'news',
  //       component: () => import('@/views/Content/news'),
  //       meta: { title: '资讯管理' }
  //     },
  //     {
  //       path: 'ads',
  //       name: 'ads',
  //       component: () => import('@/views/Content/ads'),
  //       meta: { title: '首页广告' }
  //     },
  //     {
  //       path: 'activity',
  //       name: 'activity',
  //       component: () => import('@/views/Content/activity'),
  //       meta: { title: '活动管理' }
  //     }
  //   ]
  // },
  // {
  //   path: '/bonusRules',
  //   component: Layout,
  //   meta: { title: '积分规则', icon: 'jifen', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'bonusRulesSet',
  //       name: 'bonusRulesSet',
  //       component: () => import('@/views/bonusRules/bonusRulesSet'),
  //       meta: { title: '规则设置' }
  //     },
  //     {
  //       path: 'bonusRecord',
  //       name: 'bonusRecord',
  //       component: () => import('@/views/bonusRules/bonusRecord'),
  //       meta: { title: '积分记录' }
  //     }
  //   ]
  // },
  // {
  //   path: '/admin',
  //   component: Layout,
  //   meta: { title: '管理员设置', icon: 'admin', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'adminList',
  //       name: 'adminList',
  //       component: () => import('@/views/admin/adminList'),
  //       meta: { title: '管理员列表' }
  //     },
  //     {
  //       path: 'adminRole',
  //       name: 'adminRole',
  //       component: () => import('@/views/admin/adminRole'),
  //       meta: { title: '管理角色' }
  //     }
  //   ]
  // },
  // {
  //   path: '/appManager',
  //   component: Layout,
  //   meta: { title: 'app管理', icon: 'app', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'personalPush',
  //       name: 'personalPush',
  //       component: () => import('@/views/appManager/personalPush'),
  //       meta: { title: '个人推送', roles: ['admin'] }
  //     },
  //     {
  //       path: 'personalPushList',
  //       name: 'personalPushList',
  //       component: () => import('@/views/appManager/personalPushList'),
  //       meta: { title: '个推记录', roles: ['admin'] }
  //     },
  //     {
  //       path: 'appUpload',
  //       name: 'appUpload',
  //       component: () => import('@/views/appManager/appUpload'),
  //       meta: { title: 'app上传', roles: ['admin'] }
  //     },
  //     {
  //       path: 'appUploadList',
  //       name: 'appUploadList',
  //       component: () => import('@/views/appManager/appUploadList'),
  //       meta: { title: 'app上传列表', roles: ['admin'] }
  //     }
  //   ]
  // },
  {
    path: '/activity',
    component: Layout,
    meta: { title: '活动管理', icon: 'activity', roles: ['admin'] },
    children: [
      {
        path: 'activityList',
        name: 'activityList',
        component: () => import('@/views/activity/activityList'),
        meta: { title: '活动列表', roles: ['admin'] }
      },
      {
        path: 'nameList',
        name: 'nameList',
        component: () => import('@/views/activity/nameList'),
        meta: { title: '获奖名单', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/setReward',
    component: Layout,
    meta: { title: '奖项设置', icon: 'activity', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'setReward',
        component: () => import('@/views/setReward/index'),
        meta: { title: '奖项设置', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/verification',
    component: Layout,
    meta: { title: '核销管理', icon: 'activity', roles: ['admin'] },
    children: [
      {
        path: 'verificationList',
        name: 'verificationList',
        component: () => import('@/views/verification/verificationList'),
        meta: { title: '核销记录', roles: ['admin'] }
      },
      {
        path: 'redPacketList',
        name: 'redPacketList',
        component: () => import('@/views/verification/redPacketList'),
        meta: { title: '红包记录', roles: ['admin'] }
      },
      {
        path: 'giftsList',
        name: 'giftsList',
        component: () => import('@/views/verification/giftsList'),
        meta: { title: '礼品记录', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/distribution',
    component: Layout,
    meta: { title: '分销管理', icon: 'activity', roles: ['admin'] },
    children: [
      {
        path: 'salesManList',
        name: 'salesManList',
        component: () => import('@/views/distribution/salesManList'),
        meta: { title: '推广员管理', roles: ['admin'] }
      },
      {
        path: 'channelsList',
        name: 'channelsList',
        component: () => import('@/views/distribution/channelsList'),
        meta: { title: '渠道管理', roles: ['admin'] }
      },
      {
        path: 'setDistribution',
        name: 'setDistribution',
        component: () => import('@/views/distribution/setDistribution'),
        meta: { title: '分销设置', roles: ['admin'] }
      }
    ]
  }
]
