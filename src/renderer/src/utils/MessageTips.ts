export interface SnackbarModel {
  color?: string
  message?: string
  show?: boolean
}

export function infoBar(message: string) {
  const bar: SnackbarModel = {
    show: false,
    color: 'deep-purple-accent-4',
    message: message
  }
  return bar
}
