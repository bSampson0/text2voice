export interface CustomVoice {
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

interface Voice {
  voice_id: string
  name: string
  samples: null | any[]
  category: string
  fine_tuning: FineTuning
}

interface FineTuning {
  language: null | string
  is_allowed_to_fine_tune: boolean
  fine_tuning_requested: boolean
  finetuning_state: string
  verification_attempts: null | any[]
  verification_failures: any[]
  verification_attempts_count: number
  slice_ids: null | any[]
  manual_verification: null | any
  manual_verification_requested: boolean
}
