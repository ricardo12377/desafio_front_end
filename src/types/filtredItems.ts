export interface Filtred {
  id: number
  name: string
  active: number | boolean
}

export interface FiltredData {
  success: boolean
  data: {
    index: {
      id: number
      name: string
      active: number | boolean
    }
  }
}

export interface FiltredArray {
  success: boolean
  data: Filtred[]
}
