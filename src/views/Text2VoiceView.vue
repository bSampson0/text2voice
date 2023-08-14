<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useText2VoiceStore } from '../stores/text2voice'
import { onMounted } from 'vue'

const voiceStore = useText2VoiceStore()
const {
  totalAvailable,
  isLoading,
  downloadUrl,
  value,
  inputLength,
  isButtonDisabled,
  selectedVoice,
  voices
} = storeToRefs(voiceStore)

onMounted(() => {
  voiceStore.getVoices()
})
</script>

<template>
  <v-container class="container">
    <div class="title">
      <h1>Text to Speech</h1>
    </div>
    <v-divider></v-divider>
    <span class="muted"
      >Enter up to {{ totalAvailable }} charcters and generate a voice of your choice!</span
    >
    <v-textarea
      :maxlength="totalAvailable"
      class="txt-area"
      v-model="value"
      label="Enter text to generate..."
      counter="true"
    ></v-textarea>

    <span style="align-self: flex-end"
      >{{ inputLength }}/{{ totalAvailable }} characters remaining.</span
    >
    <v-divider class="divide"></v-divider>
    <span class="muted">Select a Voice</span>
    <v-select
      class="voice-select"
      v-model="selectedVoice"
      hint="Over 100 voices to choose from!"
      :items="voices"
      item-title="name"
      item-value="voice_id"
      persistent-hint
      return-object
      single-line
      theme="dark"
    ></v-select>
    <v-divider class="divide"></v-divider>
    <v-btn
      theme="dark"
      class="gen-btn"
      :disabled="isButtonDisabled"
      @click="voiceStore.text2voice()"
      >Generate</v-btn
    >
    <v-divider class="divide"></v-divider>
    <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
    <div class="audio-player" v-if="downloadUrl != ''">
      <AudioPlayer color="transparent" :file="downloadUrl"></AudioPlayer>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.title {
  margin-top: 2rem;
  text-align: left;
}
.txt-area {
  align-self: center;
  margin-top: 1rem;
  width: 100%;
}
.gen-btn {
  width: 120px;
}
.audio-player {
  margin-top: 1rem;
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
}
.divide {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.muted {
  margin-top: 1rem;
}
.voice-select {
  margin-top: 1rem;
}
</style>
