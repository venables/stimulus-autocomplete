!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("stimulus"),require("lodash.debounce"),require("keycode")):"function"==typeof define&&define.amd?define(["exports","stimulus","lodash.debounce","keycode"],e):e(t.stimulusAutocomplete={},t.stimulus,t.debounce,t.keycode)}(this,function(t,e,s,n){s=s&&s.hasOwnProperty("default")?s.default:s,n=n&&n.hasOwnProperty("default")?n.default:n;var i=function(t){function e(){t.apply(this,arguments)}t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e;var i={activeClassList:{configurable:!0},queryParam:{configurable:!0},src:{configurable:!0},minLength:{configurable:!0}};return e.prototype.connect=function(){this.previousSearch=null,this.resultsTarget.hidden=!0,this.inputTarget.setAttribute("autocomplete","off"),this.inputTarget.setAttribute("spellcheck","false"),this.mouseDown=!1,this.onInputChange=s(this.onInputChange.bind(this),300),this.onResultsClick=this.onResultsClick.bind(this),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onResultsMouseOver=this.onResultsMouseOver.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onInputFocus=this.onInputFocus.bind(this),this.onKeydown=this.onKeydown.bind(this),this.inputTarget.addEventListener("keydown",this.onKeydown),this.inputTarget.addEventListener("focus",this.onInputFocus),this.inputTarget.addEventListener("blur",this.onInputBlur),this.inputTarget.addEventListener("input",this.onInputChange),this.resultsTarget.addEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.addEventListener("mouseover",this.onResultsMouseOver),this.resultsTarget.addEventListener("click",this.onResultsClick)},e.prototype.disconnect=function(){this.inputTarget.removeEventListener("keydown",this.onKeydown),this.inputTarget.removeEventListener("focus",this.onInputFocus),this.inputTarget.removeEventListener("blur",this.onInputBlur),this.inputTarget.removeEventListener("input",this.onInputChange),this.resultsTarget.removeEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.removeEventListener("mouseover",this.onResultsMouseOver),this.resultsTarget.removeEventListener("click",this.onResultsClick)},e.prototype.sibling=function(t){var e=Array.from(this.resultsTarget.querySelectorAll('[role="option"]')),s=this.resultsTarget.querySelector('[aria-selected="true"]'),n=e.indexOf(s);return(t?e[n+1]:e[n-1])||(t?e[0]:e[e.length-1])},e.prototype.select=function(t){for(var e,s,n=0,i=this.resultsTarget.querySelectorAll('[aria-selected="true"]');n<i.length;n+=1){var r=i[n];r.removeAttribute("aria-selected"),(e=r.classList).remove.apply(e,this.activeClassList)}t.setAttribute("aria-selected","true"),(s=t.classList).add.apply(s,this.activeClassList),this.inputTarget.setAttribute("aria-activedescendant",t.id)},e.prototype.onKeydown=function(t){switch(n(t)){case"esc":this.resultsTarget.hidden||(this.hideAndRemoveOptions(),t.stopPropagation(),t.preventDefault());break;case"down":var e=this.sibling(!0);e&&this.select(e),t.preventDefault();break;case"up":var s=this.sibling(!1);s&&this.select(s),t.preventDefault();break;case"tab":var i=this.resultsTarget.querySelector('[aria-selected="true"]');i&&this.commit(i);break;case"enter":var r=this.resultsTarget.querySelector('[aria-selected="true"]');r&&!this.resultsTarget.hidden&&(this.commit(r),t.preventDefault())}},e.prototype.onInputFocus=function(){this.element.dispatchEvent(new CustomEvent("autocomplete.focus",{bubbles:!0})),this.fetchResults()},e.prototype.onInputBlur=function(){this.mouseDown||(this.element.dispatchEvent(new CustomEvent("autocomplete.blur",{bubbles:!0})),this.resultsTarget.hidden=!0)},e.prototype.commit=function(t){if("true"!==t.getAttribute("aria-disabled")){if(t instanceof HTMLAnchorElement)return t.click(),void(this.resultsTarget.hidden=!0);if(t instanceof HTMLFormElement)return t.submit(),void(this.resultsTarget.hidden=!0);var e=t.textContent.trim(),s=t.getAttribute("data-autocomplete-value")||e;this.onSelect(t,e,s),this.hasHiddenTarget?(this.hiddenTarget.value=s,this.hiddenTarget.dispatchEvent(new Event("change"))):this.inputTarget.value=s,this.element.dispatchEvent(new CustomEvent("autocomplete.change",{bubbles:!0,detail:{value:s,textValue:e}})),this.inputTarget.focus(),this.hideAndRemoveOptions()}},e.prototype.onSelect=function(t,e,s){this.inputTarget.value=t.getAttribute("data-autocomplete-content")||t.textContent.trim(),this.previousSearch=this.inputTarget.value},e.prototype.onResultsClick=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.commit(e)}},e.prototype.onResultsMouseOver=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.select(e)}},e.prototype.onResultsMouseDown=function(){var t=this;this.mouseDown=!0,this.resultsTarget.addEventListener("mouseup",function(){return t.mouseDown=!1},{once:!0})},e.prototype.onInputChange=function(){this.element.removeAttribute("value"),this.fetchResults()},e.prototype.identifyOptions=function(){for(var t=0,e=0,s=this.resultsTarget.querySelectorAll('[role="option"]:not([id])');e<s.length;e+=1)s[e].id=this.resultsTarget.id+"-option-"+t++},e.prototype.hideAndRemoveOptions=function(){this.resultsTarget.hidden=!0,this.resultsTarget.innerHTML=null},e.prototype.fetchResults=function(){var t=this,e=this.inputTarget.value.trim();if(!e||e.length<this.minLength||e===this.previousSearch)this.hideAndRemoveOptions();else if(this.src){var s=new URL(this.src,window.location.href),n=new URLSearchParams(s.search.slice(1));n.append(this.queryParam,e),s.search=n.toString(),this.element.dispatchEvent(new CustomEvent("loadstart")),fetch(s.toString()).then(function(e){return t.handleAutocompleteResponse(e)}).then(function(e){t.resultsTarget.innerHTML=e,t.identifyOptions();var s=!!t.resultsTarget.querySelector('[role="option"]');t.resultsTarget.hidden=!s,t.element.dispatchEvent(new CustomEvent("load")),t.element.dispatchEvent(new CustomEvent("loadend"))}).catch(function(){t.element.dispatchEvent(new CustomEvent("error")),t.element.dispatchEvent(new CustomEvent("loadend"))})}},e.prototype.handleAutocompleteResponse=function(t){return t.text()},e.prototype.open=function(){this.resultsTarget.hidden&&(this.resultsTarget.hidden=!1,this.element.setAttribute("aria-expanded","true"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},e.prototype.close=function(){this.resultsTarget.hidden||(this.resultsTarget.hidden=!0,this.inputTarget.removeAttribute("aria-activedescendant"),this.element.setAttribute("aria-expanded","false"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{input:this.input,results:this.results}})))},i.activeClassList.get=function(){return(this.data.has("active-class")?this.data.get("active-class"):"active").split(" ").map(function(t){return t.trim()}).filter(function(t){return null!=t&&""!=t})},i.queryParam.get=function(){return this.data.has("query")?this.data.get("query"):"q"},i.src.get=function(){return this.data.get("url")},i.minLength.get=function(){var t=this.data.get("min-length");return t?parseInt(t,10):0},Object.defineProperties(e.prototype,i),e}(e.Controller);i.targets=["input","hidden","results"],t.Autocomplete=i});
//# sourceMappingURL=stimulus-autocomplete.umd.js.map
