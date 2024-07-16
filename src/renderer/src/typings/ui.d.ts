declare namespace UI {
  type Type = 'default' | 'tertiary' | 'primary' | 'info' | 'success' | 'warning' | 'error'

  interface ActionButton {
    id: number
    text: string
    icon: string
    type: Type | undefined
    isDisabled: boolean
    isShow: boolean
    miniGame: UnionKey.MiniGameModule | undefined
  }

  interface MapItem {
    id: number
    title: string
    text: string
    cover: string
    video: string
    icon: string
    isDisabled: boolean
    isShow: boolean
    level: number
  }
}
