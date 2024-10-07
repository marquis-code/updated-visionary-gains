<template>
  <main>
    <main class="space-y-10">
      <div class="flex justify-between items-center">
        <h1 class="text-white font-medium">
          Overview
        </h1>
        <button type="button" class="px-3 py-2 rounded-full text-white bg-black"
          @click="$bvModal.show('update-profit-modal')">
          Update profit
        </button>
      </div>
      <div v-if="!loading" class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div v-for="(item, index) in computedCards" :key="index"
          class="h-32 rounded-lg bg-black flex items-center justify-between gap-x-3 pl-3 relative">
          <div class="flex items-center gap-x-2">
            <div class="rounded-full h-16 w-16 flex justify-center items-center">
              <img :src="require(`~/assets/img/${item.icon}.png`)" alt="stat icon">
            </div>
            <div>
              <h1 class="text-xl font-medium text-white">
                {{ item.count }}
              </h1>
              <p class="text-2xl text-gray-100">
                {{ item.name }}
              </p>
            </div>
          </div>
          <div v-if="item.value !== 'bank'" class="absolute top-3 right-2 cursor-pointer">
            <button class="flex items-center gap-x-3 border-white border px-3 py-2.5 rounded-md"
              @click="handleWalletModal(item)">
              <span class="text-white">Update</span>
              <img class="cursor-pointer" src="@/assets/icons/more.svg" alt="more">
            </button>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <loader v-for="itm in 3" :key="itm" />
      </div>
    </main>
    <b-modal id="wallet-update" hide-footer centered hide-header>
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          {{ Object.keys(selectedWallet).length ? `Update ${selectedWallet?.walletName} wallet` : 'Update Wallet' }}
        </h1>
      </div>
      <form class="mt-8 gap-6 w-full space-y-6 px-6 pb-6" @submit.prevent="updateWallet">
        <div class="col-span-6 sm:col-span-6">
          <label for="walletName" class="block text-sm font-medium text-gray-700">
            Wallet Name
          </label>

          <select id="walletName" v-model="selectedWallet.value" disabled readonly
            class="mt-1 disabled: cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm">
            <option value="btc">
              BitCoin
            </option>
            <option value="eth">
              Ethereum
            </option>
            <option value="bank">
              Bank
            </option>
          </select>
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="walletAddress" class="block text-sm font-medium text-gray-700">
            Wallet Address
          </label>

          <input id="walletAddress" v-model="selectedWallet.address" type="text" name="walletAddress"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="w-full flex justify-between items-center gap-x-4">
          <button type="button"
            class="w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-xs font-medium text-white transition focus:outline-none focus:ring "
            @click="$bvModal.hide('wallet-update')">
            Cancel
          </button>
          <button type="submit" :disabled="!isFormEmpty || processing"
            class="w-full rounded-md border text-xs disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring">
            {{ processing ? 'saving...' : `Update ${selectedWallet.name} wallet` }}
          </button>
        </div>
      </form>
    </b-modal>

    <b-modal id="update-profit-modal" hide-footer centered hide-header>
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          Update Profit Form
        </h1>
      </div>
      <form class="mt-8 gap-6 w-full space-y-6 px-6 pb-6" @submit.prevent="handleProfitUpdate">
        <div class="col-span-6 sm:col-span-6">
          <label for="status" class="block text-sm font-medium text-gray-700">
            Profit Status
          </label>

          <select id="status" v-model="profitUpdate.status"
            class="mt-1 disabled: cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm">
            <option value="+">
              Increase
            </option>
            <option value="-">
              Decrease
            </option>
          </select>
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="updateAmount" class="block text-sm font-medium text-gray-700">
            Amount
          </label>

          <input id="updateAmount" v-model="profitUpdate.amount" type="tel" name="updateAmount"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="w-full flex justify-between items-center gap-x-4">
          <button type="button"
            class="w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-xs font-medium text-white transition focus:outline-none focus:ring "
            @click="$bvModal.hide('update-profit-modal')">
            Cancel
          </button>
          <button type="submit" :disabled="!isUpdateFormEmpty || processingProfitUpdate"
            class="w-full rounded-md border text-xs disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring">
            {{ processing ? 'saving...' : 'Update profit' }}
          </button>
        </div>
      </form>
    </b-modal>
  </main>
</template>

<script>
export default {
  layout: 'dashboards',
  data() {
    return {
      loading: false,
      showModal: false,
      tradingBalance: '',
      updateProfitStatus: null,
      processingProfitUpdate: false,
      selectedWallet: {},
      profitUpdate: {
        status: '',
        amount: ''
      },
      // stats: [

      // ],
      form: {
        name: '',
        address: ''
      },
      updatedUserData: {},
      processing: false
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.selectedWallet.name && this.selectedWallet.address)
    },
    isUpdateFormEmpty() {
      return !!(this.profitUpdate.amount && this.profitUpdate.status)
    },
    computedCards() {
      return [{
        name: 'Trading Balance',
        value: 'bank',
        walletName: 'Bank Account',
        count: `${this.formatNumberAsDollar(this.tradingBalance) ?? 'N/A'}`,
        address: '',
        icon: 'wallet',
        classStyle: 'bg-green-500'
      }, {
        name: 'BTC',
        value: 'btc',
        walletName: 'BitCoin',
        count: '',
        address: this.updatedUserData?.btc ?? 'N/A',
        icon: 'bit',
        classStyle: 'bg-pink-500'
      },
      {
        name: 'ETH',
        value: 'eth',
        walletName: 'Ethereum',
        count: '',
        address: this.updatedUserData?.eth ?? 'N/A',
        icon: 'eth',
        classStyle: 'bg-blue-500'
      }]
    }
  },
  mounted() {
    this.fetchAdminStats()
    this.getUserInfo()
  },
  methods: {
    handleClick() {
      this.showModal = true
    },
    handleWalletModal(item) {
      this.selectedWallet = item
      this.$bvModal.show('wallet-update')
    },
    async updateWallet() {
      this.processing = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        const user = JSON.parse(window.localStorage.getItem('user'))
        try {
          const updateUserMutation = `
          mutation updateUser($userId: String!, $input: UpdateUser!) {
            updateUser(userId: $userId, input: $input) {
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
          const input = this.selectedWallet.value === 'btc'
            ? {
              btc: this.selectedWallet.address
            }
            : this.selectedWallet.value === 'eth'
              ? {
                eth: this.selectedWallet.address
              }
              : {
                btc: this.selectedWallet.address,
                eth: this.selectedWallet.address
              }
          const response = await fetch(
            'https://api.visionarygains.com/graphql/query',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken
              },
              body: JSON.stringify({
                query: updateUserMutation,
                variables: {
                  userId: user?.id ?? '',
                  input
                }
              })
            }
          )
          const data = await response.json()
          if (data?.errors) {
            this.$toastr.e(data.errors[0].message)
          } else {
            this.$toastr.s(`${this.selectedWallet?.name} wallet address was successfully updated`)
            this.$bvModal.hide('wallet-update')
          }
        } finally {
          this.processing = false
        }
      }
    },
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
            this.tradingBalance = data?.data?.getAdminStats?.tradingBalance
          }
        } finally {
          this.loading = false
        }
      }
    },
    async handleProfitUpdate() {
      this.processingProfitUpdate = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        this.loading = true
        const mutation = `
        mutation {
          updateProfits
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
              query: mutation
            })
          })
          const data = await response.json()
          if (data?.errors) {
            this.$toastr.e(data.errors[0].message)
          } else {
            this.updateProfitStatus = data.data.updateProfits
          }
        } finally {
          this.processingProfitUpdate = false
          this.$bvModal.hide('update-profit-modal')
          this.fetchAdminStats()
        }
      }
    },
    async getUserInfo() {
      this.loading = true
      if (process.client) {
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
            this.updatedUserData = data.data.getUser
          }
        } finally {
          this.loading = false
        }
      }
    },
    formatNumberAsDollar(number) {
      return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  }
}
</script>

<style></style>
