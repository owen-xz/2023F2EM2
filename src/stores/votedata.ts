import { defineStore } from 'pinia'
import votedata from '../assets/json/votedata.json'

export const useVotedataStore = defineStore('votedata', {
  state: () => ({ 
    // 將省代碼與縣市代碼組合為新縣市代碼欄位
    votedataList: votedata.map(item => {
      const { province, city, ...others } = item
      return {
        city: `${province}${city}`,
        ...others,
      }
    })
  }),
  getters: {
  },
  actions: {
  },
})