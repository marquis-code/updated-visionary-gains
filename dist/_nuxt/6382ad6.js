(window.webpackJsonp=window.webpackJsonp||[]).push([[40,17],{518:function(t,e,n){"use strict";n.r(e);var r={},l=n(46),component=Object(l.a)(r,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"w-full"},[t("div",{staticClass:"rounded overflow-hidden border shadow-lg animate-pulse w-full"},[t("div",{staticClass:"bg-gray-300 h-28"})])])}],!1,null,null,null);e.default=component.exports},697:function(t,e,n){"use strict";n.r(e);n(10),n(30),n(34),n(13),n(8);var r=n(48),l=(n(93),{layout:"dashboards",data:function(){return{loading:!1,showModal:!1,tradingBalance:"",updateProfitStatus:null,processingProfitUpdate:!1,selectedWallet:{},profitUpdate:{status:"",amount:""},form:{name:"",address:""},updatedUserData:{},processing:!1}},computed:{isFormEmpty:function(){return!(!this.selectedWallet.name||!this.selectedWallet.address)},isUpdateFormEmpty:function(){return!(!this.profitUpdate.amount||!this.profitUpdate.status)},computedCards:function(){var t,e,n,r,l;return[{name:"Trading Balance",value:"bank",walletName:"Bank Account",count:"".concat(null!==(t=this.formatNumberAsDollar(this.tradingBalance))&&void 0!==t?t:"N/A"),address:"",icon:"wallet",classStyle:"bg-green-500"},{name:"BTC",value:"btc",walletName:"BitCoin",count:"",address:null!==(e=null===(n=this.updatedUserData)||void 0===n?void 0:n.btc)&&void 0!==e?e:"N/A",icon:"bit",classStyle:"bg-pink-500"},{name:"ETH",value:"eth",walletName:"Ethereum",count:"",address:null!==(r=null===(l=this.updatedUserData)||void 0===l?void 0:l.eth)&&void 0!==r?r:"N/A",icon:"eth",classStyle:"bg-blue-500"}]}},mounted:function(){this.fetchAdminStats(),this.getUserInfo()},methods:{handleClick:function(){this.showModal=!0},handleWalletModal:function(t){this.selectedWallet=t,this.$bvModal.show("wallet-update")},updateWallet:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,l,input,o,data,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.processing=!0,n=JSON.parse(window.localStorage.getItem("auth")),r=JSON.parse(window.localStorage.getItem("user")),e.prev=4,input="btc"===t.selectedWallet.value?{btc:t.selectedWallet.address}:"eth"===t.selectedWallet.value?{eth:t.selectedWallet.address}:{btc:t.selectedWallet.address,eth:t.selectedWallet.address},e.next=9,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n          mutation updateUser($userId: String!, $input: UpdateUser!) {\n            updateUser(userId: $userId, input: $input) {\n              id\n              firstName\n              lastName\n              email\n              Status\n              PlanType\n              accountBalance\n              tradingBalance\n              profit\n              eth\n              btc\n              timeAdded\n            }\n          }\n        ",variables:{userId:null!==(l=null==r?void 0:r.id)&&void 0!==l?l:"",input:input}})});case 9:return o=e.sent,e.next=12,o.json();case 12:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):(t.$toastr.s("".concat(null===(d=t.selectedWallet)||void 0===d?void 0:d.name," wallet address was successfully updated")),t.$bvModal.hide("wallet-update"));case 14:return e.prev=14,t.processing=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[4,,14,17]])})))()},fetchAdminStats:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loading=!0,e.prev=5,e.next=8,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        query {\n          getAdminStats {\n            totalProfit\n            totalWithdrawal\n            totalUsers\n            totalDeposits\n            tradingBalance\n          }\n        }\n      "})});case 8:return r=e.sent,e.next=11,r.json();case 11:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):t.tradingBalance=null==data||null===(l=data.data)||void 0===l||null===(l=l.getAdminStats)||void 0===l?void 0:l.tradingBalance;case 13:return e.prev=13,t.loading=!1,e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[5,,13,16]])})))()},handleProfitUpdate:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.processingProfitUpdate=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loading=!0,e.prev=5,e.next=8,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        mutation {\n          updateProfits\n        }\n      "})});case 8:return r=e.sent,e.next=11,r.json();case 11:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):t.updateProfitStatus=data.data.updateProfits;case 13:return e.prev=13,t.processingProfitUpdate=!1,t.$bvModal.hide("update-profit-modal"),t.fetchAdminStats(),e.finish(13);case 18:case"end":return e.stop()}}),e,null,[[5,,13,18]])})))()},getUserInfo:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loading=!0,e.prev=5,e.next=8,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        query {\n          getUser {\n            id\n            firstName\n            lastName\n            email\n            Status\n            PlanType\n            accountBalance\n            tradingBalance\n            profit\n            eth\n            btc\n            timeAdded\n          }\n        }\n      "})});case 8:return r=e.sent,e.next=11,r.json();case 11:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):t.updatedUserData=data.data.getUser;case 13:return e.prev=13,t.loading=!1,e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[5,,13,16]])})))()},formatNumberAsDollar:function(t){return null==t?void 0:t.toLocaleString("en-US",{style:"currency",currency:"USD"})}}}),o=n(46),component=Object(o.a)(l,(function(){var t,e=this,r=e._self._c;return r("main",[r("main",{staticClass:"space-y-10"},[r("div",{staticClass:"flex justify-between items-center"},[r("h1",{staticClass:"text-white font-medium"},[e._v("\n        Overview\n      ")]),e._v(" "),r("button",{staticClass:"px-3 py-2 rounded-full text-white bg-black",attrs:{type:"button"},on:{click:function(t){return e.$bvModal.show("update-profit-modal")}}},[e._v("\n        Update profit\n      ")])]),e._v(" "),e.loading?r("div",{staticClass:"grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8"},e._l(3,(function(t){return r("loader",{key:t})})),1):r("div",{staticClass:"grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8"},e._l(e.computedCards,(function(t,l){return r("div",{key:l,staticClass:"h-32 rounded-lg bg-black flex items-center justify-between gap-x-3 pl-3 relative"},[r("div",{staticClass:"flex items-center gap-x-2"},[r("div",{staticClass:"rounded-full h-16 w-16 flex justify-center items-center"},[r("img",{attrs:{src:n(335)("./".concat(t.icon,".png")),alt:"stat icon"}})]),e._v(" "),r("div",[r("h1",{staticClass:"text-xl font-medium text-white"},[e._v("\n              "+e._s(t.count)+"\n            ")]),e._v(" "),r("p",{staticClass:"text-2xl text-gray-100"},[e._v("\n              "+e._s(t.name)+"\n            ")])])]),e._v(" "),"bank"!==t.value?r("div",{staticClass:"absolute top-3 right-2 cursor-pointer"},[r("button",{staticClass:"flex items-center gap-x-3 border-white border px-3 py-2.5 rounded-md",on:{click:function(n){return e.handleWalletModal(t)}}},[r("span",{staticClass:"text-white"},[e._v("Update")]),e._v(" "),r("img",{staticClass:"cursor-pointer",attrs:{src:n(340),alt:"more"}})])]):e._e()])})),0)]),e._v(" "),r("b-modal",{attrs:{id:"wallet-update","hide-footer":"",centered:"","hide-header":""}},[r("div",{staticClass:"flex justify-center items-center"},[r("h1",{staticClass:"text-lg font-semibold text-black"},[e._v("\n        "+e._s(Object.keys(e.selectedWallet).length?"Update ".concat(null===(t=e.selectedWallet)||void 0===t?void 0:t.walletName," wallet"):"Update Wallet")+"\n      ")])]),e._v(" "),r("form",{staticClass:"mt-8 gap-6 w-full space-y-6 px-6 pb-6",on:{submit:function(t){return t.preventDefault(),e.updateWallet.apply(null,arguments)}}},[r("div",{staticClass:"col-span-6 sm:col-span-6"},[r("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"walletName"}},[e._v("\n          Wallet Name\n        ")]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedWallet.value,expression:"selectedWallet.value"}],staticClass:"mt-1 disabled: cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm",attrs:{id:"walletName",disabled:"",readonly:""},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));e.$set(e.selectedWallet,"value",t.target.multiple?n:n[0])}}},[r("option",{attrs:{value:"btc"}},[e._v("\n            BitCoin\n          ")]),e._v(" "),r("option",{attrs:{value:"eth"}},[e._v("\n            Ethereum\n          ")]),e._v(" "),r("option",{attrs:{value:"bank"}},[e._v("\n            Bank\n          ")])])]),e._v(" "),r("div",{staticClass:"col-span-6 sm:col-span-6"},[r("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"walletAddress"}},[e._v("\n          Wallet Address\n        ")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedWallet.address,expression:"selectedWallet.address"}],staticClass:"mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm",attrs:{id:"walletAddress",type:"text",name:"walletAddress"},domProps:{value:e.selectedWallet.address},on:{input:function(t){t.target.composing||e.$set(e.selectedWallet,"address",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"w-full flex justify-between items-center gap-x-4"},[r("button",{staticClass:"w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-xs font-medium text-white transition focus:outline-none focus:ring",attrs:{type:"button"},on:{click:function(t){return e.$bvModal.hide("wallet-update")}}},[e._v("\n          Cancel\n        ")]),e._v(" "),r("button",{staticClass:"w-full rounded-md border text-xs disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring",attrs:{type:"submit",disabled:!e.isFormEmpty||e.processing}},[e._v("\n          "+e._s(e.processing?"saving...":"Update ".concat(e.selectedWallet.name," wallet"))+"\n        ")])])])]),e._v(" "),r("b-modal",{attrs:{id:"update-profit-modal","hide-footer":"",centered:"","hide-header":""}},[r("div",{staticClass:"flex justify-center items-center"},[r("h1",{staticClass:"text-lg font-semibold text-black"},[e._v("\n        Update Profit Form\n      ")])]),e._v(" "),r("form",{staticClass:"mt-8 gap-6 w-full space-y-6 px-6 pb-6",on:{submit:function(t){return t.preventDefault(),e.handleProfitUpdate.apply(null,arguments)}}},[r("div",{staticClass:"col-span-6 sm:col-span-6"},[r("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"status"}},[e._v("\n          Profit Status\n        ")]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.profitUpdate.status,expression:"profitUpdate.status"}],staticClass:"mt-1 disabled: cursor-not-allowed bg-gray-100 w-full px-3 py-3 border outline-none rounded-md border-gray-200 text-sm text-gray-700 shadow-sm",attrs:{id:"status"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));e.$set(e.profitUpdate,"status",t.target.multiple?n:n[0])}}},[r("option",{attrs:{value:"+"}},[e._v("\n            Increase\n          ")]),e._v(" "),r("option",{attrs:{value:"-"}},[e._v("\n            Decrease\n          ")])])]),e._v(" "),r("div",{staticClass:"col-span-6 sm:col-span-6"},[r("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"updateAmount"}},[e._v("\n          Amount\n        ")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.profitUpdate.amount,expression:"profitUpdate.amount"}],staticClass:"mt-1 w-full px-3 py-3 border outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm",attrs:{id:"updateAmount",type:"tel",name:"updateAmount"},domProps:{value:e.profitUpdate.amount},on:{input:function(t){t.target.composing||e.$set(e.profitUpdate,"amount",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"w-full flex justify-between items-center gap-x-4"},[r("button",{staticClass:"w-full rounded-md border disabled:cursor-not-allowed disabled:opacity-25 bg-gray-500 px-12 py-3 text-xs font-medium text-white transition focus:outline-none focus:ring",attrs:{type:"button"},on:{click:function(t){return e.$bvModal.hide("update-profit-modal")}}},[e._v("\n          Cancel\n        ")]),e._v(" "),r("button",{staticClass:"w-full rounded-md border text-xs disabled:cursor-not-allowed disabled:opacity-25 border-black bg-black px-12 py-3 font-medium text-white transition hover:bg-transparent focus:outline-none focus:ring",attrs:{type:"submit",disabled:!e.isUpdateFormEmpty||e.processingProfitUpdate}},[e._v("\n          "+e._s(e.processing?"saving...":"Update profit")+"\n        ")])])])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Loader:n(518).default})}}]);