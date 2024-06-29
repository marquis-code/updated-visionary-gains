(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{673:function(e,t,r){"use strict";r.r(t);var o=r(48),n=(r(93),r(13),r(8),{layout:"authLayout",data:function(){return{user:"",processing:!1,form:{resetCode:"",email:"",password:""}}},computed:{isFormEmpty:function(){return!(!this.form.password||!this.form.resetCode)}},mounted:function(){this.user=JSON.parse(window.localStorage.getItem("user-email"))},methods:{login:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.processing=!0,t.prev=2,t.next=5,fetch("https://visionary-zpui.onrender.com/graphql/query",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:"\n      mutation resetPassword($email: String!, $newPassword: String!, $resetCode: String!) {\n            resetPassword(email: $email, newPassword: $newPassword, resetCode: $resetCode)\n          }\n        ",variables:{email:e.user,newPassword:e.form.password,resetCode:e.form.resetCode}})});case 5:return r=t.sent,t.next=8,r.json();case 8:null!=(data=t.sent)&&data.errors?e.$toastr.e(data.errors[0].message):(localStorage.removeItem("user-email"),e.$toastr.s("Password reset was successfully. Please Login"),e.$router.push("/login"));case 10:return t.prev=10,e.processing=!1,t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[2,,10,13]])})))()}}}),l=r(46),component=Object(l.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"bg-[#303435] h-screen"},[t("section",{staticClass:"bg-[#303435] flex justify-center items-center pt-20 container mx-auto"},[t("div",{staticClass:"w-full max-w-md p-8 space-y-6 rounded-xl bg-white"},[t("h1",{staticClass:"text-3xl font-bold"},[e._v("\n        Almost Done!\n      ")]),e._v(" "),t("p",{staticClass:"text-gray-500 text-sm leading-loose"},[e._v("\n        Please enter your reset password token and your new password.\n      ")]),e._v(" "),t("form",{staticClass:"space-y-10",on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[t("div",{staticClass:"space-y-1 text-sm w-full"},[t("label",{staticClass:"block text-gray-900 font-medium",attrs:{for:"token"}},[e._v("Token")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.resetCode,expression:"form.resetCode"}],staticClass:"border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900",attrs:{id:"token",type:"tel",name:"token",placeholder:"email"},domProps:{value:e.form.resetCode},on:{input:function(t){t.target.composing||e.$set(e.form,"resetCode",t.target.value)}}})]),e._v(" "),t("div",{staticClass:"space-y-1 text-sm w-full"},[t("label",{staticClass:"block text-gray-900 font-medium",attrs:{for:"password"}},[e._v("New Password")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],staticClass:"border w-full outline-none px-4 py-3 rounded-md border-gray-900 text-gray-900",attrs:{id:"password",type:"password",name:"password",placeholder:"password"},domProps:{value:e.form.password},on:{input:function(t){t.target.composing||e.$set(e.form,"password",t.target.value)}}})]),e._v(" "),t("div",{staticClass:"w-full"},[t("button",{staticClass:"w-full shrink-0 text-xs disabled:cursor-not-allowed disabled:opacity-25 rounded-md border border-green-500 bg-green-600 px-12 py-3 font-medium text-white transition",class:[!e.isFormEmpty||e.processing?"opacity-25 cursor-not-allowed":""],attrs:{disabled:!e.isFormEmpty}},[e._v("\n            "+e._s(e.processing?"processing...":"Submit")+"\n          ")])])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);