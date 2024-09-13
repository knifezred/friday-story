const labelRegex = /label (\w+):/
const sceneRegex = /scene "(.*)"/
const sceneOptionRegex = /\$ scene\.(.*?)="(.*?)"/
const jumpRegex = /jump (.*)/
const dialogueRegex = /(.*?) "(.*)"/
const textRegex = /"(.*?)"/
const menuRegex = /menu (.*):/
const optionRegex = /"(.*?)":/
const optionAttrRegex = /\$ option\.(.*?)="(.*?)"/
const effectRegex = /\$ effect\.(.*?)\("(.*?)"\)(.*?)?/
const tabSize = 4
export async function parseRenPyScript(script: string): Promise<Array<Dto.RenPyScene>> {
  const fileContent = await window.api.readFile(script)
  const lines = fileContent.split('\n')
  const parsedData: Array<Dto.RenPyScene> = []
  let menus: Array<Dto.RenPyMenu> = []
  let scene: Dto.RenPyScene = {
    name: '',
    text: [],
    next: '',
    menus: [],
    cover: ''
  }
  let currentMenu: string = ''
  let currentMenuOption: string = ''
  let optionTab: number = 0
  let currentTab: number = 0
  lines.forEach((line) => {
    const trimmedLine = line.trim()
    currentTab = line.length - line.trimStart().length
    if (trimmedLine.startsWith('label ')) {
      const match = trimmedLine.match(labelRegex)
      if (match) {
        if (scene.name) {
          scene.menus = menus
          parsedData.push(scene)
          menus = []
        }
        scene = { name: match[1], text: [], next: '', menus: [], cover: '' }
      }
    } else if (trimmedLine.startsWith('scene ')) {
      const match = trimmedLine.match(sceneRegex)
      if (match) {
        scene.text.push('cover=' + match[1])
      }
    } else if (trimmedLine.startsWith('$ scene.') && trimmedLine.includes('=')) {
      const match = trimmedLine.match(sceneOptionRegex)
      if (match) {
        scene[match[1]] = match[2]
      }
    } else if (trimmedLine.startsWith('jump ')) {
      const match = trimmedLine.match(jumpRegex)
      if (match) {
        if (inOptionLine(currentTab, optionTab)) {
          const option = getMenuOption(currentMenu, currentMenuOption, menus)
          if (option) {
            option.next = match[1]
          } else {
            console.warn(
              `Menu or option not found for setting 'next': ${currentMenu}, ${currentMenuOption}`
            )
          }
        } else {
          scene.next = match[1]
        }
      }
    } else if (trimmedLine.endsWith('"') && trimmedLine.includes(' "')) {
      const match = trimmedLine.match(dialogueRegex)
      if (match) {
        // todo match[1] 替换姓名
        scene.text.push(`${match[1]}: ${match[2]}`)
      }
    } else if (trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) {
      const match = trimmedLine.match(textRegex)
      if (match) {
        if (inOptionLine(currentTab, optionTab)) {
          const currentOption = getMenuOption(currentMenu, currentMenuOption, menus)
          if (currentOption) {
            currentOption.line.push(match[1])
          }
        } else {
          scene.text.push(match[1])
        }
      }
    } else if (trimmedLine.startsWith('menu ')) {
      const match = trimmedLine.match(menuRegex)
      if (match) {
        currentMenu = match[1]
        const menu = { name: currentMenu, tabIndex: currentTab, options: [] }
        menus.push(menu)
        scene.text.push('menu=' + currentMenu)
      }
    } else if (trimmedLine.startsWith('"') && trimmedLine.endsWith(':')) {
      const match = trimmedLine.match(optionRegex)
      if (match) {
        const menu = getMenu(currentMenu, menus)
        if (menu) {
          const option = {
            name: `${currentMenu}_${menu.options.length}`,
            text: match[1],
            line: [],
            type: 'story',
            effect: { type: 'all', effects: [] }
          } as Dto.ActionOptionFull
          currentMenuOption = option.name
          optionTab = currentTab
          menu.options.push(option)
        }
      }
    } else if (trimmedLine.startsWith('$ option.') && trimmedLine.includes('=')) {
      const match = trimmedLine.match(optionAttrRegex)
      if (match) {
        const option = getMenuOption(currentMenu, currentMenuOption, menus)
        if (option) {
          option[match[1]] = match[2]
          if (match[3]) {
            // TODO 设置其他属性
          }
        }
      }
    } else if (trimmedLine == '$ effect.single') {
      const option = getMenuOption(currentMenu, currentMenuOption, menus)
      if (option) {
        option.effect.type = 'single'
      }
    } else if (trimmedLine.startsWith('$ effect.')) {
      const match = trimmedLine.match(effectRegex)
      if (match && menus.length > 0) {
        const effect = { type: match[1], value: match[2] }
        const option = getMenuOption(currentMenu, currentMenuOption, menus)
        if (option) {
          option.effect.effects.push(effect)
        }
      }
    }
  })

  if (scene.name) {
    scene.menus = menus
    parsedData.push(scene)
  }

  return parsedData
}

// 获取菜单
function getMenu(menuName: string, menus: Array<Dto.RenPyMenu>) {
  const menu = menus.find((menu) => menu.name === menuName)
  return menu
}

// 获取菜单选项
function getMenuOption(menuName: string, optionName: string, menus: Array<Dto.RenPyMenu>) {
  const menu = getMenu(menuName, menus)
  if (!menu) return null
  const option = menu.options.find((option) => option.name === optionName)
  return option
}

// 是否在菜单选项行
function inOptionLine(currentTab: number, optionTab: number) {
  return optionTab > 0 && currentTab == optionTab + tabSize
}

export function parseRenPyDefine(script: string) {
  const lines = script.split('\n')
  const parsedData: any = []
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
