<template>
  <main>
    <Transition name="fade">
      <!-- <b-container> -->
      <section class="text-white">
        <div class="flex items-center justify-between my-3">
          <button class="outline-none border bg-gray-200 text-black px-3 py-1 rounded-md text-sm" @click="goBack()">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none"
              stroke="#747070" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel">
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        <div class="sm:flex-1 pb-0 mt-3">
          <label for="search" class="sr-only">Search</label>

          <input v-model="search" type="text" placeholder="Search.."
            class="w-full rounded-tr-md rounded-tl-md outline-none bg-white p-3 text-gray-700 transition border focus:border-white focus:outline-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent">
        </div>
        <b-card class="mt-3">
          <b-table striped show-empty responsive :items="transactionsList" :fields="fields" :busy="loading"
            :current-page="currentPage" :per-page="perPage">
            <template #table-busy>
              <div class="text-center my-2 cursor-pointer">
                <b-spinner class="align-middle" />
                <small>Loading...</small>
              </div>
            </template>

            <template #empty>
              <p class="text-center text-sm text-secondary py-2 cursor-pointer">
                {{
            search
              ? `No Transactions found for search value: "${search}"`
              : "No Transactions available"
          }}
              </p>
            </template>

            <template #cell(sn)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{ data.index + 1 }}</span>
              </div>
            </template>

            <template #cell(amount)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            formatNumberAsDollar(data?.item?.amount)
          }}
                </span>
              </div>
            </template>

            <template #cell(wallet)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            data?.item?.wallet }}</span>
              </div>
            </template>

            <template #cell(transactionType)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm">
                  {{ data?.item?.transactionType }}</span>
              </div>
            </template>

            <template #cell(transactionStatus)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm cursor-pointer">
                  {{
            data?.item?.transactionStatus }}</span>
              </div>
            </template>

            <template #cell(proof)="data">
              <div class="py-4">
                <span v-if="data?.item?.proof" class="font-medium py-2 text-sm">
                  <enlargeable-image :src="data.item.proof" class="z-50" animation_duration="700">
                    <img class="h-10 w-10 rounded-full" alt="" :src="data?.item?.proof">
                  </enlargeable-image>
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(timeAdded)="data">
              <div class="py-4">
                <span class="font-medium py-2 text-sm">{{ formatDateTime(data?.item?.timeAdded) }}</span>
              </div>
            </template>
          </b-table>

          <div class="flex justify-end items-end">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="md" class="my-3" />
          </div>
        </b-card>
        <!-- </div> -->
      </section>
      <!-- </b-container> -->
    </Transition>
  </main>
</template>

<script>
import EnlargeableImage from '@diracleo/vue-enlargeable-image'
export default {
  name: 'Objective',
  components: {
    EnlargeableImage
  },
  layout: 'user-dashboard',
  scrollToTop: true,
  data() {
    return {
      transactionsList: [],
      fields: [
        {
          key: 'sn',
          label: 'S/N',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'amount',
          label: 'Amount',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'wallet',
          label: 'Wallet',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'transactionType',
          label: 'Transaction Type',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'transactionStatus',
          label: 'Transaction Status',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'proof',
          label: 'Proof',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'timeAdded',
          label: 'Date',
          class: 'font-medium text-gray-400 text-sm'
        }
      ],
      currentPage: 1,
      perPage: 6,
      search: '',
      showModal: false,
      totalRows: 1,
      loading: false
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.image
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title
        }
      ]
    }
  },
  created() {
    this.fetchTransactions()
  },
  mounted() {
    this.totalRows = this.transactionsList.length
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async fetchTransactions() {
      this.loading = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        this.loading = true
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
            this.totalRows = data.data.getUsersTransactions.length
          }
        } finally {
          this.loading = false
        }
      }
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
    },
    formatNumberAsDollar(number) {
      return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  transform: scale(0.8);
}
</style>
