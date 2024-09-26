export const DefaultActions: Array<Dto.ActionOption> = [
  {
    name: 'game.map.next',
    text: 'game.option.enter',
    buttonType: 'primary',
    type: 'map',
    condition: [
      {
        type: 'and',
        conditions: [
          {
            type: 'hasLocked',
            value: 'game.map.isLocked',
            result: false
          }
        ],
        for: 'execute'
      }
    ],
    line: []
  },
  {
    name: 'knocked',
    text: 'game.option.knocked',
    type: 'map',
    line: []
  }
]
