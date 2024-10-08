import { DefaultMaps } from '@renderer/constants/data/map'
import { SetupStoreId } from '@renderer/enums'
import { coverWithDefault, prefixImage } from '@renderer/utils/common'
import { useAuthStore } from '../auth'

export async function getDefaultMaps(id: number | undefined) {
  const maps = flattenTree(generateIdAndPid(DefaultMaps, 'root'))
  maps.forEach(async (map) => {
    map.cover = await coverWithDefault(map.cover)
  })
  const authStore = useAuthStore()
  if (id != undefined) {
    maps.forEach((map) => {
      const isShowFlag = authStore.hasFlag(SetupStoreId.GameMap + '.isShow.' + map.id)
      if (isShowFlag != undefined) {
        map.isShow = isShowFlag.value == '1'
      }
    })
  }
  return maps
}

export function generateIdAndPid(tree: any, parentId = 'root') {
  return tree.map((node: any) => {
    const id = parentId + '.' + node.name
    const newNode = {
      ...node,
      id: id,
      pid: parentId
    }
    if (node.children) {
      newNode.children = generateIdAndPid(node.children, id)
    }
    return newNode
  })
}

function flattenTree(tree) {
  const result: Array<Dto.MapItemFull> = []

  function traverse(node) {
    let typeName = node.id
    if (node.level == 'room') {
      typeName = 'building.' + node.name
    }
    const fullMap: Dto.MapItemFull = {
      id: node.id,
      pid: node.pid,
      name: node.name,
      level: node.level,
      title: node.title,
      text: node.desc,
      cover: prefixImage(node.cover, typeName, 'map', '.jpeg'),
      options: node.options,
      icon: node.icon,
      isDisabled: node.isDisabled,
      isShow: node.isShow != false,
      order: node.order,
      isLocked: node.isLocked,
      condition: node.condition,
      next: node.next
    }
    if (node.children != undefined && node.children.length > 0) {
      result.push({
        ...fullMap,
        next: node.children[0].id
      })
    } else {
      result.push({
        ...fullMap,
        next: node.next
      })
    }
    if (node.children) {
      node.children.forEach(traverse)
    }
  }
  tree.forEach(traverse)
  return result
}
