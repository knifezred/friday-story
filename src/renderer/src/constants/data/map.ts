import { ADarkRoomMaps } from './maps/a-dark-room'
import { AreaBaiYuanMaps } from './maps/area-baiyuan'
import { IslandMaps } from './maps/island'

export const DefaultMaps: Array<Dto.MapItem> = [...ADarkRoomMaps, ...IslandMaps, ...AreaBaiYuanMaps]
