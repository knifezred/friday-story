declare namespace Game {
  namespace Env {
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
