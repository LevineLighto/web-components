import BaseComponent from "@levinelito/base-component";
import {createElement} from "@levinelito/create-html-element/src/createElement";

class Pagination extends BaseComponent {
    static observedAttributes = [
        'max-page',
        'page',
    ];

    availableAttr = {
        'max-page'  : 'integer',
        'page'      : 'integer',
    }

    constructor() {
        super();
        this.attr = {
            page: 1,
            'max-page': 1
        }
        this.temp = document.createElement('div');
    }

    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        if(this._callback && typeof this._callback == 'function') {
            this._callback(this.attr.page);
        }
    }

    _render() {
        if(!this.previous) {
            this.previous = createElement({
                tagname: 'li', 
                classnames: 'page-item', 
                content: '<a class="page-link">&lt;</a>'
            });
            this.previous.addEventListener('click', event => {
                if(!event.currentTarget.classList.contains('disabled')) {
                    this.setAttribute('page', this.attr.page - 1);
                }
            });
        }

        if(this.attr.page <= 1) {
            this.previous.classList.add('disabled');
        } else {
            this.previous.classList.remove('disabled');
        }

        if(!this.next) {
            this.next = createElement({
                tagname: 'li', 
                classnames: 'page-item', 
                content: '<a class="page-link">&gt;</a>'
            });
            this.next.addEventListener('click', event => {
                if(!event.currentTarget.classList.contains('disabled')) {
                    this.setAttribute('page', this.attr.page + 1);
                }
            });
        }

        if(this.attr.page >= this.attr['max-page']) {
            this.next.classList.add('disabled');
        } else {
            this.next.classList.remove('disabled');
        }

        if(!this.main) {
            this.appendChild(createElement({
                tagname: 'nav',
                content: '<ul class="pagination"></ul>'
            }));
            this.main = this.querySelector('ul');
            this.main.append([this.previous, this.next]);
        }
        while(this.next.previousElementSibling != this.previous) {
            this.removeChild(this.next.previousElementSibling);
        }

        for(let page = 1; page <= this.attr['max-page']; page++) {
            let element;
            if(
                page == 1 || 
                (page >= this.attr.page - 1 && page <= this.attr.page + 1) ||
                page == this.attr['max-page']
            ) {
                element = createElement({
                    tagname: 'li',
                    classnames: 'page-item',
                    content: `<a class="page-link" href="#">${page}</a>`
                });
                element.addEventListener('click', event => {
                    this.setAttribute('page', page);
                });
            } else if(
                page == this.attr.page - 2 ||
                page == this.attr.page + 2
            ) {
                element = createElement({
                    tagname: 'li',
                    classnames: 'page-item disabled',
                    content: '<a class="page-link">&hellip;</a>'
                });
            }
            this.insertBefore(this.next, element);

            if(page < this.attr.page - 3) {
                page = this.attr.page - 3
            } else if( page >= this.attr.page + 2 && page < this.attr['max-page']) {
                page = this.attr['max-page'] - 1;
            }
        }
    }

    set callback (callback = page => false) {
        this._callback = callback;
    }
}

export default Pagination;