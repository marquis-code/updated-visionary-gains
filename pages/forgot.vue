<template>
  <div class="bg-[#303435] h-screen">
    <section v-if="!token_sent" class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white">
        <h1 class="text-3xl font-bold">
          Don't worry!
        </h1>
        <p class="text-gray-500 text-sm leading-loose">
          we are here to help you recover your password. Enter the email address you used when you joined and we'll send
          you instructions to reset your password.
        </p>
        <form class="space-y-10" @submit.prevent="handleForgetPassword">
          <div class="space-y-1 text-sm w-full">
            <label for="email" class="block text-gray-900 font-medium">Email</label>
            <input id="email" v-model="form.email" type="email" name="email" placeholder="email"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
          </div>
          <div class="w-full">
            <button :disabled="!isFormEmpty" :class="[
      !isFormEmpty || processing ? 'opacity-25 cursor-not-allowed' : '',
    ]" class="w-full shrink-0 text-xs disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition">
              {{ processing ? "processing..." : "Submit" }}
            </button>
          </div>
        </form>
      </div>
    </section>
    <section v-else class="grid place-content-center h-screen">
      <div class="flex justify-center items-center flex-col gap-y-3">
        <img src="@/assets/icons/airplane.svg" class="h-10 w-10" alt="">
        <p class="text-white">
          Reset password token has been sent to your email.
        </p>
        <nuxt-link to="/reset" class="bg-black text-white px-6 py-2 rounded-md tetx-sm">Proceed to reset</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'authLayout',
  data() {
    return {
      processing: false,
      token_sent: false,
      form: {
        email: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.form.email)
    }
  },
  mounted() {
    if (window.process) {
      const user = window.localStorage.getItem('user')
      const parsedUser = JSON.parse(user)
      if (Object.keys(parsedUser)?.length) {
        this.$router.push('/dashboard')
      }
    }
  },
  methods: {
    async handleForgetPassword() {
      this.processing = true
      const resetPassword = `
          mutation SendResetPasswordCode($email: String!) {
            sendResetPasswordCode(email: $email)
          }
        `
      try {
        const response = await fetch(
          'https://api.visionarygains.com/graphql/query', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            query: resetPassword,
            variables: {
              email: this.form.email
            }
          })
        }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.token_sent = true
          window.localStorage.setItem('user-email', JSON.stringify(this.form.email))
        }
      } finally {
        this.processing = false
      }
    }
  }

}
</script>
