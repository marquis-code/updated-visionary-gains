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
              <span class="font-medium py-2 text-sm cursor-pointer">
                {{ data.index + 1 }}</span>
            </template>

            <template #cell(amount)="data">
              <span class="font-medium py-2 text-sm cursor-pointer">
                {{
            data?.item?.amount
          }}
              </span>
            </template>

            <template #cell(wallet)="data">
              <span class="font-medium py-2 text-sm cursor-pointer">
                {{
            data?.item?.wallet }}</span>
            </template>

            <template #cell(transactionType)="data">
              <span class="font-medium py-2 text-sm">
                {{ data?.item?.transactionType }}</span>
            </template>

            <template #cell(transactionStatus)="data">
              <span class="font-medium py-2 text-sm cursor-pointer">
                {{
            data?.item?.transactionStatus }}</span>
            </template>

            <template #cell(user)="data">
              <span class="font-medium py-2 text-sm">
                {{ data?.item?.user }}</span>
            </template>

            <template #cell(proof)="data">
              <span class="font-medium py-2 text-sm">{{
            data?.item?.proof
          }}</span>
            </template>

            <template #cell(timeAdded)="data">
              <span class="font-medium py-2 text-sm">{{ data.item.timeAdded }}</span>
            </template>

            <template #cell(actions)="data">
              <b-dropdown size="sm" variant="link" class="position-relative text-center w-100"
                :toggle-class="'text-decoration-none'" :disabled="downloading" :no-caret="true" right>
                <template #button-content>
                  <div class="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </div>
                </template>
                <!-- <b-dropdown-item @click="handleDelete(data.item._id)">
                  <div class="flex items-center space-x-2">
                    <p>
                      <svg
                        class="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d33a21"
                        stroke-width="2"
                        stroke-linecap="square"
                        stroke-linejoin="bevel"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </p>
                    <p class="text-sm">
                      Delete programme
                    </p>
                  </div>
                </b-dropdown-item> -->
              </b-dropdown>
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
export default {
  name: 'Objective',
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
          key: 'user',
          label: 'User',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'proof',
          label: 'Proof',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'timeAdded',
          label: 'Time Addes',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'actions',
          label: 'Actions',
          class: 'font-medium text-end text-gray-400'
        }
      ],
      currentPage: 1,
      perPage: 7,
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
            this.transactionsList = data.data.getTransactions
          }
        } finally {
          this.loading = false
        }
      }
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
