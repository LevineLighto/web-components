!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var i in r)("object"==typeof exports?exports:t)[i]=r[i]}}(self,(()=>(()=>{"use strict";var t={d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{BaseComponent:()=>r});class r extends HTMLElement{constructor(){super(),this.Attributes={},this.rendered=!1}attributeChangedCallback(t,e,r){this._storeAttribute(t,r),this.isConnected&&this.rendered&&(this._validateAttr(),this._render())}connectedCallback(){for(let t of this.getAttributeNames())t in this.Attributes&&this._storeAttribute(t,this.getAttribute(t));this._validateAttr(),this._render(),this.rendered=!0}getValue(t){return this.Attributes[t].value}_storeAttribute(t,e=""){if(!e||!(t in this.Attributes))return;const r=this.Attributes[t].type;if(Array.isArray(r))return r.includes(e)?void(this.Attributes[t].value=e):void this.setAttribute(t,r[0]);if("object"!=r){if("number"!=r)return"boolean"==r?"1"==e||"0"==e?void(this.Attributes[t].value=Boolean(parseInt(e))):void(this.Attributes[t].value="true"==e.toLowerCase()):void(this.Attributes[t].value=e);this.Attributes[t].value=parseInt(e)}else this.Attributes[t].value=JSON.parse(e)}_validateAttr(){let t="";for(const e in this.Attributes)this.Attributes[e].required&&void 0===this.Attributes[e].value&&(""!=t&&(t+=", "),t+=`Attribute ${e} is missing`);if(""==t)return;const e=this.constructor.name;console.error(`Improper setup for ${e} component: ${t}`)}_render(){}}return e})()));