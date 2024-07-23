export const DefaultActions: Array<Dto.ActionOption> = [
  {
    name: 'map.next',
    text: 'option.enter',
    buttonType: 'primary',
    type: 'map',
    condition: {
      type: 'and',
      conditions: [
        {
          type: 'hasLocked',
          value: 'map.isLocked',
          result: false
        }
      ]
    }
  },
  {
    name: 'knocked',
    text: 'option.knocked',
    type: 'map'
  }
]
