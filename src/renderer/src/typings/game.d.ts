declare namespace Game {
  namespace Env {
    interface LangParams {
      roomEnv: string
      playerName: string
      npc1: string
      npc2: string
      value: string
    }
    interface Interpolation {
      me: Dto.Auth.UserInfo | undefined
      npc: object
    }
    type TemperatureType =
      | 'coldest'
      | 'colder'
      | 'cold'
      | 'suitable'
      | 'warm'
      | 'warmer'
      | 'warmest'
      | 'hot'
  }
  namespace ActionOption {
    interface ActionExecuteNumber {
      name: string
      num: number
    }
  }
}
