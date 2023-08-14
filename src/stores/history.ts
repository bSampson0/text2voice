import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { HistoryItem } from '@/models/history-model'

export const useHistoryStore = defineStore('history', () => {
  // how many results to pull from history. Pulling 500 and paginating on front end for now.
  const pageSize = 500
  const isLoading = ref(false)
  const history = ref(<HistoryItem[]>[])
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const API_KEY = import.meta.env.VITE_API_KEY
  const selectedItems = ref(<HistoryItem[]>[])
  const pagination = ref({
    page: 1,
    itemsPerPage: 10
  })

  function getHistory() {
    isLoading.value = true
    fetch(BASE_URL + '?page_size=' + pageSize, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed')
        }
        return response.json()
      })
      .then((data: { history: HistoryItem[] }) => {
        history.value = data.history
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function deleteHistoryItems(items: HistoryItem[]) {
    items.forEach(async (item) => {
      await fetch(`${BASE_URL}/${item.history_item_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': API_KEY
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Request failed')
        }
        selectedItems.value = []
        getHistory()
      })
    })
  }

  function downloadSelected() {
    fetch(BASE_URL + '/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        'Accept-Encoding': 'gzip, deflate, br'
      },
      body: JSON.stringify({
        history_item_ids: selectedItems.value.map((item) => item.history_item_id)
      })
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'downloaded-file.zip' // specify the desired name for the downloaded file
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getHistoryItemAudio(itemId: string) {
    isLoading.value = true
    const url = `${BASE_URL}/${itemId}/audio`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        Accept: 'audio/mpeg'
      }
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
  }

  function trailWithDots(str: string) {
    if (str.length <= 40) {
      return str
    } else {
      const truncatedString = str.substring(0, 40)

      return truncatedString + '...'
    }
  }

  const totalPages = computed(() => Math.ceil(history.value.length / pagination.value.itemsPerPage))

  const paginatedItems = computed(() => {
    const startIndex = (pagination.value.page - 1) * pagination.value.itemsPerPage
    const endIndex = startIndex + pagination.value.itemsPerPage
    console.log(history.value.slice(startIndex, endIndex))
    return history.value.slice(startIndex, endIndex)
  })

  return {
    history,
    getHistory,
    deleteHistoryItems,
    isLoading,
    downloadSelected,
    selectedItems,
    getHistoryItemAudio,
    totalPages,
    paginatedItems,
    trailWithDots,
    pagination
  }
})
