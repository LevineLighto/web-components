class BaseComponent extends HTMLElement {

    availableAttr   = {};
    requiredAttr    = [];

    constructor() {
        super();

        this.attr       = {};
        this.rendered   = false;
        
        for(let name of this.getAttributeNames()) {
            if(name in this.availableAttr) {
                this._storeAttribute(name, this.getAttribute(name));
            }
        }
    }

    attributeChangedCallback(name, oldval, newval) {
        this._storeAttribute(name, newval);

        if(this.isConnected && this.rendered) {
            this._validateAttr();
            this._render();
        }
    }

    connectedCallback() {
        this._validateAttr();
        this._render();
        this.rendered = true;
    }

    _storeAttribute(name, value = '') {
        if(this.availableAttr[name] == 'object') {
            this.attr[name] = JSON.parse(value);
        } else if (this.availableAttr[name] == 'integer') {
            this.attr[name] = parseInt(value);
        } else if (this.availableAttr[name] == 'boolean') {
            if(value == '1' || value == '0') {
                this.attr[name] = Boolean(parseInt(value));
            } else {
                this.attr[name] = (value.toLowerCase() === 'true');
            }
        } else {
            this.attr[name] = value;
        }
    }

    _validateAttr() {
        let errorMessage = '';
        this.requiredAttr.forEach(attr => {
            if(!(attr in this.attr)) {
                errorMessage += `${attr} is missing;
                `;
            }
        });
        return {error: errorMessage != '', message: errorMessage}
    }

    _render() {

    }
}

export default BaseComponent;