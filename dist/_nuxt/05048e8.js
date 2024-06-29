(window.webpackJsonp=window.webpackJsonp||[]).push([[47,17],{518:function(t,e,n){"use strict";n.r(e);var r={},o=n(46),component=Object(o.a)(r,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"w-full"},[t("div",{staticClass:"rounded overflow-hidden border shadow-lg animate-pulse w-full"},[t("div",{staticClass:"bg-gray-300 h-28"})])])}],!1,null,null,null);e.default=component.exports},669:function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this._self._c;return t("div",{staticClass:"lg:col-span-2 border-blue-500"},[t("div",{staticClass:"cryptohopper-web-widget",attrs:{"data-id":"4","data-coins":"bitcoin,ethereum,bnb,usd-coin,litecoin,trust-wallet-token","data-numcoins":"50"}})])},function(){var t=this._self._c;return t("div",{staticClass:"p-3"},[t("div",{staticClass:"rounded-full bg-red-400 p-2 h-10 w-10 flex justify-center items-center"},[t("img",{staticClass:"h-7 w-7",attrs:{src:n(344),alt:""}})])])},function(){var t=this._self._c;return t("div",{staticClass:"p-3"},[t("div",{staticClass:"rounded-full bg-red-400 p-2 h-10 w-10 flex justify-center items-center"},[t("img",{staticClass:"h-7 w-7",attrs:{src:n(342),alt:""}})])])},function(){var t=this,e=t._self._c;return e("colgroup",[e("col"),t._v(" "),e("col"),t._v(" "),e("col"),t._v(" "),e("col",{staticClass:"w-24"})])},function(){var t=this,e=t._self._c;return e("thead",{staticClass:"bg-gray-700 sticky top-0"},[e("tr",{staticClass:"text-left"},[e("th",{staticClass:"p-3"},[t._v("\n                      Transaction Type\n                    ")]),t._v(" "),e("th",{staticClass:"p-3"},[t._v("\n                      Date\n                    ")]),t._v(" "),e("th",{staticClass:"p-3 text-right"},[t._v("\n                      Amount\n                    ")]),t._v(" "),e("th",{staticClass:"p-3"},[t._v("\n                      Status\n                    ")])])])}],o=n(48),l=(n(93),n(13),n(8),n(42),{layout:"user-dashboard",data:function(){return{loading:!1,userData:{},loadingTransactions:!1,transactionsList:[],assetsList:[{name:"BTC",price:"$214.08",rate:"+0.23%",balance:"122,356",proportion:75,icon:"binance"},{name:"ETH",price:"$214.08",rate:"+0.23%",balance:"122,356",proportion:14,icon:"eth"}]}},mounted:function(){this.getUserInfo(),this.fetchTransactions()},methods:{getUserInfo:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loading=!0,e.prev=4,e.next=7,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        query {\n          getUser {\n            id\n            firstName\n            lastName\n            email\n            Status\n            PlanType\n            accountBalance\n            tradingBalance\n            profit\n            eth\n            btc\n            timeAdded\n          }\n        }\n      "})});case 7:return r=e.sent,e.next=10,r.json();case 10:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):t.userData=data.data.getUser;case 12:return e.prev=12,t.loading=!1,e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[4,,12,15]])})))()},fetchTransactions:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingTransactions=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loadingTransactions=!0,e.prev=4,e.next=7,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        query {\n          getUsersTransactions {\n            id\n            amount\n            wallet\n            transactionType\n            transactionStatus\n            user {\n              id\n              firstName\n              lastName\n              email\n              Status\n              PlanType\n              accountBalance\n              tradingBalance\n              profit\n              eth\n              btc\n              timeAdded\n            }\n            proof\n            timeAdded\n          }\n        }\n      "})});case 7:return r=e.sent,e.next=10,r.json();case 10:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):t.transactionsList=data.data.getUsersTransactions;case 12:return e.prev=12,t.loadingTransactions=!1,e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[4,,12,15]])})))()},formatNumberAsDollar:function(t){return null==t?void 0:t.toLocaleString("en-US",{style:"currency",currency:"USD"})},formatDateTime:function(t){if("string"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))return"Invalid Date";return t.toLocaleDateString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}}}),c=n(46),component=Object(c.a)(l,(function(){var t,e,n,r,o,l,c=this,d=c._self._c;return d("main",{staticClass:"space-y-6"},[d("div",{staticClass:"grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8"},[c._m(0),c._v(" "),d("div",{staticClass:"rounded-lg bg-blue-50 border"},[d("div",{staticClass:"flex justify-between items-center px-3"},[d("div",{staticClass:"py-2"},[d("h1",{staticClass:"text-gray-700 text-sm font-bold"},[c._v("\n            Account Balance\n          ")]),c._v(" "),d("p",{staticClass:"text-gray-400 text-xl"},[d("span",{staticClass:"text-xl text-gray-900"},[c._v(c._s(null!==(t=c.formatNumberAsDollar(null===(e=c.userData)||void 0===e?void 0:e.accountBalance))&&void 0!==t?t:"0.00"))])])]),c._v(" "),d("div",[d("nuxt-link",{staticClass:"bg-black text-white rounded-md px-3 py-2.5",attrs:{to:"/dashboard/deposit"}},[c._v("\n            Deposit Funds\n          ")])],1)]),c._v(" "),d("div",{staticClass:"space-y-6"},[d("div",{staticClass:"md:flex items-center gap-x-6 p-3 space-y-6 md:space-y-0"},[d("div",{staticClass:"h-[300px] md:w-1/2 rounded-lg flex justify-between flex-col bg-[url('~/assets/img/trading-stat.jpg')] bg-cover bg-top bg-no-repeat"},[c._m(1),c._v(" "),d("div",{staticClass:"border-t-[0.4px] border-white"},[d("div",{staticClass:"px-3 py-2"},[d("p",{staticClass:"text-white text-xs"},[c._v("\n                  Profits\n                ")]),c._v(" "),d("p",{staticClass:"text-lg font-semibold text-white"},[c._v("\n                  "+c._s(null!==(n=c.formatNumberAsDollar(null===(r=c.userData)||void 0===r?void 0:r.profit))&&void 0!==n?n:"0.00")+"\n                ")])])])]),c._v(" "),d("div",{staticClass:"h-[300px] md:w-1/2 rounded-lg flex justify-between flex-col bg-[url('~/assets/img/recession.jpg')] bg-cover bg-top bg-no-repeat"},[c._m(2),c._v(" "),d("div",{staticClass:"border-t-[0.4px] border-white"},[d("div",{staticClass:"px-3 py-2"},[d("p",{staticClass:"text-white text-xs"},[c._v("\n                  Trading\n                ")]),c._v(" "),d("p",{staticClass:"text-lg font-semibold text-white"},[c._v("\n                  "+c._s(null!==(o=c.formatNumberAsDollar(null===(l=c.userData)||void 0===l?void 0:l.tradingBalance))&&void 0!==o?o:"0.00")+"\n                ")])])])])]),c._v(" "),d("div",{staticClass:"bg-white py-10 space-y-4 border border-gray-600 h-[400px] overflow-y-auto"},[d("h1",{staticClass:"text-gray-600 font-bold border-b pb-4 pl-6"},[c._v("\n            Recent Transactions\n          ")]),c._v(" "),!c.loadingTransactions&&c.transactionsList?d("div",{staticClass:"text-gray-100 w-full p-3 rounded-lg"},[d("div",{staticClass:"overflow-x-auto w-full"},[d("table",{staticClass:"w-full text-xs"},[c._m(3),c._v(" "),c._m(4),c._v(" "),d("tbody",c._l(c.transactionsList,(function(t,e){var n;return d("tr",{key:e,staticClass:"border-b border-opacity-20 border-gray-700 bg-gray-900"},[d("td",{staticClass:"p-3"},[d("p",[c._v(" "+c._s(null==t?void 0:t.transactionType))])]),c._v(" "),d("td",{staticClass:"p-3"},[d("p",[c._v(c._s(null!==(n=c.formatDateTime(null==t?void 0:t.timeAdded))&&void 0!==n?n:"N/A"))])]),c._v(" "),d("td",{staticClass:"p-3"},[d("p",{staticClass:"text-gray-400"},[c._v("\n                        "+c._s(c.formatNumberAsDollar(null==t?void 0:t.amount))+"\n                      ")])]),c._v(" "),d("td",{staticClass:"p-3 text-right"},[d("span",{staticClass:"px-3 py-1 font-semibold rounded-md text-white",class:["Approved"===(null==t?void 0:t.transactionStatus)?"bg-green-500":"Pending"===(null==t?void 0:t.transactionStatus)?"bg-yellow-500":"Declined"===(null==t?void 0:t.transactionStatus)?"bg-red-500":"bg-violet-400"]},[d("span",[c._v(" "+c._s(null==t?void 0:t.transactionStatus))])])])])})),0)])])]):c.loadingTransactions?d("loader"):c._e(),c._v(" "),c.transactionsList.length||c.loadingTransactions?c._e():d("p",{staticClass:"text-center font-medium py-20"},[c._v("\n            No Transactions Available\n          ")])],1)])])])])}),r,!1,null,null,null);e.default=component.exports;installComponents(component,{Loader:n(518).default})}}]);