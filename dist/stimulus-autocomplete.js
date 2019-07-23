function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var e=require("stimulus"),n=t(require("lodash.debounce")),s=t(require("keycode")),i=function(t){function e(){t.apply(this,arguments)}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var i={src:{configurable:!0},minLength:{configurable:!0}};return e.prototype.connect=function(){this.resultsTarget.hidden=!0,this.inputTarget.setAttribute("autocomplete","off"),this.inputTarget.setAttribute("spellcheck","false"),this.mouseDown=!1,this.onInputChange=n(this.onInputChange.bind(this),300),this.onResultsClick=this.onResultsClick.bind(this),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onInputFocus=this.onInputFocus.bind(this),this.onKeydown=this.onKeydown.bind(this),this.inputTarget.addEventListener("keydown",this.onKeydown),this.inputTarget.addEventListener("focus",this.onInputFocus),this.inputTarget.addEventListener("blur",this.onInputBlur),this.inputTarget.addEventListener("input",this.onInputChange),this.resultsTarget.addEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.addEventListener("click",this.onResultsClick)},e.prototype.disconnect=function(){this.inputTarget.removeEventListener("keydown",this.onKeydown),this.inputTarget.removeEventListener("focus",this.onInputFocus),this.inputTarget.removeEventListener("blur",this.onInputBlur),this.inputTarget.removeEventListener("input",this.onInputChange),this.resultsTarget.removeEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.removeEventListener("click",this.onResultsClick)},e.prototype.sibling=function(t){var e=Array.from(this.resultsTarget.querySelectorAll('[role="option"]')),n=this.resultsTarget.querySelector('[aria-selected="true"]'),s=e.indexOf(n);return(t?e[s+1]:e[s-1])||(t?e[0]:e[e.length-1])},e.prototype.select=function(t){for(var e=0,n=this.resultsTarget.querySelectorAll('[aria-selected="true"]');e<n.length;e+=1){var s=n[e];s.removeAttribute("aria-selected"),s.classList.remove("active")}t.setAttribute("aria-selected","true"),t.classList.add("active"),this.inputTarget.setAttribute("aria-activedescendant",t.id)},e.prototype.onKeydown=function(t){switch(s(t)){case"esc":this.resultsTarget.hidden||(this.hideAndRemoveOptions(),t.stopPropagation(),t.preventDefault());break;case"down":var e=this.sibling(!0);e&&this.select(e),t.preventDefault();break;case"up":var n=this.sibling(!1);n&&this.select(n),t.preventDefault();break;case"tab":var i=this.resultsTarget.querySelector('[aria-selected="true"]');i&&this.commit(i);break;case"enter":var r=this.resultsTarget.querySelector('[aria-selected="true"]');r&&!this.resultsTarget.hidden&&(this.commit(r),t.preventDefault())}},e.prototype.onInputFocus=function(){this.fetchResults()},e.prototype.onInputBlur=function(){this.mouseDown||(this.resultsTarget.hidden=!0)},e.prototype.commit=function(t){if("true"!==t.getAttribute("aria-disabled")){if(t instanceof HTMLAnchorElement)return t.click(),void(this.resultsTarget.hidden=!0);var e=t.textContent.trim(),n=t.getAttribute("data-autocomplete-value")||e;this.inputTarget.value=e,this.hasHiddenTarget?this.hiddenTarget.value=n:this.inputTarget.value=n,this.element.dispatchEvent(new CustomEvent("autocomplete.change",{bubbles:!0,detail:{value:n,textValue:e}})),this.inputTarget.focus(),this.hideAndRemoveOptions()}},e.prototype.onResultsClick=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.commit(e)}},e.prototype.onResultsMouseDown=function(){var t=this;this.mouseDown=!0,this.resultsTarget.addEventListener("mouseup",function(){return t.mouseDown=!1},{once:!0})},e.prototype.onInputChange=function(){this.element.removeAttribute("value"),this.fetchResults()},e.prototype.identifyOptions=function(){for(var t=0,e=0,n=this.resultsTarget.querySelectorAll('[role="option"]:not([id])');e<n.length;e+=1)n[e].id=this.resultsTarget.id+"-option-"+t++},e.prototype.hideAndRemoveOptions=function(){this.resultsTarget.hidden=!0,this.resultsTarget.innerHTML=null},e.prototype.fetchResults=function(){var t=this,e=this.inputTarget.value.trim();if(!e||e.length<this.minLength)this.hideAndRemoveOptions();else if(this.src){var n=new URL(this.src,window.location.href),s=new URLSearchParams(n.search.slice(1));s.append("q",e),n.search=s.toString(),this.element.dispatchEvent(new CustomEvent("loadstart")),fetch(n.toString()).then(function(t){return t.text()}).then(function(e){t.resultsTarget.innerHTML=e,t.identifyOptions();var n=!!t.resultsTarget.querySelector('[role="option"]');t.resultsTarget.hidden=!n,t.element.dispatchEvent(new CustomEvent("load")),t.element.dispatchEvent(new CustomEvent("loadend"))}).catch(function(){t.element.dispatchEvent(new CustomEvent("error")),t.element.dispatchEvent(new CustomEvent("loadend"))})}},e.prototype.open=function(){this.resultsTarget.hidden&&(this.resultsTarget.hidden=!1,this.element.setAttribute("aria-expanded","true"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},e.prototype.close=function(){this.resultsTarget.hidden||(this.resultsTarget.hidden=!0,this.inputTarget.removeAttribute("aria-activedescendant"),this.element.setAttribute("aria-expanded","false"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},i.src.get=function(){return this.data.get("url")},i.minLength.get=function(){var t=this.data.get("min-length");return t?parseInt(t,10):0},Object.defineProperties(e.prototype,i),e}(e.Controller);i.targets=["input","hidden","results"],exports.Autocomplete=i;
//# sourceMappingURL=stimulus-autocomplete.js.map
