<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useAreaStore } from '../stores/area'
import { useVotedataStore } from '../stores/votedata'
import candidate from '../assets/json/candidate.json'

type VotedataStoreType = ReturnType<typeof useVotedataStore>

const areaStore = useAreaStore()
const votedataStore = useVotedataStore()

const selectedCityName = computed(() => {
  const city = areaStore.cityList.find((item) => {
    return item.city === areaStore.selectedCity
  })
  return city?.name
})
const selectedCityData = computed(() => {
  return votedataStore.votedataList.filter((item) => {
    return (
      item.city === areaStore.selectedCity && item.dist === 0 && item.vil === 0
    )
  })
})

const selectedDistName = computed(() => {
  const dist = areaStore.distList.find((item) => {
    return `${item.dist}` === areaStore.selectedDist
  })
  return dist?.name
})
const selectedDistData = computed(() => {
  return votedataStore.votedataList.filter((item) => {
    return (
      item.city === areaStore.selectedCity &&
      `${item.dist}` === areaStore.selectedDist &&
      item.vil === 0
    )
  })
})

const selectedVilName = computed(() => {
  const vil = areaStore.vilList.find((item) => {
    return `${item.vil}` === areaStore.selectedVil
  })
  return vil?.name
})
const selectedVilData = computed(() => {
  return votedataStore.votedataList.filter((item) => {
    return (
      item.city === areaStore.selectedCity &&
      `${item.dist}` === areaStore.selectedDist &&
      `${item.vil}` === areaStore.selectedVil
    )
  })
})

// 組合 candidate 與 votedata
const filterVotedata = (data: VotedataStoreType['votedataList']) => {
  const sortedData = data.sort((a, b) => b.candidate - a.candidate)
  return candidate.map((item, index) => {
    return {
      ...item,
      percentage: sortedData[index].percentage,
      quantity: sortedData[index].quantity,
    }
  })
}

// 篩選出當選的號碼
const filterElectedNum = (data: VotedataStoreType['votedataList']) => {
  return data.sort((a, b) => b.percentage - a.percentage)[0].candidate
}

const filterClass = (num: number) => {
  switch (num) {
    case 3:
      return 'green'
    case 2:
      return 'blue'
    case 1:
      return 'brown'
  }
}
</script>

<template>
  <div
    class="result-wrap d-flex flex-lg-column align-items-lg-end p-6 pt-0 p-lg-0 my-5 m-lg-0"
  >
    <div
      class="result border border-2 rounded px-5 py-3 me-5 me-lg-0 mb-lg-5"
      :class="`border-${filterClass(
        filterElectedNum(selectedCityData)
      )} bg-${filterClass(filterElectedNum(selectedCityData))}Bg`"
      v-if="areaStore.selectedCity"
    >
      <h4 class="fw-bold mb-3">{{ selectedCityName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedCityData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="result border border-2 rounded px-5 py-3 me-5 me-lg-0 mb-lg-5"
      :class="`border-${filterClass(
        filterElectedNum(selectedDistData)
      )} bg-${filterClass(filterElectedNum(selectedDistData))}Bg`"
      v-if="areaStore.selectedDist"
    >
      <h4 class="fw-bold mb-3">{{ selectedDistName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedDistData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="result border border-2 rounded px-5 py-3"
      :class="`border-${filterClass(
        filterElectedNum(selectedVilData)
      )} bg-${filterClass(filterElectedNum(selectedVilData))}Bg`"
      v-if="areaStore.selectedVil"
    >
      <h4 class="fw-bold mb-3">{{ selectedVilName }}</h4>
      <table>
        <tr v-for="item in filterVotedata(selectedVilData)" :key="item.number">
          <td class="pb-2">
            <div
              class="numCircle rounded-circle d-flex justify-content-center align-items-center text-white"
              :class="`bg-${filterClass(item.number)}`"
            >
              {{ item.number }}
            </div>
          </td>
          <td class="pb-2">
            <div class="px-4 text-nowrap">
              <p class="fw-bold">{{ item.politycalParty }}</p>
              <p class="fs-4">{{ item.president }}｜{{ item.vicePresident }}</p>
            </div>
          </td>
          <td class="pb-2">
            <div
              class="ps-4 border-start border-green border-2 text-nowrap"
              :class="`border-${filterClass(item.number)}`"
            >
              <p class="fw-bold">{{ item.percentage }} %</p>
              <p class="fs-4">{{ item.quantity.toLocaleString() }} 票</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .result-wrap {
    overflow-x: scroll;
  }
}
.result {
  width: 260px;
}
.numCircle {
  width: 24px;
  height: 24px;
}
</style>
