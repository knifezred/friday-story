import { useTitle } from '@vueuse/core'
import type { Router } from 'vue-router'

export function createDocumentTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { i18nKey, title } = to.meta

    // TODO i18nKey
    const documentTitle = i18nKey ? i18nKey : title

    useTitle(documentTitle)
  })
}
