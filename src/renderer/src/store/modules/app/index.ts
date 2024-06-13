import { SetupStoreId } from '@renderer/enums'
import useBoolean from '@renderer/hooks/common/use-boolean'
import { localStg } from '@renderer/utils/storage'
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core'
import { defineStore } from 'pinia'
import { effectScope, nextTick, onScopeDispose, watch } from 'vue'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const scope = effectScope()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const {
    bool: themeDrawerVisible,
    setTrue: openThemeDrawer,
    setFalse: closeThemeDrawer
  } = useBoolean()
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true)
  const { bool: fullContent, toggle: toggleFullContent } = useBoolean()
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean()
  const {
    bool: siderCollapse,
    setBool: setSiderCollapse,
    toggle: toggleSiderCollapse
  } = useBoolean()
  const {
    bool: mixSiderFixed,
    setBool: setMixSiderFixed,
    toggle: toggleMixSiderFixed
  } = useBoolean(localStg.get('mixSiderFixed') === 'Y')

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  /**
   * Reload page
   *
   * @param duration Duration time
   */
  async function reloadPage(duration = 300) {
    setReloadFlag(false)

    // TODO fix
    const d = duration

    await new Promise((resolve) => {
      setTimeout(resolve, d)
    })

    setReloadFlag(true)
  }

  function init() {
    console.log('app store init')
  }

  // watch store
  scope.run(() => {
    // watch isMobile, if is mobile, collapse sider
    watch(
      isMobile,
      (newValue) => {
        if (newValue) {
          // backup theme setting before is mobile
          localStg.set('backupThemeSettingBeforeIsMobile', {
            layout: 'vertical',
            siderCollapse: siderCollapse.value
          })

          // themeStore.setThemeLayout('vertical')
          setSiderCollapse(true)
        } else {
          // when is not mobile, recover the backup theme setting
          const backup = localStg.get('backupThemeSettingBeforeIsMobile')

          if (backup) {
            nextTick(() => {
              // themeStore.setThemeLayout(backup.layout)
              setSiderCollapse(backup.siderCollapse)

              localStg.remove('backupThemeSettingBeforeIsMobile')
            })
          }
        }
      },
      { immediate: true }
    )
  })

  // cache mixSiderFixed
  useEventListener(window, 'beforeunload', () => {
    localStg.set('mixSiderFixed', mixSiderFixed.value ? 'Y' : 'N')
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  // init
  init()

  return {
    isMobile,
    reloadFlag,
    reloadPage,
    fullContent,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed
  }
})
