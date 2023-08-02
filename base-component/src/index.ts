import { 
    AttributeSetup,
} from "@/types";

export class BaseComponent extends HTMLElement {

    Attributes  : AttributeSetup = {}
    rendered    : boolean = false;

    constructor() {
        super();
    }

    attributeChangedCallback(name : string, oldval : string, newval : string) {
        this._storeAttribute(name, newval);

        if(!this.isConnected || !this.rendered) {
            return;
        }

        this._validateAttr();
        
        this._render();
    }

    connectedCallback() {
        for(let name of this.getAttributeNames()) {
            if(!(name in this.Attributes)) {
                continue;
            }
            
            this._storeAttribute(name, this.getAttribute(name));
        }

        this._validateAttr();

        this._render();
        this.rendered = true;
    }

    getValue(AttributeName : string) {
        return this.Attributes[AttributeName].value;
    }

    _storeAttribute(name : string, value : string | undefined | null = '') {
        if(!value || !(name in this.Attributes)) {
            return;
        }

        const type = this.Attributes[name].type;

        if(Array.isArray(type)) {
            if(type.includes(value)) {
                this.Attributes[name].value = value;
                return;
            }

            this.setAttribute(name, type[0]);
            return;
        }

        if(type == 'object') {
            this.Attributes[name].value = JSON.parse(value);
            return;
        }

        if(type == 'number') {
            this.Attributes[name].value = parseInt(value);
            return;
        }

        if(type == 'boolean') {
            if(value == '1' || value == '0') {
                this.Attributes[name].value = Boolean(parseInt(value));
                return;
            }

            this.Attributes[name].value = (value.toLowerCase() == 'true');
            return;
        }

        this.Attributes[name].value = value;
    }

    _validateAttr() {
        let errorMessage = '';
        for (const name in this.Attributes) {
            if(!this.Attributes[name].required) {
                continue;
            }

            if(typeof this.Attributes[name].value != 'undefined') {
                continue;
            }

            if(errorMessage != '') {
                errorMessage += ', '
            }

            errorMessage += `Attribute ${name} is missing`;
        }

        if(errorMessage == '') {
            return;
        }

        const className = this.constructor.name;

        console.error(`Improper setup for ${className} component: ${errorMessage}`);
    }

    _render() {

    }
}