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
          <b-table striped show-empty responsive :items="filteredUsers" :fields="fields" :busy="loading"
            :current-page="currentPage" :per-page="perPage">
            <template #table-busy>
              <div class="text-center my-2 cursor-pointer">
                <b-spinner class="align-middle" />
                <small>Loading...</small>
              </div>
            </template>

            <template #empty>
              <p class="text-center text-sm text-secondary py-4 cursor-pointer">
                {{
            search
              ? `No User found for search value: "${search}"`
              : "No Users available"
          }}
              </p>
            </template>

            <template #cell(sn)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{ data.index + 1 }}
              </div>
            </template>

            <template #cell(user)="data">
              <div class="font-medium text-sm cursor-pointer flex items-center gap-x-2 py-4">
                <div class="bg-gray-500 text-white rounded-full h-10 w-10 flex text-center justify-center items-center">
                  {{ getInitials(data?.item?.firstName, data?.item?.lastName) }}
                </div>
                <div>
                  <span>
                    {{
            data?.item?.firstName
          }}
                  </span>
                  <span>
                    {{
              data?.item?.lastName
            }}
                  </span><br>
                  <span>
                    {{
              data?.item?.email
            }}
                  </span>
                </div>
              </div>
            </template>
            <template #cell(planType)="data">
              <div class="font-medium py-4 text-sm">
                {{ data?.item?.planType ?? 'N/A' }}
              </div>
            </template>

            <template #cell(accountBalance)="data">
              <div class="font-medium py-4 text-sm cursor-pointer">
                {{
            formatNumberAsDollar(data?.item?.accountBalance) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(tradingBalance)="data">
              <div class="font-medium py-4 text-sm">
                {{ formatNumberAsDollar(data?.item?.tradingBalance) ?? 'N/A' }}
              </div>
            </template>

            <template #cell(profit)="data">
              <div class="font-medium py-4 text-sm">
                {{
            formatNumberAsDollar(data?.item?.profit) ?? 'N/A'
          }}
              </div>
            </template>

            <template #cell(eth)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data.item.eth" class="font-medium py-4 text-sm">
                  {{ data.item.eth }}
                </span>
                <span v-else>N/A</span>
              </div>
            </template>
            <template #cell(btc)="data">
              <div class="font-medium py-4 text-sm">
                <span v-if="data.item.btc" class="font-medium py-4 text-sm">
                  {{ data.item.btc }}
                </span>
                <span v-else>N/A</span>
              </div>
            </template>

            <template #cell(status)="data">
              <div class="font-medium text-sm cursor-pointer px-3 py-4">
                <span
                  :class="[data?.item?.Status === 'Active' ? 'bg-green-500 text-white rounded-md text-sm' : 'bg-red-500 text-white rounded-md text-sm']"
                  class="px-3 py-2">
                  {{
            data?.item?.Status }}
                </span>
              </div>
            </template>
            <template #cell(action)="data">
              <div class="font-medium text-sm cursor-pointer px-3 py-4">
                <img src="@/assets/icons/actions.svg" alt="more" class="cursor-pointer h-10 w-10"
                  @click="handleClick(data.item)">
              </div>
            </template>
          </b-table>

          <div class="flex justify-end items-end">
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" size="md" class="my-3" />
          </div>
        </b-card>
      </section>
    </Transition>
    <b-modal id="updateUserInfo" hide-footer centered hide-header>
      <div class="flex justify-center items-center">
        <h1 class="text-lg font-semibold text-black">
          Update Information
        </h1>
      </div>
      <form class="gap-6 w-full space-y-6 px-6 pb-6" @submit.prevent="updateUserInfo">
        <div class="col-span-6 sm:col-span-6">
          <label for="profit" class="block text-sm font-medium text-gray-700">
            Profit
          </label>

          <input id="profit" v-model="selectedUser.profit" type="number" step="0.01" min="0" name="profit"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="tradingBalance" step="0.01" min="0" class="block text-sm font-medium text-gray-700">
            Trading Balance
          </label>

          <input id="tradingBalance" v-model="selectedUser.tradingBalance" type="number" name="tradingBalance"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="col-span-6 sm:col-span-6">
          <label for="accountBalance" class="block text-sm font-medium text-gray-700">
            Account Balance
          </label>

          <input id="accountBalance" v-model="selectedUser.accountBalance" type="number" step="0.01" min="0"
            name="accountBalance"
            class="mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
        </div>

        <div class="w-full pt-10">
          <button :disabled="processing" type="submit"
            class="bg-black disabled:cursor-not-allowed disabled:opacity-25 w-full text-white py-2.5 rounded-md">{{
            processing ? 'processing' : 'Submit' }}</button>
        </div>
      </form>
    </b-modal>
  </main>
</template>

<script>
export default {
  name: 'UsersList',
  layout: 'dashboards',
  scrollToTop: true,
  data() {
    return {
      selectedUser: {},
      usersList: [],
      processing: false,
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
          key: 'planType',
          label: 'Plan Type',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'accountBalance',
          label: 'Account Balance',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'tradingBalance',
          label: 'Trading Balance',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'profit',
          label: 'Profit',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'eth',
          label: 'Etherium',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'btc',
          label: 'Bitcoin',
          class: 'font-medium text-end text-gray-400'
        },
        {
          key: 'status',
          label: 'Status',
          class: 'font-medium text-gray-400 text-sm'
        },
        {
          key: 'action',
          label: 'Action',
          class: ''
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
  computed: {
    filteredUsers() {
      const search = this.search.toLowerCase()
      return this.usersList.filter((itm) => {
        return (
          itm?.firstName.toLowerCase?.().includes(search) ||
          itm?.lastName.toLowerCase?.().includes(search) ||
          itm?.email.toLowerCase?.().includes(search) ||
          itm?.Status.toLowerCase?.().includes(search)
        )
      })
    }
  },
  created() {
    this.fetchUsers()
  },
  mounted() {
    this.totalRows = this.usersList.length
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async fetchUsers() {
      this.loading = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        this.loading = true
        const query = `
        query {
          getUsers {
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
            this.usersList = data.data.getUsers
            this.totalRows = data.data.getUsers.length
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
    handleClick(data) {
      this.selectedUser = data
      this.$bvModal.show('updateUserInfo')
    },
    async updateUserInfo() {
      this.processing = true
      if (process.client) {
        const accessToken = JSON.parse(window.localStorage.getItem('auth'))
        // const user = JSON.parse(window.localStorage.getItem('user')) 6601d7a9e6b9dbf55606f18e
        try {
          const updateUserMutation = `
          mutation updateUser($userId: String!, $input: UpdateUser!) {
            updateUser(userId: $userId, input: $input) {
              accountBalance
              tradingBalance
              profit
            }
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
                query: updateUserMutation,
                variables: {
                  userId: this.selectedUser.id ?? '',
                  input: {
                    profit: this.selectedUser.profit,
                    tradingBalance: this.selectedUser.tradingBalance,
                    accountBalance: this.selectedUser.accountBalance
                  }
                }
              })
            }
          )
          const data = await response.json()
          if (data?.errors) {
            this.$toastr.e(data.errors[0].message)
          } else {
            this.$toastr.s('User Information was updated successfully')
            this.$bvModal.hide('updateUserInfo')
          }
        } finally {
          this.processing = false
        }
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
