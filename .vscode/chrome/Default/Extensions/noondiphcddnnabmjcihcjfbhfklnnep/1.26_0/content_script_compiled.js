'use strict';var e=this,g=function(a,b){a=a.split(".");var c=e;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c=c[d]&&c[d]!==Object.prototype[d]?c[d]:c[d]={}:c[d]=b};var h=function(a,b){return 0==a.lastIndexOf(b,0)},l=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c},m=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")},n=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},p=function(a,b){for(var c=b.length,d=0;d<c;d++){var f=1==c?b:b.charAt(d);if(a.charAt(0)==f&&a.charAt(a.length-1)==f)return a.substring(1,a.length-1)}return a};var q=function(a,b){this.b=b||"";this.a=a||""},r=/\"/g,u=/\\\"/g,w=/\\/g,x=/\\\\/g,aa=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;q.prototype.getName=function(){return this.b};q.prototype.toString=function(){var a=this.getName();a=a.replace(r,"");var b;a:{for(b=0;13>b;b++)if(-1!=a.indexOf('()<>@:\\".[],;'[b])){b=!0;break a}b=!1}b&&(a='"'+a.replace(w,"\\\\")+'"');return""==a?this.a:""==this.a?a:a+" <"+this.a+">"};
var y=function(a,b){if('"'!=a.charAt(b))return!1;var c=0;for(--b;0<=b&&"\\"==a.charAt(b);b--)c++;return 0!=c%2};var ba=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;/*

 Copyright 2011 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var z,A,B,C,D,E,F,G,ca="https://accounts.google.com/SecondFactor https://accounts.google.com/b/0/VerifiedPhoneInterstitial https://accounts.google.com/signin/newfeatures https://accounts.google.com/signin/selectchallenge https://accounts.google.com/signin/challenge https://accounts.google.com/signin/privacyreminder".split(" "),da=["https://accounts.google.com/signin/challenge/sl/password","https://accounts.google.com/signin/challenge/pwd/1"],H=["One account. All of Google.","Sign in with your Google Account",
"<title>Sign in - Google Accounts","//ssl.gstatic.com/accounts/ui/logo_2x.png"],I=['<input id="Passwd" name="Passwd" placeholder="Password" class="" type="password">','<input id="Passwd" name="Passwd" type="password" placeholder="Password" class="">','<input id="signIn" name="signIn" class="rc-button rc-button-submit" ','<div class="editpasswdpage main content clearfix">'],J=["accounts.google.com","login.corp.google.com","myaccount.google.com"],K="",L="",M=!1,N=!1,O=!1,P=!1,T=function(){if(O&&P&&
!h(K,"https://accounts.youtube.com/accounts/CheckConnection")){if(z&&h(K,z)){var a=document.querySelector(A);a?(chrome.runtime.sendMessage({action:"deletePossiblePassword"}),a.addEventListener("submit",ea,!0)):chrome.runtime.sendMessage({action:"savePossiblePassword"})}else if(h(K,"https://accounts.google.com/speedbump/changepassword")){var b;chrome.runtime.sendMessage({action:"getEmail"},function(a){b=a});var c=document.getElementById("gaia_changepasswordform");c.addEventListener("submit",function(){chrome.runtime.sendMessage({action:"setPossiblePassword",
email:b,password:c.Passwd.value})},!0)}else h(K,"https://accounts.google.com/")?fa()?chrome.runtime.sendMessage({action:"savePossiblePassword"}):(chrome.runtime.sendMessage({action:"deletePossiblePassword"}),(a=document.getElementById("gaia_loginform"))&&document.getElementById("Email")?a.addEventListener("submit",ha,!0):document.getElementById("hiddenEmail")&&document.getElementsByName("password")&&(window.onbeforeunload=ia)):h(K,"https://myaccount.google.com/signinoptions/password")?(chrome.runtime.sendMessage({action:"deletePossiblePassword"}),
window.onload=function(){var a=document.querySelectorAll("div[role=button]");a=a[a.length-1];a.addEventListener("click",Q,!0);a.addEventListener("keydown",function(a){32==a.keyCode&&Q()},!0);document.addEventListener("keydown",function(a){13==a.keyCode&&Q()},!0)}):(!R()&&ja()&&chrome.runtime.sendMessage({action:"looksLikeGoogle",url:K,referer:L,securityEmailAddress:E}),chrome.runtime.sendMessage({action:"savePossiblePassword"}));chrome.runtime.sendMessage({action:"statusRequest"},function(a){M=!1;
S(a)})}},fa=function(){var a=K,b=!1;ca.forEach(function(c){h(a,c)&&(b=!0)});b&&da.forEach(function(c){h(a,c)&&(b=!1)});return b},S=function(a){try{var b=JSON.parse(a);if(b.passwordLengths&&0==b.passwordLengths){M=!1;return}}catch(c){}z&&h(K,z)||h(K,"https://accounts.google.com/")||R()?M=!1:(M=!0,N||chrome.storage.local.get("allowed_hosts",function(a){var b=window.location.origin;0<Object.keys(a).length&&a.allowed_hosts[b]&&(M=!1)}),U())},V=function(a){M&&a.isTrusted&&chrome.runtime.sendMessage({action:"handleKeypress",
keyCode:a.charCode,typedTimeStamp:a.timeStamp,url:K,referer:L,looksLikeGoogle:U()})};g("passwordalert.handleKeypress",V);var W=function(a){M&&a.isTrusted&&chrome.runtime.sendMessage({action:"handleKeydown",keyCode:a.keyCode,shiftKey:a.shiftKey,typedTimeStamp:a.timeStamp,url:K,referer:L,looksLikeGoogle:U()})};g("passwordalert.handleKeydown",W);
var X=function(a){!M||void 0===a.clipboardData||a.timeStamp<=F||(F=a.timeStamp,chrome.runtime.sendMessage({action:"checkString",password:a.clipboardData.getData("text/plain").trim(),url:K,referer:L,looksLikeGoogle:U()}))};g("passwordalert.handlePaste",X);
var ea=function(){var a=document.querySelector(C);var b=document.querySelector(B);a&&!a.value||b&&!b.value?(console.log("SSO data is not filled in."),a=!1):a=!0;a&&(a=document.querySelector(C).value,b=document.querySelector(B).value,-1==a.indexOf("@")&&(a+="@"+D.split(",")[0].trim()),chrome.runtime.sendMessage({action:"setPossiblePassword",email:a,password:b}))},ha=function(){var a=document.getElementById("gaia_loginform"),b=a.Email?n(a.Email.value.toLowerCase()):"";a=a.Passwd?a.Passwd.value:"";N&&
!Y(b)||0==(null==a?"":String(a)).length||chrome.runtime.sendMessage({action:"setPossiblePassword",email:b,password:a})},ia=function(){var a=document.getElementById("hiddenEmail");a=a?n(a.value.toLowerCase()):"";var b=document.getElementsByName("password");b&&1==b.length&&(b=b[0].value,N&&!Y(a)||0==(null==b?"":String(b)).length||chrome.runtime.sendMessage({action:"setPossiblePassword",email:a,password:b}))},Q=function(){var a=Date.now();window.onbeforeunload=function(){if(!(1E3<Date.now()-a)){var b=
document.querySelector("div[data-config]").getAttribute("data-config"),c=b.indexOf('",["')+4;b=b.substring(c,b.indexOf('"',c));for(var d=c="",f=0;f<b.length;){var k=b.charAt(f);var v='"<(['.indexOf(k);if(-1!=v&&!y(b,f)){v='">)]'.charAt(v);for(var t=b.indexOf(v,f+1);0<=t&&y(b,t);)t=b.indexOf(v,t+1);k=0<=t?b.substring(f,t+1):k}"<"==k.charAt(0)&&-1!=k.indexOf(">")?d=k.substring(1,k.indexOf(">")):""==d&&(c+=k);f+=k.length}""==d&&-1!=c.indexOf("@")&&(d=c,c="");c=m(c);c=p(c,"'");c=p(c,'"');c=c.replace(u,
'"');c=c.replace(x,"\\");d=m(d);c=new q(d,c);aa.test(c.a)?chrome.runtime.sendMessage({action:"setPossiblePassword",email:b,password:document.querySelector('input[aria-label="New password"]').value}):console.log("Parsed email on change password page is not valid: %s",b)}}},Y=function(a){for(var b=D.split(","),c=0;c<b.length;c++)if(l(a,"@"+b[c].trim()))return!0;return!1},U=function(){if(1==G||0==G)return G;for(var a=document.documentElement.innerHTML.slice(0,12E4),b=0;b<H.length;b++)if(0<=a.indexOf(H[b]))return G=
!0;return G=!1},ja=function(){for(var a=document.documentElement.innerHTML.slice(0,12E4),b=0;b<I.length;b++)if(0<=a.indexOf(I[b]))return!0;return!1},R=function(){var a=((a=K.match(ba)[3]||null)?decodeURI(a):a)||"";for(var b=0;b<J.length;b++){var c=J[b];if(a==c)return!0;var d=c;h(c,".")||(d="."+d);if(l(a,d))return!0}return!1};
chrome.storage.onChanged.addListener(function(a,b){if("managed"==b){b=function(a,b){return a.filter(function(a){return 0>b.indexOf(a)})};for(var c in a){N||(N=!0);var d=a[c].newValue,f=a[c].oldValue;switch(c){case "corp_email_domain":D=d.replace(/@/g,"").toLowerCase();break;case "corp_html":H=b(H,f);Array.prototype.push.apply(H,d);break;case "corp_html_tight":I=b(I,f);Array.prototype.push.apply(I,d);break;case "security_email_address":E=d;break;case "sso_form_selector":A=d;break;case "sso_password_selector":B=
d;break;case "sso_url":z=d;break;case "sso_username_selector":C=d;break;case "whitelist_top_domains":J=b(J,f.filter(String)),Array.prototype.push.apply(J,d.filter(String))}}}});
(function(a){chrome.storage.managed.get(function(b){0==Object.keys(b).length?N=!1:(N=!0,D=b.corp_email_domain.replace(/@/g,"").toLowerCase(),E=b.security_email_address,A=b.sso_form_selector,B=b.sso_password_selector,z=b.sso_url,C=b.sso_username_selector,b.whitelist_top_domains&&Array.prototype.push.apply(J,b.whitelist_top_domains.filter(String)),b.corp_html&&Array.prototype.push.apply(H,b.corp_html),b.corp_html_tight&&Array.prototype.push.apply(I,b.corp_html_tight));O=!0;a()})})(T);
window.addEventListener("keypress",V,!0);window.addEventListener("keydown",W,!0);window.addEventListener("paste",X,!0);var Z=location.href.toString();"about:blank"==Z?(K=window.parent.location.href,L=""):(K=Z,L=document.referrer.toString());chrome.runtime.onMessage.addListener(function(a){M=!1;S(a)});document.addEventListener("DOMContentLoaded",function(){P=!0;T()});if("interactive"==document.readyState||"complete"==document.readyState||"loaded"==document.readyState)P=!0,T();
