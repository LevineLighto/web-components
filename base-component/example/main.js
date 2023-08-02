class NameBold extends BaseComponent {
    static observedAttributes = ['name'];
    Attributes = {
        name : {
            type    : 'string',
            required: true
        }
    }

    _render() {
        this.innerHTML = `<strong>${this.Attributes.name.value}</strong>`
    }
}

class NameItalic extends BaseComponent {
    static observedAttributes = ['name'];
    Attributes = {
        name : {
            type    : 'string',
            required: true
        }
    }

    _render() {
        this.innerHTML = `<i>${this.Attributes.name.value}</i>`
    }
}

customElements.define('name-bold', NameBold);
customElements.define('name-italic', NameItalic);