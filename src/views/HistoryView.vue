<script setup lang="ts">
import { onMounted } from 'vue'
import { useHistoryStore } from '../stores/history'
import { storeToRefs } from 'pinia'

const historyStore = useHistoryStore()
const { selectedItems, pagination, totalPages, paginatedItems, history } = storeToRefs(historyStore)

onMounted(() => {
  historyStore.getHistory()
})
</script>

<template>
  <v-container class="container" v-if="history.length > 0">
    <div class="title">
      <h1>Your History</h1>
    </div>
    <v-divider></v-divider>
    <span class="muted">Full list of all your generated samples, ready for download.</span>

    <div class="btn-group">
      <v-btn
        @click="historyStore.deleteHistoryItems(selectedItems)"
        :disabled="!(selectedItems.length > 0)"
        size="small"
        theme="dark"
      >
        Delete Selected
      </v-btn>
      <v-btn
        theme="dark"
        @click="historyStore.downloadSelected()"
        :disabled="!(selectedItems.length > 0)"
        size="small"
      >
        Download Selected
      </v-btn>
    </div>
    <v-table class="history-table" theme="dark">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Voice Name</th>
          <th class="text-left">Text</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="item in paginatedItems" :key="item.history_item_id">
          <td class="checkbox-align">
            <v-checkbox class="chbx" v-model="selectedItems" :value="item" />
          </td>
          <td>{{ historyStore.trailWithDots(item.voice_name) }}</td>
          <td>{{ historyStore.trailWithDots(item.text) }}</td>
          <td>
            <v-btn
              @click="historyStore.getHistoryItemAudio(item.history_item_id)"
              size="small"
              icon="mdi-play"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="pagination.page"
      :length="totalPages"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.btn-group {
  display: flex;
  gap: 20px;
}
.title {
  margin-top: 2rem;
  text-align: left;
}
.muted {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.history-table {
  margin-top: 1rem;
  overflow: visible !important;
}
.checkbox-align {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
th:not(:last-child) {
  border-right: solid 1px #505050;
}
.table-body {
  background-color: #181818;
}
.chbx {
  margin-right: 40px;
}
</style>
