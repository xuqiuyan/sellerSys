import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }
// function hasPermission(sellerType, permissionsellerType) {
//   if (sellerType) {
//     return sellerType === permissionsellerType
//   } else {
//     return true
//   }
// }
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.sellerType === 0) {
        // store.dispatch('GetInfo').then(res => { // 拉取用户权限信息
        //   const sellerTypes = res.data.data
        //   store.dispatch('GenerateRoutes', sellerTypes).then(() => {
        //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        //     if (store.getters.sellerType === 1) {
        //       next('/order')
        //     } else {
        //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        //     }
        //   })
        // }).catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
        store.dispatch('GetInfo').then(() => { // 拉取用户权限信息
          store.dispatch('GenerateRoutes', 3).then(() => {
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if (store.getters.sellerType === 1) {
              next('/order')
            } else {
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }
          })
        })
        // .catch((err) => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error(err || 'Verification failed, please login again')
        //     next({ path: '/' })
        //   })
        // })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
