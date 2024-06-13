import ElegantVueRouter from '@elegant-router/vue/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import { RouteMeta } from 'vue-router'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@resources': resolve('resources/')
      }
    },
    plugins: [
      vue(),
      ElegantVueRouter({
        cwd: 'src/renderer',
        pageDir: 'src/renderer/src/views',
        // dtsDir: 'src/renderer/src/typings/elegant-router.d.ts',
        importsDir: 'src/renderer/src/router/elegant/imports.ts',
        alias: {
          '@renderer': 'src/renderer/src'
        },
        layouts: {
          base: 'src/renderer/src/layouts/base-layout/index.vue',
          blank: 'src/renderer/src/layouts/blank-layout/index.vue'
        },
        customRoutes: {
          names: ['exception_403', 'exception_404', 'exception_500']
        },
        onRouteMetaGen(routeName) {
          const key = routeName

          const constantRoutes = ['login', '403', '404', '500']

          const meta: Partial<RouteMeta> = {
            title: key,
            i18nKey: `route.${key}`
          }

          if (constantRoutes.includes(key)) {
            meta.constant = true
          }

          return meta
        }
      })
    ]
  }
})
