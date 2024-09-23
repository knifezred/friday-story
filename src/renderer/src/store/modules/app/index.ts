import { SetupStoreId } from '@renderer/enums'
import { $t, setLocale } from '@renderer/locales'
import { setDayjsLocale } from '@renderer/locales/dayjs'
import useBoolean from '@renderer/packages/hooks/use-boolean'
import { router } from '@renderer/router'
import { localStg } from '@renderer/utils/storage'
import { breakpointsTailwind, useBreakpoints, useEventListener, useTitle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { effectScope, nextTick, onScopeDispose, ref, watch } from 'vue'
import { useGameItemStore } from '../game-item'
import { useMapStore } from '../game-map'
import { useNpcStore } from '../game-npc'
import { useStoryStore } from '../game-story'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { useThemeStore } from '../theme'
import { initProjectSettings } from './shared'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const themeStore = useThemeStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()
  const storyStore = useStoryStore()
  const gameItemStore = useGameItemStore()
  const npcStore = useNpcStore()
  const mapStore = useMapStore()
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
  } = useBoolean(true)
  const { bool: siderHidden, setBool: setSiderHidden, toggle: toggleSiderHidden } = useBoolean()
  // localStg.get('mixSiderFixed') === 'Y'

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  const messagePlacement = ref<
    'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  >('top')

  const projectSettings = ref<App.Global.ProjectSetting>(initProjectSettings())

  function cacheProjectSettings() {
    localStg.set('projectSettings', projectSettings.value)
  }

  /**
   * Reload page
   *
   * @param duration Duration time
   */
  async function reloadPage(duration = 300) {
    setReloadFlag(false)

    const d = themeStore.page.animate ? duration : 40

    await new Promise((resolve) => {
      setTimeout(resolve, d)
    })

    setReloadFlag(true)
  }

  const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN')

  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN'
    },
    {
      label: 'English',
      key: 'en-US'
    }
  ]

  function changeLocale(lang: App.I18n.LangType) {
    locale.value = lang
    setLocale(lang)
    localStg.set('lang', lang)
  }

  /** Update document title by locale */
  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta

    const documentTitle = i18nKey ? $t(i18nKey) : title

    useTitle(documentTitle)
  }

  function init() {
    setDayjsLocale(locale.value)
    mapStore.initMaps()
    storyStore.initStory()
    gameItemStore.initShopItems()
    npcStore.initNpc()
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
            layout: themeStore.layout.mode,
            siderCollapse: siderCollapse.value
          })

          themeStore.setThemeLayout('vertical')
          setSiderCollapse(true)
        } else {
          // when is not mobile, recover the backup theme setting
          const backup = localStg.get('backupThemeSettingBeforeIsMobile')

          if (backup) {
            nextTick(() => {
              themeStore.setThemeLayout(backup.layout)
              setSiderCollapse(backup.siderCollapse)

              localStg.remove('backupThemeSettingBeforeIsMobile')
            })
          }
        }
      },
      { immediate: true }
    )

    // watch locale
    watch(locale, () => {
      // update document title by locale
      updateDocumentTitleByLocale()

      // update global menus by locale
      routeStore.updateGlobalMenusByLocale()

      // update tabs by locale
      tabStore.updateTabsByLocale()

      // sey dayjs locale
      setDayjsLocale(locale.value)
    })
  })

  // cache mixSiderFixed
  useEventListener(window, 'beforeunload', () => {
    cacheProjectSettings()
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
    locale,
    localeOptions,
    changeLocale,
    themeDrawerVisible,
    openThemeDrawer,
    closeThemeDrawer,
    toggleFullContent,
    contentXScrollable,
    setContentXScrollable,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    siderHidden,
    setSiderHidden,
    toggleSiderHidden,
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed,
    projectSettings,
    messagePlacement
  }
})
