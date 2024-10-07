<template>
  <div class="bg-[#303435] h-screen">
    <section class="bg-[#303435] flex justify-center items-center pt-20 container mx-auto">
      <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white">
        <h1 class="text-3xl font-bold">
          Almost Done!
        </h1>
        <p class="text-gray-500 text-sm leading-loose">
          Please enter your reset password token and your new password.
        </p>
        <form class="space-y-10" @submit.prevent="login">
          <div class="space-y-1 text-sm w-full">
            <label for="token" class="block text-gray-900 font-medium">Token</label>
            <input id="token" v-model="form.resetCode" type="tel" name="token" placeholder="email"
              class="border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900">
          </div>
          <div class="space-y-1 text-sm w-full">
            <label for="password" class="block text-gray-900 font-medium">New Password</label>
            <input id="password" v-model="form.password" type="password" name="password" placeholder="password"
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
  </div>
</template>

<script>
export default {
  layout: 'authLayout',
  data() {
    return {
      user: '',
      processing: false,
      form: {
        resetCode: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.form.password && this.form.resetCode)
    }
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem('user-email'))
  },
  methods: {
    async login() {
      this.processing = true
      const resetPasswordMutation = `
      mutation resetPassword($email: String!, $newPassword: String!, $resetCode: String!) {
            resetPassword(email: $email, newPassword: $newPassword, resetCode: $resetCode)
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
            query: resetPasswordMutation,
            variables: {
              email: this.user,
              newPassword: this.form.password,
              resetCode: this.form.resetCode
            }
          })
        }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          localStorage.removeItem('user-email')
          this.$toastr.s('Password reset was successfully. Please Login')
          this.$router.push('/login')
        }
      } finally {
        this.processing = false
      }
    }
  }
}
</script>

<style></style>
