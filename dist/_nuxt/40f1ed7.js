(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{557:function(t,e,n){var content=n(630);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("3b2fc500",content,!0,{sourceMap:!1})},629:function(t,e,n){"use strict";n(557)},630:function(t,e,n){var r=n(68)((function(i){return i[1]}));r.push([t.i,".fade-enter-active[data-v-2a854b7c]{transition:all .3s cubic-bezier(.52,.02,.19,1.02) .15s}.fade-leave-active[data-v-2a854b7c]{transition:all .3s cubic-bezier(.52,.02,.19,1.02)}.fade-enter-from[data-v-2a854b7c]{opacity:0}.fade-enter-from[data-v-2a854b7c],.fade-leave-to[data-v-2a854b7c]{transform:scale(.8)}",""]),r.locals={},t.exports=r},683:function(t,e,n){"use strict";n.r(e);n(25),n(176);var r=n(48),o=(n(93),n(14),n(81),n(13),n(8),n(42),{name:"Objective",components:{EnlargeableImage:n(223).a},layout:"user-dashboard",scrollToTop:!0,data:function(){return{transactionsList:[],fields:[{key:"sn",label:"S/N",class:"font-medium text-gray-400 text-sm"},{key:"amount",label:"Amount",class:"font-medium text-gray-400 text-sm"},{key:"wallet",label:"Wallet",class:"font-medium text-gray-400 text-sm"},{key:"transactionType",label:"Transaction Type",class:"font-medium text-gray-400 text-sm"},{key:"transactionStatus",label:"Transaction Status",class:"font-medium text-gray-400 text-sm"},{key:"proof",label:"Proof",class:"font-medium text-gray-400 text-sm"},{key:"timeAdded",label:"Date",class:"font-medium text-gray-400 text-sm"}],currentPage:1,perPage:6,search:"",showModal:!1,totalRows:1,loading:!1}},head:function(){return{meta:[{hid:"twitter:title",name:"twitter:title",content:this.title},{hid:"twitter:description",name:"twitter:description",content:this.description},{hid:"twitter:image",name:"twitter:image",content:this.image},{hid:"twitter:image:alt",name:"twitter:image:alt",content:this.title},{hid:"og:title",property:"og:title",content:this.title},{hid:"og:description",property:"og:description",content:this.description},{hid:"og:image",property:"og:image",content:this.image},{hid:"og:image:secure_url",property:"og:image:secure_url",content:this.image},{hid:"og:image:alt",property:"og:image:alt",content:this.title}]}},created:function(){this.fetchTransactions()},mounted:function(){this.totalRows=this.transactionsList.length},methods:{goBack:function(){this.$router.go(-1)},fetchTransactions:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,n=JSON.parse(window.localStorage.getItem("auth")),t.loading=!0,e.prev=5,e.next=8,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+n},body:JSON.stringify({query:"\n        query {\n          getUsersTransactions {\n            id\n            amount\n            wallet\n            transactionType\n            transactionStatus\n            user {\n              id\n              firstName\n              lastName\n              email\n              Status\n              PlanType\n              accountBalance\n              tradingBalance\n              profit\n              eth\n              btc\n              timeAdded\n            }\n            proof\n            timeAdded\n          }\n        }\n      "})});case 8:return r=e.sent,e.next=11,r.json();case 11:null!=(data=e.sent)&&data.errors?t.$toastr.e(data.errors[0].message):(t.transactionsList=data.data.getUsersTransactions,t.totalRows=data.data.getUsersTransactions.length);case 13:return e.prev=13,t.loading=!1,e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[5,,13,16]])})))()},formatDateTime:function(t){if("string"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))return"Invalid Date";return t.toLocaleDateString("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})},formatNumberAsDollar:function(t){return null==t?void 0:t.toLocaleString("en-US",{style:"currency",currency:"USD"})}}}),l=(n(629),n(46)),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("main",[e("Transition",{attrs:{name:"fade"}},[e("section",{staticClass:"text-white"},[e("div",{staticClass:"flex items-center justify-between my-3"},[e("button",{staticClass:"outline-none border bg-gray-200 text-black px-3 py-1 rounded-md text-sm",on:{click:function(e){return t.goBack()}}},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"23",height:"23",viewBox:"0 0 24 24",fill:"none",stroke:"#747070","stroke-width":"2","stroke-linecap":"square","stroke-linejoin":"bevel"}},[e("path",{attrs:{d:"M19 12H6M12 5l-7 7 7 7"}})])])]),t._v(" "),e("div",{staticClass:"sm:flex-1 pb-0 mt-3"},[e("label",{staticClass:"sr-only",attrs:{for:"search"}},[t._v("Search")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"w-full rounded-tr-md rounded-tl-md outline-none bg-white p-3 text-gray-700 transition border focus:border-white focus:outline-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent",attrs:{type:"text",placeholder:"Search.."},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})]),t._v(" "),e("b-card",{staticClass:"mt-3"},[e("b-table",{attrs:{striped:"","show-empty":"",responsive:"",items:t.transactionsList,fields:t.fields,busy:t.loading,"current-page":t.currentPage,"per-page":t.perPage},scopedSlots:t._u([{key:"table-busy",fn:function(){return[e("div",{staticClass:"text-center my-2 cursor-pointer"},[e("b-spinner",{staticClass:"align-middle"}),t._v(" "),e("small",[t._v("Loading...")])],1)]},proxy:!0},{key:"empty",fn:function(){return[e("p",{staticClass:"text-center text-sm text-secondary py-2 cursor-pointer"},[t._v("\n              "+t._s(t.search?'No Transactions found for search value: "'.concat(t.search,'"'):"No Transactions available")+"\n            ")])]},proxy:!0},{key:"cell(sn)",fn:function(data){return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm cursor-pointer"},[t._v("\n                "+t._s(data.index+1))])])]}},{key:"cell(amount)",fn:function(data){var n;return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm cursor-pointer"},[t._v("\n                "+t._s(t.formatNumberAsDollar(null==data||null===(n=data.item)||void 0===n?void 0:n.amount))+"\n              ")])])]}},{key:"cell(wallet)",fn:function(data){var n;return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm cursor-pointer"},[t._v("\n                "+t._s(null==data||null===(n=data.item)||void 0===n?void 0:n.wallet))])])]}},{key:"cell(transactionType)",fn:function(data){var n;return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm"},[t._v("\n                "+t._s(null==data||null===(n=data.item)||void 0===n?void 0:n.transactionType))])])]}},{key:"cell(transactionStatus)",fn:function(data){var n;return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm cursor-pointer"},[t._v("\n                "+t._s(null==data||null===(n=data.item)||void 0===n?void 0:n.transactionStatus))])])]}},{key:"cell(proof)",fn:function(data){var n,r;return[e("div",{staticClass:"py-4"},[null!=data&&null!==(n=data.item)&&void 0!==n&&n.proof?e("span",{staticClass:"font-medium py-2 text-sm"},[e("enlargeable-image",{staticClass:"z-50",attrs:{src:data.item.proof,animation_duration:"700"}},[e("img",{staticClass:"h-10 w-10 rounded-full",attrs:{alt:"",src:null==data||null===(r=data.item)||void 0===r?void 0:r.proof}})])],1):e("span",[t._v("N/A")])])]}},{key:"cell(timeAdded)",fn:function(data){var n;return[e("div",{staticClass:"py-4"},[e("span",{staticClass:"font-medium py-2 text-sm"},[t._v(t._s(t.formatDateTime(null==data||null===(n=data.item)||void 0===n?void 0:n.timeAdded)))])])]}}])}),t._v(" "),e("div",{staticClass:"flex justify-end items-end"},[e("b-pagination",{staticClass:"my-3",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,size:"md"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1)])],1)}),[],!1,null,"2a854b7c",null);e.default=component.exports}}]);