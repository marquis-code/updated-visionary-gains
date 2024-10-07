<template>
  <main class="space-y-6">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div class=" lg:col-span-2  border-blue-500">
        <div class="cryptohopper-web-widget" data-id="4"
          data-coins="bitcoin,ethereum,bnb,usd-coin,litecoin,trust-wallet-token" data-numcoins="50" />
      </div>
      <div class="rounded-lg bg-blue-50 border">
        <div class="flex justify-between items-center px-3">
          <div class="py-2">
            <h1 class="text-gray-700 text-sm font-bold">
              Account Balance
            </h1>
            <p class="text-gray-400 text-xl">
              <span class="text-xl text-gray-900">{{ formatNumberAsDollar(userData?.accountBalance) ?? '0.00' }}</span>
            </p>
          </div>
          <div>
            <nuxt-link to="/dashboard/deposit" class="bg-black text-white rounded-md px-3 py-2.5">
              Deposit Funds
            </nuxt-link>
          </div>
        </div>
        <div class="space-y-6">
          <div class="md:flex items-center gap-x-6 p-3 space-y-6 md:space-y-0">
            <div
              class="h-[300px] md:w-1/2 rounded-lg flex justify-between flex-col bg-[url('~/assets/img/trading-stat.jpg')] bg-cover bg-top bg-no-repeat">
              <div class="p-3">
                <div class="rounded-full bg-red-400 p-2 h-10 w-10 flex justify-center items-center">
                  <img src="@/assets/img/money-wallet.png" class="h-7 w-7" alt="">
                </div>
              </div>
              <div class="border-t-[0.4px] border-white">
                <div class="px-3 py-2">
                  <p class="text-white text-xs">
                    Profits
                  </p>
                  <p class="text-lg font-semibold text-white">
                    {{ formatNumberAsDollar(userData?.profit) ?? '0.00' }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="h-[300px] md:w-1/2 rounded-lg flex justify-between flex-col bg-[url('~/assets/img/recession.jpg')] bg-cover bg-top bg-no-repeat">
              <div class="p-3">
                <div class="rounded-full bg-red-400 p-2 h-10 w-10 flex justify-center items-center">
                  <img src="@/assets/img/analytics.png" class="h-7 w-7" alt="">
                </div>
              </div>
              <div class="border-t-[0.4px] border-white">
                <div class="px-3 py-2">
                  <p class="text-white text-xs">
                    Trading
                  </p>
                  <p class="text-lg font-semibold text-white">
                    {{ formatNumberAsDollar(userData?.tradingBalance) ?? '0.00' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class=" bg-white py-10 space-y-4 border border-gray-600 h-[400px] overflow-y-auto">
            <h1 class="text-gray-600 font-bold border-b pb-4 pl-6">
              Recent Transactions
            </h1>
            <div v-if="!loadingTransactions && transactionsList" class="text-gray-100 w-full p-3 rounded-lg">
              <div class="overflow-x-auto w-full">
                <table class="w-full text-xs">
                  <colgroup>
                    <col>
                    <col>
                    <col>
                    <col class="w-24">
                  </colgroup>
                  <thead class="bg-gray-700 sticky top-0">
                    <tr class="text-left">
                      <th class="p-3">
                        Transaction Type
                      </th>
                      <th class="p-3">
                        Date
                      </th>
                      <th class="p-3 text-right">
                        Amount
                      </th>
                      <th class="p-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in transactionsList" :key="index"
                      class="border-b border-opacity-20 border-gray-700 bg-gray-900">
                      <td class="p-3">
                        <p> {{ item?.transactionType }}</p>
                      </td>
                      <td class="p-3">
                        <p>{{ formatDateTime(item?.timeAdded) ?? 'N/A' }}</p>
                      </td>
                      <td class="p-3">
                        <p class="text-gray-400">
                          {{ formatNumberAsDollar(item?.amount) }}
                        </p>
                      </td>
                      <td class="p-3 text-right">
                        <span class="px-3 py-1 font-semibold rounded-md text-white"
                          :class="[item?.transactionStatus === 'Approved' ? 'bg-green-500' : item?.transactionStatus === 'Pending' ? 'bg-yellow-500' : item?.transactionStatus === 'Declined' ? 'bg-red-500' : 'bg-violet-400']">
                          <span> {{ item?.transactionStatus }}</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <loader v-else-if="loadingTransactions" />
            <p v-if="!transactionsList.length && !loadingTransactions" class="text-center font-medium py-20">
              No Transactions Available
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'user-dashboard',
  data() {
    return {
      loading: false,
      userData: {},
      loadingTransactions: false,
      transactionsList: [],
      assetsList: [
        {
          name: 'BTC',
          price: '$214.08',
          rate: '+0.23%',
          balance: '122,356',
          proportion: 75,
          icon: 'binance'
        },
        {
          name: 'ETH',
          price: '$214.08',
          rate: '+0.23%',
          balance: '122,356',
          proportion: 14,
          icon: 'eth'
        }
      ]
    }
  },
  mounted() {
    this.getUserInfo()
    this.fetchTransactions()
  },
  methods: {
    async getUserInfo() {
      this.loading = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      this.loading = true
      const query = `
        query {
          getUser {
            id
            firstName
            lastName
            email
            Status
            PlanType
            accountBalance
            tradingBalance
            profit
            eth
            btc
            timeAdded
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
          this.userData = data.data.getUser
        }
      } finally {
        this.loading = false
      }
    },
    async fetchTransactions() {
      this.loadingTransactions = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      this.loadingTransactions = true
      const query = `
        query {
          getUsersTransactions {
            id
            amount
            wallet
            transactionType
            transactionStatus
            user {
              id
              firstName
              lastName
              email
              Status
              PlanType
              accountBalance
              tradingBalance
              profit
              eth
              btc
              timeAdded
            }
            proof
            timeAdded
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
          this.transactionsList = data.data.getUsersTransactions
        }
      } finally {
        this.loadingTransactions = false
      }
    },
    formatNumberAsDollar(number) {
      return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    formatDateTime(date) {
      // Check if date is a string and convert it to a Date object
      if (typeof date === 'string') {
        date = new Date(date)
      }

      // Check if date is a valid Date object
      if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return date.toLocaleDateString('en-US', options)
      } else {
        return 'Invalid Date'
      }
    }
  }
}
</script>
