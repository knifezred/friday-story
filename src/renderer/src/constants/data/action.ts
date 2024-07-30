export const DefaultActions: Array<Dto.ActionOption> = [
  {
    name: 'map.next',
    text: 'option.enter',
    buttonType: 'primary',
    type: 'map',
    condition: [
      {
        type: 'and',
        conditions: [
          {
            type: 'hasLocked',
            value: 'map.isLocked',
            result: false
          }
        ],
        for: 'execute'
      }
    ]
  },
  {
    name: 'knocked',
    text: 'option.knocked',
    type: 'map'
  }
]
