export const DefaultActions: Array<Dto.ActionButton> = [
  {
    id: 1,
    text: '石头剪刀布',
    icon: 'fluent-emoji:victory-hand',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    miniGame: 'finger-guessing',
    actionType: 'map'
  },
  {
    id: 2,
    text: '掷骰子',
    icon: 'streamline-emojis:game-dice',
    type: 'error',
    isDisabled: false,
    isShow: true,
    miniGame: 'dice-number',
    actionType: 'map'
  },
  {
    id: 3,
    text: '进入',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    miniGame: 'shop',
    actionType: 'map'
  },
  {
    id: 4,
    text: '工作',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map'
  },
  {
    id: 5,
    text: '敲门',
    type: 'primary',
    isDisabled: false,
    isShow: true,
    actionType: 'map'
  }
]
