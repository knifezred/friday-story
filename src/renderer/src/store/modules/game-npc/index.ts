import { DefaultNpcInfoList } from '@renderer/constants/data/npc'
import { SetupStoreId } from '@renderer/enums'
import { prefixImage } from '@renderer/utils/common'
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
        avatar: prefixImage(npc.avatar, npcType, 'character', '.jpeg'),
        isLocked: npc.isLocked ?? false
      })
    })
  }

  function getNpcProp(id: string, prop: string) {
    const filterNpc = allNPCs.value.filter((x) => x.identity == id)
    if (filterNpc.length > 0) {
      return filterNpc[0][prop]
    } else {
      return ''
    }
  }

  return { allNPCs, defineText, initNpc, getNpcProp }
})
