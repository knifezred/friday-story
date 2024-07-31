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

  type DbStorageList = Array<DbStorage> | null

  type DbArchive = {
    id?: number
    name: string
    cover: string
    saveTime: number
    totalTime: number
    place: string
    data: string
  }

  type DbArchiveList = Array<DbArchive> | null

  type Type = 'primary' | 'info' | 'success' | 'warning' | 'error' | 'default'

  type WeatherType = 'sun' | 'cloud'

  type LevelType = 'N' | 'R' | 'SR' | 'SSR'

  interface ArchivedData {
    worldTime: number
    weather: WeatherType
    money: number
    gold: number
    items: Array<ArchivedItem>
    relationShip: []
    achievement: Array<string>
    taskStatus: []
  }

  type MapLevelType = 'room' | 'building' | 'street' | 'area' | 'city' | 'country' | 'metro'

  type TreeBase = {
    id: string
    pid: string
    name: string
    children: TreeBase[]
  }

  interface MapItem {
    name: string
    next?: string
    story?: string
    icon?: string
    text?: string[]
    isDisabled?: boolean
    isShow?: boolean
    level: MapLevelType
    order?: number
    options?: Array<ActionOption>
    isLocked?: boolean
    condition?: ConditionModel
    children?: Array<MapItem>
  }

  interface MapItemFull {
    id: string
    pid: string
    name: string
    next?: string
    title: string
    text: string
    cover: string
    icon?: string
    isDisabled?: boolean
    isShow?: boolean
    level: MapLevelType
    order?: number
    options: Array<ActionOption> | undefined
    isLocked?: boolean //锁门
    condition?: ConditionModel
  }

  interface NpcInfo {
    name: string
    age: number
    gender: UserGender | null
    identity: NpcIdentity
    level: LevelType
    work: string
    relationship: Array<number>
    username?: string
    nickname?: string
    desc?: string
    introduce?: string
    avatar?: string
    isLocked?: boolean
  }
  type MinNpc = Pick<
    NpcInfo,
    'name' | 'age' | 'gender' | 'identity' | 'level' | 'work' | 'relationship'
  >

  interface NpcFull extends MinNpc {
    username: string
    nickname: string
    desc: string
    introduce: string
    avatar: string
    isLocked: boolean
  }

  type NpcIdentity =
    | 'stranger'
    | 'friend'
    | 'enemy'
    | 'sister'
    | 'cousin'
    | 'mon'
    | 'dad'
    | 'son'
    | 'daughter'
  type NpcList = Array<NpcInfo>

  type ArchiveNpcRelationShip = CommonType.RecordNullable<
    Pick<NpcInfo, 'id' | 'relationship' | 'identity'>
  >
  type GameItemType = 'other' | 'food' | 'equipment' | 'task' | 'car' | 'material'

  interface GameItem {
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
    name: string
    count: number
  }

  interface ShopGoods {
    name: string
    price: number
    count: number
    type: GameItemType
    selectedCount?: number
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

  interface ShopEntity {
    name: string
    manager: string
    money: number
    goods: Array<ShopGoods>
  }

  // 主线 支线 奇遇
  type PlotType = 'main-line' | 'branch-line' | 'adventure'

  interface StoryPlot {
    name: string
    type: PlotType
    cover: string
    text: string[]
    nextScene: string
    condition?: ConditionModel
    options?: Array<ActionOption>
  }

  interface GameScene {
    name: string
    title: string
    text: string[]
    cover: string
    next: string
    options: Array<ActionOption>
  }

  interface ActionOption {
    name: string
    text: string
    type: UnionKey.SceneModule
    condition?: ConditionModel[]
    effect?: ActionEffectModel
    next?: string | undefined
    miniGame?: UnionKey.MiniGameModule | undefined
    icon?: string | undefined
    buttonType?: Type | undefined
    isDisabled?: boolean
    loading?: boolean
    locked?: boolean
    canExecute?: boolean
  }

  type ConditionType = 'and' | 'or'
  interface ConditionModel {
    type: ConditionType
    for: 'execute' | 'load'
    conditions: Condition[]
  }
  interface Condition {
    type: string
    value: string
    result?: boolean
    text?: string
    success?: string
    failure?: string
  }

  type ActionEffectType = 'all' | 'single'
  interface ActionEffectModel {
    type: ActionEffectType
    effects: ActionEffect[]
  }
  interface ActionEffect {
    type: string
    value: string
    result?: boolean
    text?: string
    success?: string
    failure?: string
  }
}
