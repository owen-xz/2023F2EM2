<script setup lang="ts">
import { useAreaStore } from './stores/area'
import { useVotedataStore } from './stores/votedata'

import Navbar from './components/Navbar.vue'
import Filter from './components/Filter.vue'
import Map from './components/Map.vue'
import Overview from './components/Overview.vue'
import Tips from './components/Tips.vue'
import Result from './components/Result.vue'

const areaStore = useAreaStore()
const votedataStore = useVotedataStore()
votedataStore.loadVotedata()
</script>

<template>
  <Navbar />
  <div class="p-lg-6" v-if="!votedataStore.loading">
    <Filter />
    <div class="row g-0">
      <div class="col-lg-4">
        <Overview />
      </div>
      <div class="col-lg-4 px-6 px-lg-0">
        <Map />
      </div>
      <div class="col-lg-4">
        <Tips v-if="areaStore.selectedCity === ''" />
        <Result v-else />
      </div>
    </div>
  </div>
  <div class="text-center mt-12" v-else>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div>本網站資料量較大，讀取中請稍後...</div>
  </div>
</template>

<style scoped></style>
