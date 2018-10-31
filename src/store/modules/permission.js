import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(sellerType, route) {
  if (route.meta && route.meta.sellerType) {
    return sellerType === route.meta.sellerType
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param sellerType
 */
function filterAsyncRouter(asyncRouterMap, sellerType) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(sellerType, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, sellerType)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const sellerType = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, sellerType)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
