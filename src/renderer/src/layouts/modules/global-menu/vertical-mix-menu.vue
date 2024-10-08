<script setup lang="ts">
import { useRouterPush } from '@renderer/hooks/common/router'
import { $t } from '@renderer/locales'
import { useBoolean } from '@renderer/packages/hooks'
import { useAppStore } from '@renderer/store/modules/app'
import { useThemeStore } from '@renderer/store/modules/theme'
import { computed } from 'vue'
import { useMixMenuContext } from '../../context'
import BaseMenu from './base-menu.vue'
import FirstLevelMenu from './first-level-menu.vue'

defineOptions({
  name: 'VerticalMixMenu'
})

const appStore = useAppStore()
const themeStore = useThemeStore()
const { routerPushByKey } = useRouterPush()
const { bool: drawerVisible, setBool: setDrawerVisible } = useBoolean()
const { menus, activeFirstLevelMenuKey, setActiveFirstLevelMenuKey, getActiveFirstLevelMenuKey } =
  useMixMenuContext()

const siderInverted = computed(() => !themeStore.darkMode && themeStore.sider.inverted)

const hasMenus = computed(() => menus.value.length > 0)

const showDrawer = computed(() => hasMenus.value && (drawerVisible.value || appStore.mixSiderFixed))

function handleSelectMixMenu(menu: App.Global.Menu) {
  setActiveFirstLevelMenuKey(menu.key)

  if (menu.children?.length) {
    setDrawerVisible(true)
  } else {
    routerPushByKey(menu.routeKey)
  }
}

function handleResetActiveMenu() {
  getActiveFirstLevelMenuKey()
  setDrawerVisible(false)
}
</script>

<template>
  <div class="h-full flex" @mouseleave="handleResetActiveMenu">
    <FirstLevelMenu
      :active-menu-key="activeFirstLevelMenuKey"
      :inverted="siderInverted"
      @select="handleSelectMixMenu">
      <slot></slot>
    </FirstLevelMenu>
    <div
      class="relative h-full transition-width-300"
      :style="{
        width:
          appStore.mixSiderFixed && hasMenus ? themeStore.sider.mixChildMenuWidth + 'px' : '0px'
      }">
      <DarkModeContainer
        class="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-all-300"
        :inverted="siderInverted"
        :style="{ width: showDrawer ? themeStore.sider.mixChildMenuWidth + 'px' : '0px' }">
        <header
          class="flex-y-center justify-between"
          :style="{ height: themeStore.header.height + 'px' }">
          <h2 class="pl-8px text-16px text-primary font-bold">{{ $t('system.title') }}</h2>
          <PinToggler
            :pin="appStore.mixSiderFixed"
            :class="{ 'text-white:88 !hover:text-white': siderInverted }"
            @click="appStore.toggleMixSiderFixed" />
        </header>
        <BaseMenu :dark-theme="siderInverted" :menus="menus" />
      </DarkModeContainer>
    </div>
  </div>
</template>

<style scoped></style>
