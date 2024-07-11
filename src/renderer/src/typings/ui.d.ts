declare namespace UI {
  type Type = 'default' | 'tertiary' | 'primary' | 'info' | 'success' | 'warning' | 'error'

  interface ActionButton {
    id: number
    text: string
    icon: string
    type: Type | undefined
    isDisabled: boolean
    isShow: boolean
  }

  interface MapItem {
    id: number
    text: string
    cover: string
    video: string
    icon: string
    isDisabled: boolean
    isShow: boolean
    level: number
  }
}
