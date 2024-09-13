export async function parseRenPyScript(script: string) {
  const fileContent = await window.api.readFile(script)
  const lines = fileContent.split('\n')
  const parsedData: Array<Dto.RenPyScene> = []
  let scene: Dto.RenPyScene = {
    name: '',
    text: [],
    next: '',
    menus: [],
    cover: ''
  }
  const menus: Array<Dto.RenPyMenu> = []
  let menu: Dto.RenPyMenu = {
    name: '',
    options: []
  }
  let tabNum: number = 0
  const normalTab: number = 4
  let optionTab: number = 8
  let currentMenu: string = ''
  lines.forEach((line: string) => {
    // 去除行首行尾的空白字符
    const trimmedLine = line.trim()
    tabNum = line.length - line.trimStart().length
    if (trimmedLine.startsWith('label ')) {
      const labelMatch = trimmedLine.match(/label (\w+):/)
      if (labelMatch) {
        // 匹配时scene不为空，则追加
        if (scene.name != '') {
          scene.menus = menus
          parsedData.push(scene)
        }
        scene = {
          name: labelMatch[1],
          text: [],
          next: '',
          cover: '',
          menus: []
        }
      }
    } else if (trimmedLine.startsWith('scene ')) {
      const sceneMatch = trimmedLine.match(/scene "(.*)"/)
      if (sceneMatch) {
        if (scene != null) {
          scene.text.push('cover=' + sceneMatch[1])
        }
      }
    } else if (trimmedLine.startsWith('$ scene.') && trimmedLine.includes('=')) {
      const sceneOptionMatch = trimmedLine.match(/\$ scene\.(.*?)="(.*?)"/)
      if (sceneOptionMatch) {
        if (scene.name != '') {
          if (['cover', 'name', 'next'].includes(sceneOptionMatch[1])) {
            scene[sceneOptionMatch[1]] = sceneOptionMatch[2] as never
          }
        }
      }
    } else if (trimmedLine.startsWith('jump ')) {
      const nextMatch = trimmedLine.match(/jump (.*)/)
      if (nextMatch) {
        if (tabNum > optionTab) {
          if (menu.options.length > 0) {
            menu.options[menu.options.length - 1].next = nextMatch[1]
          }
        } else {
          scene.next = nextMatch[1]
        }
      }
    }
    // 检查是否是对话行
    else if (trimmedLine.endsWith('"') && trimmedLine.includes(' "')) {
      const sayMatch = trimmedLine.match(/(.*?) "(.*)"/)
      if (sayMatch) {
        if (scene != null) {
          scene.text.push(sayMatch[1] + ': ' + sayMatch[2])
        }
      }
    }
    // 检查是否是文本行
    else if (trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) {
      const sayMatch = trimmedLine.match(/"(.*?)"/)
      if (sayMatch) {
        if (scene != null) {
          if (tabNum == normalTab) {
            scene.text.push(sayMatch[1])
          }
        }
      }
    } else if (trimmedLine.startsWith('menu ')) {
      const menuMatch = trimmedLine.match(/menu (.*):/)
      if (menuMatch) {
        if (scene != null) {
          currentMenu = menuMatch[1]
          scene.text.push('menu=' + menuMatch[1])
          if (menu.name == '') {
            menu.name = menuMatch[1]
          } else {
            menus.push(menu)
            menu = {
              name: menuMatch[1],
              options: []
            }
          }
        }
      }
    }
    // menu选项
    else if (trimmedLine.startsWith('"') && trimmedLine.endsWith(':')) {
      const optionMatch = trimmedLine.match(/"(.*?)":/)
      if (optionMatch) {
        if (scene != null) {
          if (menu.name != '') {
            optionTab = tabNum
            menu.options.push({
              name: currentMenu + '_' + menu.options.length,
              text: optionMatch[1],
              type: 'story',
              effect: {
                type: 'all',
                effects: []
              }
            })
          }
        }
      }
    } else if (trimmedLine.startsWith('$ option.') && trimmedLine.includes('=')) {
      const effectMatch = trimmedLine.match(/\$ option\.(.*?)="(.*?)"/)
      if (effectMatch) {
        if (menu.options.length > 0) {
          if (
            [
              'type',
              'name',
              'next',
              'miniGame',
              'icon',
              'buttonType',
              'isDisabled',
              'locked',
              'isShow',
              'loading',
              'duration',
              'canExecute'
            ].includes(effectMatch[1])
          ) {
            menu.options[menu.options.length - 1][effectMatch[1]] = effectMatch[2] as never
          }
        }
      }
    } else if (trimmedLine == '$ effect.single') {
      if (menu.options.length > 0) {
        menu.options[menu.options.length - 1].effect.type = 'single'
      }
    } else if (trimmedLine.startsWith('$ effect.')) {
      const funMatch = trimmedLine.match(/\$ effect\.(.*?)\("(.*?)"\)(.*?)?/)
      if (funMatch) {
        if (tabNum == optionTab + 4) {
          if (menu.options.length > 0) {
            menu.options[menu.options.length - 1].effect.effects.push({
              type: funMatch[1],
              value: funMatch[2]
            })
            if (funMatch[3] != '') {
              // TODO funMatch[3] 设置其他属性
            }
          }
        }
      }
    }
  })
  return parsedData
}

export function parseRenPyDefine(script: string) {
  const lines = script.split('\n')
  const parsedData: any = [] // 用于存储解析后的数据
  lines.forEach((line: string) => {
    // 去除行首行尾的空白字符
    const trimmedLine = line.trim()
    // 检查是否是角色定义行
    if (trimmedLine.startsWith('define ')) {
      const defineMatch = trimmedLine.match(/define (\w+) = Character\(.*?\)/)
      if (defineMatch) {
        parsedData.push({
          type: 'character',
          name: defineMatch[1],
          // 这里可以进一步解析Character中的参数
          content: defineMatch[0]
        })
      }
    }
  })
}
