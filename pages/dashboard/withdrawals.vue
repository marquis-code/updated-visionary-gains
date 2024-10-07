<template>
  <main class="lg:flex justify-start items-start gap-x-10 space-y-10 lg:space-y-0">
    <section class="bg-white lg:w-5/12 rounded-md border">
      <p class="border-b text-sm font-semibold py-4 pl-6">
        Enter amount and upload proof of payment
      </p>
      <form class="p-6 space-y-6" @submit.prevent="handleWithdrawal">
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Amount</label>
          <input v-model="form.amount" placeholder="Enter amount in USD" type="number"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
        </div>
        <div class="space-y-4">
          <label class="text-xs text-gray-700 font-medium">Withdrawal Type</label>
          <select v-model="form.withdrawalType"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
            <option value="" disabled>
              ---- Select withdrawal type -----
            </option>
            <option value="bitcoin">
              Bitcoin
            </option>
            <option value="ethereum">
              Etheruem
            </option>
            <option value="bank">
              Bank Account
            </option>
          </select>
          <!-- <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Wallet address</label>
            <input readonly :value="computedWalletAddress" class="py-2.5 bg-gray-100 cursor-not-allowed border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
          </div> -->
          <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Wallet address</label>
            <input v-model="form.wallet"
              class="py-3 bg-gray-50 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
          </div>
          <div class="w-full pt-6">
            <button :disabled="!isFormEnabled || processing"
              class="w-full text-white disabled:cursor-not-allowed disabled:opacity-25  bg-black py-3 px-3 rounded-md">
              {{ processing ? 'processing..' : 'Submit' }}
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import ApiLoader from '@/components/ApiLoader.vue'
export default {
  components: { ApiLoader },
  layout: 'user-dashboard',
  data() {
    return {
      depositType: '',
      imagePreview: null,
      loadingAdminInfo: false,
      processing: false,
      loading: false,
      adminData: {},
      form: {
        amount: '',
        transactionType: '',
        proof: '',
        wallet: '',
        withdrawalType: ''
      }
    }
  },
  computed: {
    computedWalletAddress() {
      return this.form.withdrawalType === 'bitcoin' ? this.computed_wallet_info[0].code : this.form.withdrawalType === 'ethereum' ? this.computed_wallet_info[1].code : this.form.withdrawalType === 'bank' ? this.computed_wallet_info[2].code : ''
    },
    isFormEnabled() {
      return !!(this.form.amount && this.form.withdrawalType)
    },
    computed_wallet_info() {
      return Object.keys(this.adminData).length
        ? [
          {
            name: 'Bitcoin',
            code: this.adminData?.admin?.btc ?? 'N/A'
          },
          {
            name: 'Ethereum erc-20',
            code: this.adminData?.admin?.eth ?? 'N/A'
          },
          {
            name: 'Bank Account',
            code: '00907654378889'
          }
        ]
        : [
          {
            name: 'Bitcoin',
            code: ''
          },
          {
            name: 'Ethereum erc-20',
            code: ''
          },
          {
            name: 'Bank Account',
            code: ''
          }
        ]
    }
  },
  mounted() {
    this.getAdminInfo()
  },
  methods: {
    copy(val) {
      const cb = window.navigator.clipboard
      cb.writeText(val).then(() => this.$toastr.s('Copied to clipboard'))
    },
    async handleWithdrawal() {
      this.processing = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      try {
        const withdrawalMutation = `
          mutation newTransaction($input: NewTransaction!) {
            newTransaction(input: $input)
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
              query: withdrawalMutation,
              variables: {
                input: {
                  amount: this.form.amount,
                  transactionType: 'Withdrawal',
                  proof: '',
                  wallet: this.form.wallet
                }
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.$toastr.s('You have successfully initiated a withdrawal')
          this.this.form.amount = ''
          this.form.wallet = ''
          this.form.transactionType = ''
        }
      } finally {
        this.processing = false
      }
    },
    async getAdminInfo() {
      this.loadingAdminInfo = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
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
          this.adminData = data.data.getUser
        }
      } finally {
        this.loadingAdminInfo = false
      }
    }
  }
}
</script>

<style></style>
