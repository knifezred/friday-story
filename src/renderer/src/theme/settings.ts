/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light',
  grayScale: false,
  recommendColor: true,
  themeColor: '#646cff',
  otherColor: {
    info: '#c3d94e',
    success: '#40c057',
    warning: '#fab005',
    error: '#fa5252'
  },
  isInfoFollowPrimary: false,
  layout: {
    mode: 'vertical-mix',
    scrollMode: 'content'
  },
  page: {
    animate: true,
    animateMode: 'fade-slide'
  },
  header: {
    height: 42,
    breadcrumb: {
      visible: true,
      showIcon: true
    }
  },
  tab: {
    visible: false,
    cache: true,
    height: 42,
    mode: 'chrome'
  },
  fixedHeaderAndTab: true,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200
  },
  footer: {
    visible: false,
    fixed: false,
    height: 48,
    right: true
  }
}

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {}
