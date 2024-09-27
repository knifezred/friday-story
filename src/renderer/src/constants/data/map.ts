import { AreaBaiYuanMaps } from './maps/area-baiyuan'
import { IslandMaps } from './maps/island'

export const DefaultMaps: Array<Dto.MapItem> = [...IslandMaps, ...AreaBaiYuanMaps]
