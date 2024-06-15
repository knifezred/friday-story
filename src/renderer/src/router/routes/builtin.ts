import type { CustomRoute } from '@elegant-router/types'
import { layouts, views } from '../elegant/imports'
import { getRoutePath, transformElegantRoutesToVueRoutes } from '../elegant/transform'
const { VITE_ROUTE_HOME } = import.meta.env
export const ROOT_ROUTE: CustomRoute = {
  name: 'root',
  path: '/',
  redirect: getRoutePath(VITE_ROUTE_HOME) || getRoutePath('login'),
  meta: {
    title: 'root',
    constant: true
  }
}

const NOT_FOUND_ROUTE: CustomRoute = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: 'layout.blank$view.404',
  meta: {
    title: 'not-found',
    constant: true
  }
}

/** builtin routes, it must be constant and setup in vue-router */
const builtinRoutes: CustomRoute[] = [ROOT_ROUTE, NOT_FOUND_ROUTE]

/** create builtin vue routes */
export function createBuiltinVueRoutes() {
  return transformElegantRoutesToVueRoutes(builtinRoutes, layouts, views)
}
