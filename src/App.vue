<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <v-layout>
      <v-app-bar theme="dark" class="nav-bar" density="compact">
        <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template> -->

        <v-app-bar-title
          ><v-icon class="mic" icon="mdi-microphone"></v-icon>Voice Generator</v-app-bar-title
        >

        <v-menu theme="dark">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item to="text2voice" link>
              <v-list-item-title>Text to Speech</v-list-item-title>
            </v-list-item>
            <v-list-item to="history" link>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-layout>
  </header>

  <RouterView />
</template>

<style scoped>
.mic {
  margin-right: 10px;
}
</style>
