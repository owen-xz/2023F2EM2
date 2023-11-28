<script setup lang="ts">
import { onMounted, ref } from 'vue'
import candidate from '../assets/json/candidate.json'
import { useVotedataStore } from '../stores/votedata'
import Chart from 'chart.js/auto'
import { Collapse } from 'bootstrap'

const store = useVotedataStore()
const votedata = store.votedataList
  .filter((item) => {
    return item.city === '00'
  })
  .sort((a, b) => b.candidate - a.candidate)
const overviewData = candidate.map((item, index) => {
  return {
    ...item,
    percentage: votedata[index].percentage,
    quantity: votedata[index].quantity,
  }
})
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

// chart
const voteChartRef = ref()
const presidentChartRef = ref()
onMounted(() => {
  new Chart(presidentChartRef.value, {
    type: 'doughnut',
    data: {
      labels: overviewData.map((item) => item.politycalParty),
      datasets: [
        {
          data: overviewData.map((item) => item.quantity),
          backgroundColor: ['#84CB98', '#8894D8', '#dfa175'],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: '50%',
    },
  })

  new Chart(voteChartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['投票人數', '未投票人數'],
      datasets: [
        {
          data: [14464571, 4846534],
          backgroundColor: ['#262E49', '#D9D9D9'],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: '50%',
    },
  })
})

// collaspe
const overviewCollapseRef = ref()
const isLgScreen = ref(document.body.clientWidth >= 768)
const isCollapseShow = ref(false)
onMounted(() => {
  new Collapse('#overviewCollapse', {
    toggle: document.body.clientWidth >= 768,
  })
  overviewCollapseRef.value.addEventListener('hide.bs.collapse', () => {
    isCollapseShow.value = false
  })
  overviewCollapseRef.value.addEventListener('show.bs.collapse', () => {
    isCollapseShow.value = true
  })
  // .addEventListener('shown.bs.collapse', () => {
  //   isCollapseShow.value = true
  // })
})
</script>

<template>
  <div class="bg-light rounded p-5 mx-6 my-5 m-lg-0 mb-lg-5 d-lg-inline-block">
    <div
      class="d-flex justify-content-between"
      :data-bs-toggle="isLgScreen ? '' : 'collapse'"
      data-bs-target="#overviewCollapse"
    >
      <h5 class="fw-bold">投票概況</h5>
      <i v-if="isCollapseShow" class="bi bi-chevron-down fw-bold d-lg-none"></i>
      <i v-else class="bi bi-chevron-right fw-bold d-lg-none"></i>
    </div>

    <div class="collapse" id="overviewCollapse" ref="overviewCollapseRef">
      <div class="d-flex align-items-center mt-5">
        <div class="chart-wrap mb-5 me-5">
          <canvas ref="voteChartRef"></canvas>
        </div>
        <div class="text-center">
          <p class="h5 fw-bold">74.9%</p>
          <p>投票率</p>
        </div>
      </div>
      <div class="mb-10">
        <p class="mb-2">投票數 <span class="fs-4">14,464,571 票</span></p>
        <p class="mb-2">無效票數 <span class="fs-4">163,631 票</span></p>
        <p class="mb-2">有效票數 <span class="fs-4">14,300,940 票</span></p>
      </div>
      <div>
        <div class="chart-wrap mb-5">
          <canvas ref="presidentChartRef"></canvas>
        </div>
        <table>
          <tr v-for="item in overviewData" :key="item.number">
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
                <p class="fs-4">
                  {{ item.president }}｜{{ item.vicePresident }}
                </p>
              </div>
            </td>
            <td class="pb-2">
              <div
                class="ps-4 border-start border-2 text-nowrap"
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
  </div>
</template>

<style scoped>
.numCircle {
  width: 24px;
  height: 24px;
}
.chart-wrap {
  width: 120px;
}
@media (max-width: 576px) {
  .chart-wrap {
    width: 75%;
  }
}
</style>
