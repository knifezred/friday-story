import { useAuthStore } from '@renderer/store/modules/auth'

export function useActionEffect() {
  const authStore = useAuthStore()
  // const appStore = useAppStore()
  // const mapStore = useMapStore()

  // 添加指定物品
  function addItem(value: string) {
    const { 0: name, 1: count } = value.split(',')
    if (authStore.archivedData.items.filter((x) => x.name == name).length > 0) {
      authStore.archivedData.items.filter((x) => x.name == name)[0].count += Number(count)
    } else {
      authStore.archivedData.items.push({
        name: name,
        count: Number(count)
      })
    }
    return {
      name: name,
      count: Number(count)
    }
  }

  return {
    addItem
  }
}
