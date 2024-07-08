<template>
  <main>
    <section class="overflow-hidden bg-[url('~/assets/img/team.jpg')] bg-cover bg-top bg-no-repeat">
      <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24 py-60">
        <div class="text-center flex justify-center items-center flex-col ltr:sm:text-left rtl:sm:text-right">
          <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Meet the team
          </h2>

          <p class="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            At Visionary Gains we understand the importance of having a local presence. That’s why our team is located
            across a network of regional offices putting us at the heart of the main centres of UK business and
            transaction activity.
          </p>
        </div>
      </div>
    </section>
    <section class="text-gray-900 body-font bg-white">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">
            OUR TEAM
          </h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -m-4">
          <div v-for="(itm, idx) in teams" :key="idx" class="p-4">
            <div class="h-full flex flex-col items-center text-center">
              <img alt="team" class="flex-shrink-0 rounded-lg w-full  h-64 object-cover object-center mb-4"
                :src="require(`@/assets/img/${itm.img}`)">
              <div class="w-full">
                <h2 class="title-font font-medium text-lg text-gray-900">
                  {{ itm.name }}
                </h2>
                <h3 class="text-gray-500 mb-3">
                  {{ itm.title }}
                </h3>
                <div class="flex justify-between items-center mt-6">
                  <nuxt-link :to="`/teams/${itm.profileUrl}`"
                    class=" text-white py-2.5 text-sm bg-black px-3 rounded-md">
                    View Profile
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      teams: [
        // {
        //   name: 'George Hovey',
        //   title: 'Executive Director',
        //   img: 'ceoMale.jpeg',
        //   profileUrl: 'ceo'
        // },
        {
          name: 'Deborah Myers',
          title: 'Executive Director',
          img: 'ceoFemale.jpeg',
          profileUrl: 'ceo'
        },
        {
          name: 'Breanna Marrie Riley',
          title: 'Investment Manager',
          img: 'investment-manager-one.jpeg',
          profileUrl: 'investment-manager-one'
        },
        {
          name: 'Sonia Ann Lindsey',
          title: 'Investment Manager',
          img: 'investment-manager-two.jpeg',
          profileUrl: 'investment-manager-two'
        },
        {
          name: 'Adam Lehan Thomson',
          title: ' Investment Director',
          img: 'investment-director.jpeg',
          profileUrl: 'investment-director'
        }
      ]
    }
  }
}
</script>

<style></style>
