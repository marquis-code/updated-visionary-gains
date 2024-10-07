<template>
  <section class="bg-white space-y-6">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12 w-full">
      <section class="relative flex h-32 items-end bg-[#303435] lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="Night"
          src="https://images.unsplash.com/photo-1627253781598-63b98c51da42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
          class="absolute inset-0 h-full w-full object-cover opacity-80">

        <div class="hidden lg:relative lg:block lg:p-12">
          <a class="block text-white" href="/">
            <span class="sr-only">Home</span>
            <img src="@/assets/img/logo.png" alt="logo" class="w-48">
          </a>

          <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Visionary Gains
          </h2>

          <p class="mt-4 leading-relaxed text-white/90">
            Trade global financial markets ON OVER 1,000 ASSETS. Forex, Stocks,
            Commodities, Indices & Cryptocurrencies
          </p>
        </div>
      </section>

      <main
        class="items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-[#303435] w-full">
        <div class="max-w-xl lg:max-w-3xl lg:mx-auto grid place-content-center h-full">
          <div class="relative -mt-16 block lg:hidden">
            <a class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
              href="/">
              <span class="sr-only">Home</span>
              <img src="@/assets/img/logo.png" alt="logo" class="w-48">
            </a>

            <h1 class="mt-2 text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">
              Welcome to Visionary Gains
            </h1>

            <p class="mt-4 leading-relaxed text-sm text-white">
              Trade global financial markets ON OVER 1,000 ASSETS. Forex,
              Stocks, Commodities, Indices & Cryptocurrencies
            </p>
          </div>

          <form class="lg:w-[500px] space-y-6 pt-10" @submit.prevent="handleSubmit">
            <div class="col-span-6 sm:col-span-3">
              <label for="FirstName" class="block text-sm text-white">
                First Name
              </label>

              <input id="FirstName" v-model="form.first_name" type="text" name="first_name"
                class="mt-1 w-full py-3 pl-3 outline-none border-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="LastName" class="block text-sm text-white">
                Last Name
              </label>

              <input id="LastName" v-model="form.last_name" type="text" name="last_name"
                class="mt-1 w-full py-3 pl-3 outline-none border-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm text-white">
                Email
              </label>

              <input id="Email" v-model="form.email" type="email" name="email"
                class="mt-1 w-full py-3 pl-3 outline-none border-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="Password" class="block text-sm text-white">
                Password
              </label>

              <input id="Password" v-model="form.password" type="password" name="password"
                class="mt-1 w-full py-3 pl-3 outline-none border-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            </div>
            <div class="col-span-6">
              <label for="referralCode" class="block text-sm text-white">
                Referral Code
              </label>

              <input id="referralCode" v-model="form.referralCode" type="text" name="referralCode"
                class="mt-1 w-full py-3 pl-3 outline-none border-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
            </div>
            <!--
            <div class="col-span-6">
              <p class="text-sm text-white">
                By creating an account, you agree to our
                <a href="#" class="text-green-600 underline">
                  terms and conditions
                </a>
                and
                <a href="#" class="text-green-600 underline">privacy policy</a>.
              </p>
            </div> -->

            <div class="w-full">
              <button :disabled="!isFormEmpty" :class="[
            !isFormEmpty
              ? 'opacity-25 cursor-not-allowed'
              : '',
          ]" class="inline-block w-full shrink-0 text-xs rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
                {{ formBusy ? "processing..." : " Create an account" }}
              </button>

              <p class="mt-4 text-sm text-white sm:mt-0">
                Already have an account?
                <nuxt-link to="/login" class="text-white underline">
                  Log in
                </nuxt-link>.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'authLayout',
  data() {
    return {
      processing: false,
      formBusy: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        referralCode: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(
        this.form.first_name &&
        this.form.last_name &&
        this.form.email &&
        this.form.password
      )
    }
  },
  methods: {
    async handleSubmit() {
      this.formBusy = true
      try {
        const signupMutation = `
          mutation newUser($input: NewUser!) {
            newUser(input: $input) {
                  jwt
            }
          }
        `

        const response = await fetch(
          'https://api.visionarygains.com/graphql/query',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              query: signupMutation,
              variables: {
                input: {
                  firstName: this.form.first_name,
                  lastName: this.form.last_name,
                  email: this.form.email,
                  password: this.form.password,
                  referralCode: this.form.referralCode
                }
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          window.localStorage.setItem('auth', JSON.stringify(data?.data?.newUser?.jwt))
          window.localStorage.setItem('user', JSON.stringify(data?.data?.newUser?.user))
          this.$toastr.s('Signup was successful')
          this.$router.push('/login')
        }
      } finally {
        this.formBusy = false
      }
    }
  }
}
</script>
