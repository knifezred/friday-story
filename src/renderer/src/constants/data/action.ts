export const DefaultActions: Array<Dto.ActionOption> = [
  {
    id: 1,
    text: 'option.finger-guessing',
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
    text: 'option.dice-number',
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
    text: 'option.enter',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'shop',
    name: 'shop'
  },
  {
    id: 4,
    text: 'option.work',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map',
    name: 'work'
  },
  {
    id: 5,
    text: 'option.knocked',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map',
    name: 'knocked',
    conditions: 'hasItem.10'
  },
  {
    text: 'option.story_start',
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
