<template>
  <main class="space-y-10">
    <div>
      <h1 class="text-white font-medium">
        Statistics
      </h1>
    </div>
    <div v-if="!loading" class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 ">
      <div v-for="(item, index) in computedStats" :key="index"
        class="h-32 rounded-lg bg-black flex items-center gap-x-3 pl-6">
        <div :class="item.classStyle" class="rounded-full h-10 w-10 flex justify-center items-center">
          <img :src="require(`~/assets/icons/${item.icon}.svg`)" alt="stat icon">
        </div>
        <div>
          <h1 class="text-xl font-medium text-white">
            {{ item.count }}
          </h1>
          <p class="text-xs text-gray-100">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      <loader v-for="itm in 4" :key="itm" />
    </div>
    <div class="lg:flex w-full gap-x-10 pt-6 space-y-6 lg:space-y-0">
      <div class="h-full rounded-lg lg:w-6/12 py-3 bg-gray-200 border space-y-6">
        <div class="flex justify-between items-center px-6">
          <p class="font-medium">
            Active Visitors
          </p>
          <div>
            <select class="border outline-none rounded-md bg-gray-100 text-sm px-3 py-2.5">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
        <graph-3 />
      </div>
      <div class="h-full rounded-lg lg:w-6/12 py-3 bg-gray-200 border space-y-6">
        <div class="flex justify-between items-center px-6">
          <p class="font-medium">
            Wallet Usage
          </p>
          <div>
            <select class="border outline-none rounded-md bg-gray-100 text-sm px-3 py-2.5">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
        <graph-4 />
      </div>
    </div>
    <!-- <graph-4 /> -->
  </main>
</template>

<script>
import Graph4 from '@/components/Graph4.vue'
export default {
  components: {
    Graph4
  },
  layout: 'dashboards',
  data() {
    return {
      stats: {},
      loading: false
    }
  },
  computed: {
    computedStats() {
      return [
        {
          name: 'Total Profit',
          count: `${this.formatNumberAsDollar(this.stats?.totalProfit) ?? 'N/A'}`,
          icon: 'funds',
          classStyle: 'bg-pink-500'
        },
        {
          name: 'Total Withdrawals',
          count: `${this.formatNumberAsDollar(this.stats?.totalWithdrawal) ?? 'N/A'}`,
          icon: 'customers',
          classStyle: 'bg-blue-500'
        },
        {
          name: 'Total Users',
          count: `${this.stats?.totalUsers ?? 'N/A'}`,
          icon: 'users',
          classStyle: 'bg-green-500'
        },
        {
          name: 'Total Deposits',
          count: `${this.formatNumberAsDollar(this.stats?.totalDeposits) ?? 'N/A'}`,
          icon: 'users',
          classStyle: 'bg-yellow-500'
        }
      ]
    }
  },
  mounted() {
    this.fetchAdminStats()
  },
  methods: {
    async fetchAdminStats() {
      this.loading = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        this.loading = true
        const query = `
        query {
          getAdminStats {
            totalProfit
            totalWithdrawal
            totalUsers
            totalDeposits
            tradingBalance
          }
        }
      `

        try {
          const response = await fetch('https://api.visionarygains.com/graphql/query', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify({
              query
            })
          })
          const data = await response.json()
          if (data?.errors) {
            this.$toastr.e(data.errors[0].message)
          } else {
            this.stats = data.data.getAdminStats
          }
        } finally {
          this.loading = false
        }
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    formatNumberAsDollar(number) {
      return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  }
}
</script>

<style></style>
