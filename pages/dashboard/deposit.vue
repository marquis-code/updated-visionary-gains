<template>
  <main class="lg:flex justify-start items-start gap-x-10 space-y-10 lg:space-y-0">
    <section class="bg-white lg:w-7/12 rounded-md border">
      <div class="border-b pl-6 py-4 text-sm font-semibold">
        <h1 class="text-lg text-gray-600">
          Fund Your Account
        </h1>
        <p class="text-gray-500 text-sm font-light">
          copy wallet address of your intended payment method
        </p>
      </div>
      <div v-if="!loadingAdminInfo" class="p-10 space-y-6">
        <div v-for="{ name, code } in computed_wallet_info" :key="name"
          class="flex items-center justify-between w-full gap-x-6" v-if="code">
          <div class="space-y-1 w-full">
            <label class="text-xs text-gray-700 font-medium">{{ name }}</label>
            <input ref="myinput" readonly :value="code"
              class="py-3 border rounded-md w-full outline-none pl-6 text-sm font-light"
              @focus="$event.target.select()">
          </div>
          <div class="flex justify-center items-center pt-7" v-if="code">
            <img src="@/assets/img/copy.png" class="h-4 w-4 py cursor-pointer" alt="" @click="copy(code)">
          </div>
        </div>
        <div class="">
          <a href="http://bitcoin.com/" target="_blank" class="bg-black px-6 m-6 py-2.5 rounded-md text-white">Buy
            Crypto</a>
        </div>
      </div>
      <api-loader v-else />
    </section>
    <section class="bg-white lg:w-5/12 rounded-md border">
      <p class="border-b text-sm font-semibold py-4 pl-6">
        Enter amount and upload proof of payment
      </p>
      <form class="p-6 space-y-6" @submit.prevent="handleDeposit">
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Deposit Amount</label>
          <input v-model="form.amount" placeholder="Enter amount in USD" type="number"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
        </div>
        <div class="space-y-4">
          <label class="text-xs text-gray-700 font-medium">Deposit Type</label>
          <select v-model="form.depositType"
            class="py-3 border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
            <option value="" disabled>
              ---- Select deposit type -----
            </option>
            <option :value="itm.key" v-for="(itm, idx) in depositTypeArray" :key="idx">
              {{ itm.name }}
            </option>
          </select>
          <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Wallet address</label>
            <input readonly :value="computedWalletAddress"
              class="py-3 bg-gray-100 cursor-not-allowed border border-gray-600 text-sm rounded-md w-full outline-none pl-6">
          </div>
          <div class="space-y-1">
            <label class="text-xs text-gray-700 font-medium">Upload Image</label>
            <div v-if="!imagePreview" class="max-w-2xl mx-auto">
              <div class="flex items-center justify-center w-full">
                <label for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                        upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" @change="handleProofUpload">
                </label>
              </div>
            </div>
            <div v-else>
              <img :src="imagePreview" alt="image preview" class="w-full h-32 object-cover object-center">
            </div>
          </div>
          <div class="w-full">
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
export default {
  layout: 'user-dashboard',
  data() {
    return {
      depositType: '',
      imagePreview: null,
      adminData: {},
      processing: false,
      loadingAdminInfo: false,
      form: {
        amount: '',
        depositType: '',
        proof: '',
        walletAddress: ''
      },
      depositTypeArray: [
        // {
        //   name: 'Bitcoin',
        //   key: 'bitcoin'
        // },
        // {
        //   name: 'Etheruem',
        //   key: '"ethereum'
        // },
        // {
        //   name: 'Bank Account',
        //   key: 'bank'
        // }
      ]
    }
  },
  computed: {
    computedWalletAddress() {
      return this.form.depositType === 'bitcoin' ? this.computed_wallet_info[0].code : this.form.depositType === 'ethereum' ? this.computed_wallet_info[1].code : this.form.depositType === 'bank' ? this.computed_wallet_info[2].code : ''
    },
    isFormEnabled() {
      return !!(this.form.amount && this.form.depositType && this.form.proof)
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
            code: ''
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
    handleProofUpload(event) {
      const file = event.target.files[0]

      if (file) {
        // Read the file and set the preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = reader.result
          this.form.proof = e?.target?.result
        }
        reader.readAsDataURL(file)
      } else {
        this.imagePreview = null
      }
    },
    async handleDeposit() {
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
                  transactionType: 'Deposit',
                  proof: this.form.proof,
                  wallet: this.computedWalletAddress
                }
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.$toastr.s('You have successfully initiated transaction')
          this.form.amount = ''
          this.form.depositType = ''
          this.form.proof = ''
          this.computedWalletAddress = ''
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
            admin {
              eth
              btc
            }
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
          this.populateDepositArray(this.adminData)
        }
      } finally {
        this.loadingAdminInfo = false
      }
    },
    populateDepositArray(data) {
      if (data.admin?.btc?.length) {
        this.depositTypeArray.push({
          name: 'Bitcoin',
          key: 'bitcoin'
        })
      }

      if (data.admin?.eth?.length) {
        this.depositTypeArray.push({
          name: 'Etheruem',
          key: 'ethereum'
        })
      }

      if (data?.admin?.bank?.length) {
        this.depositTypeArray.push({
          name: 'Bank',
          key: 'bank'
        })
      }
    }
  }
}
</script>
