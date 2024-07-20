export const DefaultActions: Array<Dto.ActionButton> = [
  {
    id: 1,
    text: 'map.action.finger-guessing',
    icon: 'fluent-emoji:victory-hand',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    miniGame: 'finger-guessing',
    actionType: 'mini-game'
  },
  {
    id: 2,
    text: 'map.action.dice-number',
    icon: 'streamline-emojis:game-dice',
    type: 'error',
    isDisabled: false,
    isShow: true,
    miniGame: 'dice-number',
    actionType: 'mini-game'
  },
  {
    id: 3,
    text: 'map.action.enter',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'shop'
  },
  {
    id: 4,
    text: 'map.action.work',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map'
  },
  {
    id: 5,
    text: 'map.action.knocked',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map'
  }
]
