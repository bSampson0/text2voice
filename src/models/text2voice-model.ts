export interface Voice {
  public_owner_id: string
  voice_id: string
  date_unix: number
  name: string
  accent: string
  gender: string
  age: string
  category: string
  description: null | string
  preview_url: string
  usage_character_count_1y: number
  usage_character_count_7d: number
  cloned_by_count: number
}

export interface VoiceResponse {
  has_more: boolean
  last_sort_id: string
  voices: Voice[]
}
