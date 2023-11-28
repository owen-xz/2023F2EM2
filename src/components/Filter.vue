<script setup lang="ts">
import { useAreaStore } from '../stores/area'

const store = useAreaStore()

const clearSelected = () => {
  store.$patch({
    selectedCity: '',
    selectedDist: '',
    selectedVil: '',
  })
}

const changeSelected = (type: string) => {
  store.selectedVil = ''
  if (type === 'city') {
    store.selectedDist = ''
  }
}
</script>

<template>
  <div class="p-6 pb-5 p-lg-0">
    <ul class="nav nav-underline mb-5">
      <li class="nav-item">
        <a class="nav-link active navTitle" aria-current="page" href="#"
          >第15任 總統副總統大選</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link disabled navTitle" aria-disabled="true"
          >第10任 立法委員選舉</a
        >
      </li>
    </ul>
    <div class="d-flex mb-lg-10">
      <div class="row g-0">
        <div class="col-6 col-lg-4 pe-2 mb-2 mb-lg-0">
          <select
            class="form-select me-5"
            v-model="store.selectedCity"
            @change="changeSelected('city')"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.cityList"
              :key="item.city"
              :value="item.city"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="col-6 col-lg-4 pe-2">
          <select
            class="form-select me-5"
            v-model="store.selectedDist"
            :disabled="!store.distList.length"
            @change="changeSelected('dist')"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.distList"
              :key="item.dist"
              :value="`${item.dist}`"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="col-12 col-lg-4 pe-2">
          <select
            class="form-select me-5"
            v-model="store.selectedVil"
            :disabled="!store.vilList.length"
          >
            <option :value="''" selected disabled>請選擇</option>
            <option
              v-for="item in store.vilList"
              :key="item.vil"
              :value="`${item.vil}`"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <button
        class="btn btn-primary text-nowrap d-flex align-items-center"
        @click="clearSelected"
      >
        <span class="d-none d-lg-inline me-2">清除</span>
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 576px) {
  .navTitle {
    font-size: 1rem;
  }
}
@media (max-width: 376px) {
  .navTitle {
    font-size: 0.9rem;
  }
}
</style>
