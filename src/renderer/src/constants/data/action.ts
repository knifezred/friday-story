export const DefaultActions: Array<Dto.ActionOption> = [
  {
    id: 1,
    text: 'map.action.finger-guessing',
    icon: 'fluent-emoji:victory-hand',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    miniGame: 'finger-guessing',
    actionType: 'mini-game',
    name: 'finger-guessing'
  },
  {
    id: 2,
    text: 'map.action.dice-number',
    icon: 'streamline-emojis:game-dice',
    type: 'error',
    isDisabled: false,
    isShow: true,
    miniGame: 'dice-number',
    actionType: 'mini-game',
    name: 'dice-number'
  },
  {
    id: 3,
    text: 'map.action.enter',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'shop',
    name: 'shop'
  },
  {
    id: 4,
    text: 'map.action.work',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map',
    name: 'work'
  },
  {
    id: 5,
    text: 'map.action.knocked',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map',
    name: 'knocked'
  },
  {
    text: 'map.action.story_start',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    next: 'start',
    actionType: 'story',
    name: 'scene.start'
  },
  {
    name: 'option.choose_id',
    text: 'option.choose_id',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'story',
    next: 'scene.choose_id'
  }
]
