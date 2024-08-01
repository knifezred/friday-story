import { SetupStoreId } from '@renderer/enums'
import { $t, setLocale } from '@renderer/locales'
import { setDayjsLocale } from '@renderer/locales/dayjs'
import useBoolean from '@renderer/packages/hooks/use-boolean'
import { router } from '@renderer/router'
import { localStg } from '@renderer/utils/storage'
import { breakpointsTailwind, useBreakpoints, useEventListener, useTitle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { effectScope, nextTick, onScopeDispose, ref, watch } from 'vue'
import { useAuthStore } from '../auth'
import { useGameItemStore } from '../game-item'
import { useStoryStore } from '../game-story'
import { useRouteStore } from '../route'
import { useTabStore } from '../tab'
import { useThemeStore } from '../theme'
import { initProjectSettings } from './shared'

export const useAppStore = defineStore(SetupStoreId.App, () => {
  const themeStore = useThemeStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()
  const authStore = useAuthStore()
  const storyStore = useStoryStore()
  const gameItemStore = useGameItemStore()
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
  // localStg.get('mixSiderFixed') === 'Y'

  /** Is mobile layout */
  const isMobile = breakpoints.smaller('sm')

  // custom start
  const langParams = ref<Game.Env.LangParams>({
    roomEnv: 'coldest',
    playerName: '',
    npc1: '',
    npc2: '',
    value: ''
  })
  const projectSettings = ref<App.Global.ProjectSetting>(initProjectSettings())
  const currentSceneType = ref<UnionKey.SceneModule>('map')
  const currentMiniGame = ref<UnionKey.MiniGameModule>('finger-guessing')
  const temperature = ref(-18.0)
  const fromMoney = ref(0)
  const fromGold = ref(0)
  const optionExecuteNumbers = ref<Array<Game.ActionOption.ActionExecuteNumber>>([])
  function addMoney(money: number) {
    fromMoney.value = authStore.archivedData.money
    authStore.archivedData.money = authStore.archivedData.money + money
  }
  function addGold(gold: number) {
    fromGold.value = authStore.archivedData.gold
    authStore.archivedData.gold = authStore.archivedData.gold + gold
  }
  function coastTime(minutes: number) {
    authStore.archivedData.worldTime += minutes * 60 * 1000
  }

  function changeMusic(src: string) {
    projectSettings.value.bgMusic = src
  }

  function cacheProjectSettings() {
    localStg.set('projectSettings', projectSettings.value)
  }

  function countOptionExecute(name: string) {
    const option = optionExecuteNumbers.value.filter((x) => x.name == name)
    if (option.length > 0) {
      option[0].num += 1
    } else {
      optionExecuteNumbers.value.push({
        name,
        num: 1
      })
    }
  }

  function getOptionExecuteNum(name) {
    const option = optionExecuteNumbers.value.filter((x) => x.name == name)
    if (option.length > 0) {
      return option[0].num
    } else {
      return 0
    }
  }
  // custom end
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
    storyStore.initStory()
    gameItemStore.initShopItems()
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
    mixSiderFixed,
    setMixSiderFixed,
    toggleMixSiderFixed,
    fromMoney,
    fromGold,
    addMoney,
    addGold,
    coastTime,
    currentSceneType,
    currentMiniGame,
    projectSettings,
    changeMusic,
    temperature,
    langParams,
    countOptionExecute,
    getOptionExecuteNum
  }
})
