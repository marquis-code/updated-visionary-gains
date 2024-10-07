<template>
  <main class="">
    <section class="bg-white max-w-md rounded-md border">
      <p class="border-b pl-6 py-4 text-sm font-semibold">
        Keep Your Profile Up-To-Date
      </p>
      <form class="p-6 lg:p-10 space-y-6" @submit.prevent="updateUser">
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">First Name</label>
          <input v-model="updatedUserData.firstName" type="text"
            class="py-2.5 md:py-2 border rounded-md w-full outline-none pl-6 text-sm md:text-base">
          <span class="text-xs text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Last Name</label>
          <input v-model="updatedUserData.lastName" type="text"
            class="py-2.5 md:py-2 text-sm md:text-base border rounded-md w-full outline-none pl-6">
          <span class="text-xs text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Email address:</label>
          <input v-model="updatedUserData.email" type="email"
            class="py-2.5 md:py-2 text-sm md:text-base border rounded-md w-full outline-none pl-6">
          <span class="text-xs text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Password:</label>
          <input v-model="updatedUserData.password" type="password"
            class="py-2.5 md:py-2 border rounded-md w-full outline-none pl-6 text-sm md:text-base">
          <span class="text-xs text-gray-500">We'll never share your details with anyone else</span>
        </div>

        <!-- <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Wallet Address:</label>
          <input v-model="updatedUserData.walletAddress" type="text" class="py-2 border rounded-md w-full outline-none pl-6">
        </div> -->
        <div class="w-full">
          <button :disabled="!isFormEmpty" :class="[!isFormEmpty ? 'opacity-25 cursor-not-allowed' : null]"
            class="bg-green-500 w-full disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-lg px-6 py-3 text-sm">
            {{ processing ? 'processing...' : 'Update' }}
          </button>
        </div>
      </form>
    </section>
    <!-- <section class="bg-white lg:w-5/12 rounded-md border">
      <p class="border-b text-sm font-semibold py-4 pl-6">
        Personal Legal Identification
      </p>
      <div class="p-6 space-y-6">
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Means of Identity</label>
          <div class="relative">
            <div
              class="h-10 bg-white flex border border-gray-200 rounded items-center"
            >
              <input
                id="select"
                value="Passport"
                name="select"
                class="px-4 text-sm appearance-none outline-none text-gray-800 w-full"
                checked
              >

              <button
                class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600"
              >
                <svg
                  class="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <label
                for="show_more"
                class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600"
              >
                <svg
                  class="w-4 h-4 mx-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </label>
            </div>

            <input
              id="show_more"
              type="checkbox"
              name="show_more"
              class="hidden peer"
              checked
            >
            <div
              class="absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200"
            >
              <div class="cursor-pointer group">
                <a
                  class="block p-2 text-sm border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                >Drivers Licence</a>
              </div>
              <div class="cursor-pointer group border-t">
                <a
                  class="block p-2 text-sm border-transparent border-l-4 group-hover:border-blue-600 border-blue-600 group-hover:bg-gray-100"
                >Passport</a>
              </div>
              <div class="cursor-pointer group border-t">
                <a
                  class="block p-2 text-sm border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"
                >National ID</a>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-xs text-gray-700 font-medium">Upload Image</label>
          <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
          >

          <div class="max-w-2xl mx-auto">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden">
              </label>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </main>
</template>

<script>
export default {
  layout: 'user-dashboard',
  data() {
    return {
      userId: '12345',
      processing: false,
      updatedUserData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.updatedUserData.firstName && this.updatedUserData.lastName && this.updatedUserData.email)
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async updateUser() {
      this.processing = true
      const accessToken = JSON.parse(window.localStorage.getItem('auth'))
      const user = JSON.parse(window.localStorage.getItem('user'))
      try {
        const updateUserMutation = `
          mutation updateUser($userId: String!, $input: UpdateUser!) {
            updateUser(userId: $userId, input: $input) {
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
                userId: user?.id ?? '',
                input: {
                  firstName: this.updatedUserData.firstName,
                  lastName: this.updatedUserData.lastName,
                  password: this.updatedUserData.password,
                  email: this.updatedUserData.email
                }
              }
            })
          }
        )
        const data = await response.json()
        if (data?.errors) {
          this.$toastr.e(data.errors[0].message)
        } else {
          this.$toastr.s('You have successfully updated your profile')
        }
      } finally {
        this.processing = false
      }
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
          this.updatedUserData = data.data.getUser
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
