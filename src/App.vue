<script setup lang="ts">
import { useAreaStore } from './stores/area'

import Navbar from './components/Navbar.vue'
import Filter from './components/Filter.vue'
import Map from './components/Map.vue'
import Overview from './components/Overview.vue'
import Tips from './components/Tips.vue'
import Result from './components/Result.vue'

const store = useAreaStore()
</script>

<template>
  <Navbar />
  <div class="p-lg-6">
    <Filter />
    <div class="row g-0">
      <div class="col-lg-4">
        <Overview />
      </div>
      <div class="col-lg-4 px-6 px-lg-0">
        <Map />
      </div>
      <div class="col-lg-4">
        <Tips v-if="store.selectedCity === ''" />
        <Result v-else />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
