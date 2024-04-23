import projectSetting from '@renderer/settings/projectSetting'
import type { AppRouteRecordRaw, AppRouteModule } from './../types'

import { PAGE_NOT_FOUND_ROUTE } from './basic'

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach((val) => {
  const mod = val['Router']
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: projectSetting.isAuth ? '/login' : '/index',
  meta: {
    title: 'Root'
  },
  children: [
    {
      path: '/index',
      name: 'Index',
      component: () => import('@renderer/views/Index.vue'),
      meta: {
        title: 'Index'
      }
    }
  ]
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@renderer/views/Login.vue'),
  meta: {
    title: 'login'
  }
}

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute, PAGE_NOT_FOUND_ROUTE]
