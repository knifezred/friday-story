declare namespace Dto {
  namespace Auth {
    interface LoginToken {
      token: string
      accessToken: string
      refreshToken: string
    }

    interface UserInfo {
      userId: number | undefined
      userName: string
      roles: string[]
      buttons: string[]
      archive: DbArchive
    }
  }
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute

    interface MenuRoute extends ElegantConstRoute {
      id: string
    }

    interface UserRoute {
      routes: MenuRoute[]
      home: import('@elegant-router/types').LastLevelRouteKey
    }
  }

  /** AppUser，用户 */
  type AppUser = Api.Common.CommonRecord<{
    /** 姓名 */
    username?: string
    /** 账号 */
    account?: string
    /** 头像 */
    avatar?: string
    /** 是否删除 */
    deleted?: boolean
    /** 邮箱 */
    email?: string
    /** 主键id */
    id?: number
    /** 是否启锁定 */
    locked?: boolean
    /** 所属部门id */
    organizationId?: number
    /** 密码 */
    password?: string
    /** 电话 */
    phone?: string
  }>
  /** UserDTO */
  type UserDTO = Api.Common.CommonRecord<{
    /** 账号 */
    account: string
    /** 头像 */
    avatar: string
    /** 邮箱 */
    email: string
    /** 是否启锁定 */
    locked: boolean
    /** 所属部门id */
    organizationId: number
    /** 所属部门 */
    organizationName: string
    /** 电话 */
    phone: string
    /** 角色 */
    roles: AllRole[]
    /** 已选择的角色 */
    selectedRoles: Array<number>
    /** 姓名 */
    username: string
  }>

  /** UserModifyDTO */
  type UserModifyDTO = Api.Common.CommonRecord<{
    /** 姓名 */
    username?: string
    /** 账号 */
    account?: string
    /** 头像 */
    avatar?: string
    /** 是否删除 */
    deleted?: boolean
    /** 邮箱 */
    email?: string
    /** 是否启锁定 */
    locked: boolean
    /** 所属部门id */
    organizationId?: number
    /** 密码 */
    password?: string
    /** 电话 */
    phone?: string
    /** 角色 */
    roles?: number[]
  }>

  /**
   * user gender
   *
   * - "1": "male"
   * - "2": "female"
   */
  type UserGender = '1' | '2'

  /** user */
  type User = Api.Common.CommonRecord<{
    username: string
    userGender: UserGender | null
    nickName: string
    phone: string
    email: string
    // roles: string[];
    organizationIds: number[]
    locked: boolean
  }>

  /** AppUserPagedQueryRequest */
  interface AppUserPagedQueryRequest {
    /** 是否锁定 */
    locked?: boolean
    /** 部门 */
    organizationIds?: number[]
    /** 用户姓名 */
    username: string
  }

  /** user search params */
  type UserSearchParams = CommonType.RecordNullable<
    Pick<SystemManage.AppUserPagedQueryRequest, 'username' | 'organizationIds' | 'locked'> &
      CommonSearchParams
  >

  /** user list */
  type UserList = Api.Common.PaginatingQueryRecord<AppUserDTO>

  /** Storage */
  type DbStorage = {
    id?: number
    key: string
    value: string
    createdTime?: number
    updatedTime?: number
  }

  type DbArchive = {
    id?: number
    name: string
    cover: string
    saveTime: number
    totalTime: number
    place: number
    data: string
  }

  type DbArchiveList = Array<DbArchive> | null

  type Type = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

  type WeatherType = 'sun' | 'cloud'

  type LevelType = 'N' | 'R' | 'SR' | 'SSR'

  interface ArchivedData {
    worldTime: number
    weather: WeatherType
    money: number
    gold: number
    items: Array<ArchivedItem>
    relationShip: []
    achievement: Array<number>
    taskStatus: []
  }

  interface ActionButton {
    id: number
    text: string
    icon?: string | undefined
    type: Type | undefined
    isDisabled: boolean
    isShow: boolean
    miniGame?: UnionKey.MiniGameModule | undefined
    actionType: UnionKey.SceneModule
  }

  type MapLevelType = 'room' | 'building' | 'street' | 'area' | 'city' | 'country'

  type MapLockedReasonType = 'no_key' | 'locked_door' | 'no_open'

  interface MapItem {
    id: number
    pid: number
    name: string
    title: string
    text: string
    cover: string
    video?: string
    nextId?: number
    icon?: string
    isDisabled?: boolean
    isShow?: boolean
    level: MapLevelType
    order?: number
    actions: Array<number>
    isLocked?: boolean
    lockedReason?: MapLockedReasonType
  }

  interface NpcInfo {
    id: number
    name: string
    desc: string
    introduce: string
    level: LevelType
    avatar: string
    staticPath: string
    age: number
    gender: UserGender | null
    relationship: Array<number>
    relationshipWithPlayer: string
    isLocked: boolean
  }

  type NpcList = CommonType.RecordNullable<NpcInfo>

  type ArchiveNpcRelationShip = CommonType.RecordNullable<
    Pick<NpcInfo, 'id' | 'relationship', 'relationshipWithPlayer'>
  >
  type GameItemType = 'other' | 'food' | 'equipment' | 'task' | 'car'

  interface GameItem {
    id: number
    name: string
    type: GameItemType
    level: LevelType
    title?: string
    desc?: string
    cover?: string
    count?: number
    maxNum?: number
    isLocked?: boolean
  }

  interface GameItemFull {
    id: number
    name: string
    type: GameItemType
    level: LevelType
    title: string
    desc: string
    cover: string
    count: number
    maxNum?: number
    isLocked?: boolean
  }

  interface ArchivedItem {
    id: number
    count: number
  }

  interface ShopGoods {
    id: number
    price: number
    count: number
    selectedCount?: number
    name?: string
    type?: GameItemType
    level?: LevelType
    title?: string
    desc?: string
    cover?: string
    maxNum?: number
    isLocked?: boolean
  }

  interface ShopGoodsFull extends GameItemFull {
    price: number
    count: number
    selectedCount: number
  }

  // 主线 支线 奇遇
  type PlotType = 'main-line' | 'branch-line' | 'adventure'

  interface StoryPlot {
    id?: number
    name: string
    type: PlotType
    cover: string
    text: string | string[]
    scenes: Array<string>
    conditions?: string | string[]
  }

  interface GameScene {
    id?: number
    name: string
    title: string
    cover: string
    next: string
    options: Array<StoryOption>
  }
  interface StoryOption {
    id?: number
    name: string
    title: string
    text: string
    icon?: string
    next: string
    conditions?: string | string[]
  }
}
