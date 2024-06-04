export function infoBar(message: string) {
  const bar: App.SnackbarModel = {
    show: false,
    color: 'deep-purple-accent-4',
    message: message
  }
  return bar
}
