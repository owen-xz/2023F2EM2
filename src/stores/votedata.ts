import { defineStore } from 'pinia'
// import votedata from '../assets/json/votedata.json'

interface Votedata {
  city: string,
  dist: number,
  vil: number,
  candidate: number,
  quantity: number,
  percentage: number,
  elected: string
}

export const useVotedataStore = defineStore('votedata', {
  state: () => ({ 
    loading: true,
    votedataList: [] as Array<Votedata>,
  }),
  getters: {
  },
  actions: {
    async loadVotedata() {
      try {
        this.loading = true;

        // 使用 import() 異步載入 JSON 檔案
        const module = await import('../assets/json/votedata.json');

        // 載入完成後,將省代碼與縣市代碼組合為新縣市代碼欄位,並將 loading 設置為 false
        this.votedataList = module.default.map(item => {
          const { province, city, ...others } = item;
          return {
            city: `${province}${city}`,
            ...others,
          };
        });
      } catch (error) {
        console.error('Error loading votedata JSON file', error);
        // 載入失敗時也將 loading 設置為 false
      } finally {
        this.loading = false;
      }
    },
  },
})