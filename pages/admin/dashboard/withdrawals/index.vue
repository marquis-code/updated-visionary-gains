<template>
  <main>
    <Transition name="fade">
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
          <b-table striped show-empty responsive :items="filteredWithdrawals" :fields="fields" :busy="loading"
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
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{ data.index + 1 }}
              </div>
            </template>

            <template #cell(amount)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            formatNumberAsDollar(data?.item?.amount) ?? 'N/A'
          }}
              </div>
            </template>

            <template #cell(wallet)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            data?.item?.wallet ?? 'N/A' }}
              </div>
            </template>

            <!-- <template #cell(transactionType)="data">
              <div class="font-medium py-4 text-sm">
                {{ data?.item?.transactionType ?? 'N/A' }}
              </div>
            </template> -->

            <template #cell(transactionStatus)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                <span class="px-3 py-2 rounded-full text-sm"
                  :class="[data?.item?.transactionStatus === 'Pending' ? 'bg-yellow-500 text-white' : data?.item?.transactionStatus === 'Approved' ? 'text-white bg-green-500' : data?.item?.transactionStatus === 'Declined' ? 'text-white bg-red-500' : '']">
                  {{
            data?.item?.transactionStatus ?? 'N/A' }}
                </span>
              </div>
            </template>
            <template #cell(user)="data">
              <div class="font-medium text-sm cursor-pointer flex items-center gap-x-2 py-4">
                <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex text-center justify-center items-center">
                  {{ getInitials(data?.item?.user?.firstName, data?.item?.user?.lastName) }}
                </div>
                <div>
                  <span>
                    {{
            data?.item?.user?.firstName
          }}
                  </span>
                  <span>
                    {{
              data?.item?.user?.lastName
            }}
                  </span><br>
                  <span>
                    {{
              data?.item?.user?.email
            }}
                  </span>
                </div>
              </div>
            </template>

            <template #cell(proof)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data?.item?.proof" class="font-medium py-2 text-sm">
                  <enlargeable-image :src="data.item.proof" class="z-50" animation_duration="700">
                    <img class="h-10 w-10 rounded-full" alt="" :src="data?.item?.proof">
                  </enlargeable-image>
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(timeAdded)="data">
              <div class="font-medium py-4 text-sm">
                {{ formatDateTime(data?.item?.timeAdded) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(actions)="data">
              <div class="py-4">
                <div v-if="data?.item?.transactionStatus === 'Pending'" class="flex items-center gap-x-3">
                  <button class="text-white text-xs bg-green-500 w-full py-1.5 rounded-full"
                    @click="handleAction(data.item, 'approve')">
                    Approve
                  </button>
                  <button class="text-white text-xs bg-red-500 w-full py-1.5 rounded-full"
                    @click="handleAction(data.item, 'reject')">
                    Reject
                  </button>
                </div>
                <div v-else>
                  <button disabled class="bg-black text-white py-2 text-xs px-3 rounded-full">
                    Completed
                  </button>
                </div>
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
export default {
  name: 'WithdrawalList',
  components: {
    EnlargeableImage
  },
  layout: 'dashboards',
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
          key: 'user',
          label: 'User',
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
        // {
        //   key: 'transactionType',
        //   label: 'Transaction Type',
        //   class: 'font-medium text-gray-400 text-sm'
        // },
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
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'font-medium text-end text-gray-400'
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
  computed: {
    filteredWithdrawals() {
      const search = this.search.toLowerCase()
      return this.transactionsList.filter((itm) => {
        return (
          itm?.user.firstName.toLowerCase?.().includes(search) ||
          itm?.user.lastName.toLowerCase?.().includes(search) ||
          itm?.email.toLowerCase?.().includes(search)
        )
      })
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
          getTransactions {
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
            this.transactionsList = data.data.getTransactions.filter(itm => itm.transactionType === 'Withdrawal')
            this.totalRows = this.transactionsList.length
          }
        } finally {
          this.loading = false
        }
      }
    },
    getInitials(firstName, lastName) {
      const firstInitial = firstName ? firstName.charAt(0) : ''
      const lastInitial = lastName ? lastName.charAt(0) : ''
      return `${firstInitial}${lastInitial}`
    },
    formatDateTime(date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }

      if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return date.toLocaleDateString('en-US', options)
      } else {
        return 'Invalid Date'
      }
    },
    handleAction(data, type) {
      Swal.fire({
        title: `${type === 'approve' ? 'Approve' : 'Reject'} Withdrawal`,
        text: "Please Note: You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed!'
      }).then((result) => {
        if (result.value) {
          this.processTransaction(data.id, type)
        } else {
          this.$swal('Cancelled', 'Action was cancelled', 'info')
        }
      })
    },
    async processTransaction(transactionId, status) {
      this.processing = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      const statusType = status === 'approve' ? 'Approved' : status === 'reject' ? 'Declined' : 'Pending'
      try {
        const processTransactionQuery = `
            mutation ProcessTransaction($transactionID: String!, $status: TransactionStatus!) {
              processTransaction(transactionID: $transactionID, status: $status)
            }
          `
        const response = await fetch(
          'https://api.visionarygains.com/graphql/query',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer ' + accessToken
            },
            body: JSON.stringify({
              query: processTransactionQuery,
              variables: {
                transactionID: transactionId,
                status: statusType
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.$toastr.s(`You have successfully ${status === 'approve' ? 'Approved' : 'Rejected'} this transaction.`)
        }
      } finally {
        this.processing = false
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
  transition: all 0.3as cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  transform: scale(0.8);
}
</style>
