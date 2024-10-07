<template>
  <main class="bg-[#303435] h-screen">
    <section class="bbg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="p-4 md:p-8 space-y-3 w-11/12 mx-auto mt-20 bg-white rounded-xl md:w-[500px] border shadow-sm">
        <h1 class="text-2xl font-bold text-center">
          Admin Login
        </h1>
        <form class="space-y-10 w-full bg-white" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="block dark:text-gray-400">Email</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="email"
              class="border w-full px-4 py-3 rounded-md outline-none">
            <small v-if="!isEmailValid" class="text-red-600 text-sm font-medium">Please enter a valid email
              address</small>
          </div>
          <div class="space-y-1 text-sm w-full">
            <label for="password" class="block dark:text-gray-400">Password</label>
            <input id="password" v-model="form.password" type="password" name="password" placeholder="Password"
              class="border w-full px-4 py-3 rounded-md outline-none">
          </div>
          <button :disabled="!isFormEmpty || processing"
            class="block w-full disabled:cursor-not-allowed disabled:opacity-25 p-3 text-sm text-center  bg-black text-white rounded-md">
            {{ processing ? 'processing...' : 'Sign in' }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  layout: 'authLayout',
  data() {
    return {
      processing: false,
      isEmailValid: true,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.form.email && this.form.password)
    }
  },
  watch: {
    'form.email'(value) {
      this.form.email = value
      this.validateEmail(value)
    }
  },
  methods: {
    async login() {
      this.processing = true
      const loginMutation = `
        mutation {
          adminLogin(email: "${this.form.email}", password: "${this.form.password}") {
            jwt
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
          }
        }
      `
      try {
        const response = await fetch('https://api.visionarygains.com/graphql/query', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            query: loginMutation,
            variables: {
              email: this.form.email,
              password: this.form.password
            }
          })
        })
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          if (process.client) {
            window.localStorage.setItem('auth', JSON.stringify(data?.data?.adminLogin?.jwt))
            window.localStorage.setItem('user', JSON.stringify(data?.data?.adminLogin?.user))
            this.$toastr.s('Login was successful')
            this.$router.push('/admin/dashboard')
          }
        }
      } finally {
        this.processing = false
      }
    },
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.isEmailValid = true
      } else {
        this.isEmailValid = false
      }
    }
  }
}
</script>
