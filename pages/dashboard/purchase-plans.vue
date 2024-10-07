<template>
  <section class="bg-white lg:w-5/12 rounded-md border h-[500px]">
    <p class="border-b text-sm font-semibold py-4 pl-6">
      To buy a plan, select PLAN of your choice.
    </p>
    <form class="p-6 space-y-6 z-10" @submit.prevent="buyPlan">
      <div class="space-y-1">
        <label class="text-xs text-gray-700 font-medium">Choose Plan:*</label>
        <select v-model="form.plan"
          class="block px-2 text-sm outline-none py-3 rounded-md border w-full border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">
          <option v-for="(item, index) in [
      {
        name: 'Platinum Plan (29%) Monthly',
        value: 'Platinum',
      },
      {
        name: 'Diamond Plan (35%) Monthly',
        value: 'Diamond',
      },
    ]" :key="index" :value="item.value">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="space-y-1">
        <label class="text-xs text-gray-700 font-medium">Enter Amount:*</label>
        <input v-model="form.amount" class="py-2.5 border rounded-md w-full outline-none pl-6">
        <span class="text-xs font-medium text-red-500">Note that plan amount must be available in your account balance
          of
          {{ formatNumberAsDollar(userData?.accountBalance) ?? '0.00' }}.</span>
      </div>
      <button :class="[
      !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
    ]" :disabled="!isFormEmpty" class="w-full text-white text-sm rounded-lg bg-black py-3">
        {{ processing ? 'processing....' : 'Proceed' }}
      </button>
    </form>
  </section>
</template>

<script>
export default {
  layout: 'user-dashboard',
  data() {
    return {
      processing: false,
      userData: {},
      form: {
        plan: '',
        amount: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.form.plan && this.form.amount)
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async buyPlan() {
      this.processing = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      try {
        const buyPlanMutation = `
        mutation {
          buyPlan(amount: ${this.form.amount}, planType: "${this.form.plan}")
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
              query: buyPlanMutation,
              variables: {
                amount: this.form.amount,
                planType: this.form.plan
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.$toastr.s('You have successfully purchased a plan')
          this.form.amount = ''
          this.form.plan = ''
        }
      } finally {
        this.processing = false
      }
    },
    formatNumberAsDollar(number) {
      return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
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
    }
  }
}
</script>

<style></style>
