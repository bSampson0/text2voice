import type { HistoryItem } from '@/models/history-model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useText2VoiceStore = defineStore('text2voice', () => {
  const value = ref('')
  const totalAvailable = ref(1000)
  const downloadUrl = ref('')
  const downloadFilename = ref('')
  const isLoading = ref(false)
  const voices = ref([])
  const selectedVoice = ref({} as HistoryItem)
  const showPlayer = ref(false)
  const API_KEY = import.meta.env.VITE_API_KEY

  function getVoices() {
    fetch('https://api.elevenlabs.io/v1/voices')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed')
        }
        return response.json()
      })
      .then((data) => {
        selectedVoice.value = data.voices[0]
        voices.value = data.voices
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function text2voice() {
    console.log(selectedVoice.value)
    isLoading.value = true
    downloadUrl.value = ''
    const voiceUrl = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.value.voice_id}`
    fetch(voiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        accept: 'audio/mpeg'
      },
      body: JSON.stringify({
        text: value.value,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed')
        }
        return response.blob()
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        window.open(url, 'download')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const inputLength = computed(() => {
    if (value.value && value.value.length > 0) {
      return value.value.length
    }
    return 0
  })

  const isButtonDisabled = computed(() => {
    return inputLength.value < 10
  })

  return {
    getVoices,
    text2voice,
    showPlayer,
    totalAvailable,
    isLoading,
    downloadUrl,
    downloadFilename,
    value,
    inputLength,
    isButtonDisabled,
    selectedVoice,
    voices
  }
})
