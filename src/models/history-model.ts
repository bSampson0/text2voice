export interface Settings {
  similarity_boost: number
  stability: number
  style: number
  use_speaker_boost: boolean
}

export interface HistoryItem {
  history_item_id: string
  request_id: string
  voice_id: string
  voice_name: string
  text: string
  date_unix: number
  character_count_change_from: number
  character_count_change_to: number
  content_type: string
  state: string
  settings: Settings
  feedback: null | any
}
