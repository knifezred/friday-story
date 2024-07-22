export const DefaultActions: Array<Dto.ActionOption> = [
  {
    name: 'finger-guessing',
    text: 'option.finger-guessing',
    icon: 'fluent-emoji:victory-hand',
    buttonType: 'primary',
    miniGame: 'finger-guessing',
    type: 'mini-game'
  },
  {
    name: 'dice-number',
    text: 'option.dice-number',
    icon: 'streamline-emojis:game-dice',
    buttonType: 'error',
    miniGame: 'dice-number',
    type: 'mini-game'
  },
  {
    name: 'shop',
    text: 'option.enter',
    buttonType: 'primary',
    type: 'shop'
  },
  {
    name: 'work',
    text: 'option.work',
    buttonType: 'primary',
    type: 'map'
  },
  {
    name: 'knocked',
    text: 'option.knocked',
    buttonType: 'primary',
    type: 'map',
    conditions: 'hasItem.10'
  },
  {
    name: 'scene.start',
    text: 'option.story_start',
    next: 'start',
    buttonType: 'primary',
    type: 'story'
  },
  {
    name: 'option.choose_id',
    text: 'option.choose_id',
    next: 'scene.choose_id',
    buttonType: 'primary',
    type: 'story'
  }
]
