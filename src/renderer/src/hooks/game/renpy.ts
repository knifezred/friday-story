// RULES
// 1. 禁止menu嵌套，可以jump到其他label再次设置menu

const sceneOptionRegex = /\$ scene\.(.*?)="(.*?)"/
const optionRegex = /"(.*?)":/
const optionAttrRegex = /\$ option\.(.*?)="(.*?)"/
const effectRegex = /\$ effect\.(.*?)\("(.*?)"\)(.*?)?/
const tabSize = 4

// 按行解析Renpy脚本
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
    const startText = trimmedLine.split(' ')[0]
    switch (startText) {
      case '#':
        // 注释行，不做处理
        break
      case 'label':
        if (scene.name) {
          scene.menus = menus
          parsedData.push(scene)
          menus = []
        }
        scene = { name: trimmedLine.slice(6, -1), text: [], next: '', menus: [], cover: '' }
        break
      case 'scene':
        // 更换背景
        scene.text.push('cover=' + trimmedLine.slice(7, -1))
        break
      case 'show':
        // 显示角色图像
        scene.text.push('npc=' + trimmedLine.substring(5))
        break
      case 'jump':
        if (inOptionLine(currentTab, optionTab)) {
          const option = getMenuOption(currentMenu, currentMenuOption, menus)
          if (option) {
            option.next = trimmedLine.substring(5)
          } else {
            console.warn(
              `Menu or option not found for setting 'next': ${currentMenu}, ${currentMenuOption}`
            )
          }
        } else {
          scene.next = trimmedLine.substring(5)
        }
        break
      case 'menu':
        currentMenu = trimmedLine.slice(5, -1)
        menus.push({ name: currentMenu, tabIndex: currentTab, options: [] })
        scene.text.push('menu=' + currentMenu)
        break
      case '$':
        // 自定义方法，非renpy自带，暂不支持python脚本
        // $ scene.cover=""
        if (trimmedLine.startsWith('$ scene.')) {
          const match = trimmedLine.match(sceneOptionRegex)
          if (match) {
            scene[match[1]] = match[2]
          }
        }
        // $ option.isDisabled="True"
        else if (trimmedLine.startsWith('$ option.')) {
          const match = trimmedLine.match(optionAttrRegex)
          if (match) {
            const option = getMenuOption(currentMenu, currentMenuOption, menus)
            if (option) {
              option[match[1]] = match[2]
            }
          }
        }
        // $ effect.addFlag("test,1")
        else if (trimmedLine.startsWith('$ effect.')) {
          const option = getMenuOption(currentMenu, currentMenuOption, menus)
          if (option) {
            if (trimmedLine == '$ effect.single') {
              option.effect.type = 'single'
            } else {
              const match = trimmedLine.match(effectRegex)
              if (match) {
                const effect = { type: match[1], value: match[2] }
                if (match[3]) {
                  // TODO 设置其他属性
                }
                option.effect.effects.push(effect)
              }
            }
          }
        }
        break
      default:
        if (trimmedLine.startsWith('"') && trimmedLine.endsWith(':')) {
          // 菜单选项
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
        } else if (trimmedLine.length > 0) {
          if (inOptionLine(currentTab, optionTab)) {
            const currentOption = getMenuOption(currentMenu, currentMenuOption, menus)
            if (currentOption) {
              currentOption.line.push(trimmedLine)
            }
          } else {
            scene.text.push(trimmedLine)
          }
        }
        break
    }
  })
  // 添加最后一个label
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

const dialogueRegex = /"(.*?)" "(.*)"/ // 匹配形如 "speaker" "text" 的字符串
const dialogueOrTextRegex = /(.*?) "(.*)"/ // 匹配形如 anything "text" 的字符串，用于处理没有明确说话者的情况
const textOnlyRegex = /"(.*?)"/ // 仅匹配被双引号包裹的文本
export function say(trimmedLine: string) {
  let match = trimmedLine.match(dialogueRegex) || trimmedLine.match(dialogueOrTextRegex)
  if (match) {
    // TODO Speaker姓名替换
    return {
      speaker: match[1],
      text: match[2]
    }
  }
  // 如果没有匹配到包含说话者的对话，尝试匹配仅包含文本的对话或文本
  match = trimmedLine.match(textOnlyRegex)
  if (match) {
    return {
      speaker: '',
      text: match[1]
    }
  }
  // 如果没有任何匹配，返回空对象
  return {
    speaker: '',
    text: trimmedLine
  }
}
