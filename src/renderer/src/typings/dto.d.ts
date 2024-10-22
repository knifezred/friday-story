declare namespace Dto {
  namespace Auth {
    interface LoginToken {
      token: string
      accessToken: string
      refreshToken: string
    }

    interface UserInfo {
      userId: number | undefined
      username: string
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

  type KeyValuePair = {
    key: string
    value: string
  }

  type KeyValueNumPair = {
    key: string
    value: number
  }

  interface ArchivedData {
    worldTime: number
    weather: WeatherType
    money: number
    gold: number
    items: Array<ArchivedItem>
    relationShip: Array<KeyValuePair>
    achievement: Array<string>
    taskStatus: Array<KeyValuePair>
    flags: Array<KeyValuePair>
  }

  // 房间 建筑 街道 区域 城市 国家 地铁
  type MapLevelType = 'room' | 'building' | 'street' | 'area' | 'city' | 'country' | 'metro'

  type TreeBase = {
    id: string
    pid: string
    name: string
    children: TreeBase[]
  }

  interface MapItem {
    name: string
    title: string
    desc: string
    level: MapLevelType
    next?: string
    icon?: string
    isShow?: boolean
    isLocked?: boolean
    isDisabled?: boolean
    order?: number
    options?: Array<ActionOption>
    condition?: ConditionModel
    children?: Array<MapItem>
  }

  interface MapItemFull {
    id: string
    pid: string
    name: string
    title: string
    text: string
    cover: string
    next: string
    icon?: string
    isDisabled?: boolean
    isShow?: boolean
    level: MapLevelType
    order?: number
    options: Array<ActionOption> | undefined
    isLocked?: boolean
    condition?: ConditionModel
    temperature?: number
  }

  interface NpcInfo {
    name: string
    age: number
    gender: UserGender | null
    identity: NpcIdentity
    level: LevelType
    work: string
    relationship: Array<number>
    username: string
    nickname: string
    desc: string
    introduce: string
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

  interface ArchivedItem {
    name: string
    count: number
  }

  type GameItemType = 'other' | 'food' | 'equipment' | 'task' | 'car' | 'material' | 'book'

  interface ItemTypeInfo {
    type: GameItemType
    name: string
  }

  interface GameItemCollection {
    type: GameItemType
    items: Array<GameItem>
  }

  interface GameItem {
    name: string
    level: LevelType
    type?: GameItemType
    title?: string
    desc?: string
    cover?: string
    count?: number
    maxNum?: number
    isLocked?: boolean
    condition?: ConditionModel[]
    effect?: ActionEffectModel
    material?: Array<KeyValueNumPair>
  }

  interface GameItemFull {
    name: string
    level: LevelType
    type: GameItemType
    title: string
    desc: string
    cover: string
    count: number
    maxNum?: number
    isLocked?: boolean
    condition?: ConditionModel[]
    effect?: ActionEffectModel
    material?: Array<KeyValueNumPair>
  }

  interface EquipmentItemFull extends GameItemFull {
    count: number
    selectedCount: number
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
    managerAvatar: string
    money: number
    goods: Array<ShopGoods>
  }

  // 主线 支线 奇遇
  type PlotType = 'main-line' | 'branch-line' | 'adventure'

  interface StoryPlot {
    name: string
    type: PlotType
    cover: string
    script: string
    text: string[]
    nextScene?: string
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
    optionStyle?: string
  }

  interface RenPyScene {
    name: string
    text: string[]
    next: string
    cover: string
    menus: Array<RenPyMenu>
  }

  interface StoryRenpyScene {
    name: string
    scenes: Array<RenPyScene>
  }

  interface RenPyMenu {
    name: string
    tabIndex: number
    options: Array<ActionOptionFull>
  }

  class ActionOption {
    name: string
    text: string
    line: string[]
    type: UnionKey.SceneModule
    condition?: ConditionModel[]
    effect?: ActionEffectModel
    next?: string | undefined
    miniGame?: UnionKey.MiniGameModule | undefined
    icon?: string | undefined
    buttonType?: Type | undefined
    isDisabled?: boolean
    locked?: boolean
    isShow?: boolean
    loading?: boolean
    duration?: number
    canExecute?: boolean
  }

  interface ActionOptionFull extends ActionOption {
    effect: ActionEffectModel
  }

  type ConditionType = 'and' | 'or'
  interface ConditionModel {
    type: ConditionType
    for: 'execute' | 'lock' | 'show'
    conditions: Condition[]
  }
  interface Condition {
    func: (value: string) => boolean
    value: string
    result?: boolean
    text?: string
    success?: string
    failure?: string
  }

  type ConditionResult = {
    success: boolean
    text: string
  }
  type ActionEffectType = 'all' | 'single'
  interface ActionEffectModel {
    type: ActionEffectType
    effects: ActionEffect[]
  }
  interface ActionEffect {
    func: (value: string) => any
    value: string
    result?: boolean
    text?: string
    success?: string
    failure?: string
    notification?: boolean
  }

  interface AchievementModel {
    name: string
    title: string
    desc: string
    cover: string
    unlockCover: string
    star: number
    level: LevelType
    locked: boolean
    isHiding: boolean
    condition?: ConditionModel
  }
}
