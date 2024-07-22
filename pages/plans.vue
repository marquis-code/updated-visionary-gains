<template>
  <section class="dark:bg-[#303435]">
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Investment Plans</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500"> Outlined are our plans.</p>
          <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
            <button class="py-1 px-4 bg-indigo-500 text-white focus:outline-none">Monthly</button>
            <button class="py-1 px-4 focus:outline-none">Annually</button>
          </div>
        </div>
        <div class="flex justify-center flex-wrap -m-4">
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full text-white">
            <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">Platinum Plan </h2>
              <!-- <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">$400 to $4999</h1> -->
              <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>$5000</span>
                <span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
              </h1>
              <p class="flex items-center text-sm text-white mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span> The Platinum Plan (20%) Monthly
              </p>
              <p class="flex items-center text-sm text-white mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span> The Platinum plan starts trading from $5000 to $9999
              </p>
              <!-- <p class="flex items-center text-gray-600 mb-6">
                <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>Mixtape chillwave tumeric
              </p> -->
            </div>
          </div>
          <div class="p-4 xl:w-1/4 md:w-1/2 w-full text-white">
            <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <span
                class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">Diamond Plan</h2>
              <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>$10000</span>
                <span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
              </h1>
              <p class="flex items-center text-white text-sm mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>The Diamond plan starts trading from $10000 to $19999
              </p>
              <p class="flex items-center text-white text-sm mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span> The Diamond Plan (25%) Monthly
              </p>
            </div>
          </div>

          <div class="p-4 xl:w-1/4 md:w-1/2 w-full text-white">
            <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
              <!-- <span
                class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> -->
              <h2 class="text-sm tracking-widest title-font mb-1 font-medium">Elite Plan</h2>
              <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                <span>$20000</span>
                <span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
              </h1>
              <p class="flex items-center text-white text-sm mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>The Diamond plan starts trading from $20000 to $5m
              </p>
              <p class="flex items-center text-white text-sm mb-2">
                <span
                  class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span> The Diamond Plan (35%) Monthly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
