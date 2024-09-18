import { DefaultNpcInfoList } from '@renderer/constants/data/npc'
import { SetupStoreId } from '@renderer/enums'
import { localeText, prefixImage } from '@renderer/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNpcStore = defineStore(SetupStoreId.GameNpc, () => {
  const allNPCs = ref<Array<Dto.NpcFull>>([])
  const defineText = ref<string>('')

  async function initNpc() {
    defineText.value = await window.api.readFile('/static/scripts/define.rpy')
    allNPCs.value = []
    DefaultNpcInfoList.forEach((npc) => {
      const npcType = (npc.gender == '1' ? 'male.' : 'female.') + npc.name
      allNPCs.value.push({
        ...npc,
        username: localeText(npc.username, npcType, 'game.character', 'username'),
        nickname: localeText(npc.nickname, npcType, 'game.character', 'nickname'),
        desc: localeText(npc.desc, npcType, 'game.character', 'desc'),
        introduce: localeText(npc.introduce, npcType, 'game.character', 'introduce'),
        avatar: prefixImage(npc.avatar, npcType, 'character', '.jpeg'),
        isLocked: npc.isLocked ?? false
      })
    })
  }

  return { allNPCs, defineText, initNpc }
})
