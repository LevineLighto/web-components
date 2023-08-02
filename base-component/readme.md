# Simple Base Class for Web Component

## Usage

```javascript
class MyInfo extends BaseComponent {
    static observedAttributes = ['name', 'height'];
    Attributes = {
        name : {
            required    : true,
            type        : 'string'
        },
        height : { type : 'integer' }
    }
    
    _render() {
        this.innerHTML = '<div>';
        this.innerHTML += `My name is ${this.getValue('name')}.`;
        this.innerHTML += `I'm ${this.getValue('height')} cm tall.`;
        this.innerHTML += '</div>';
    }
}
customElements.define('my-info', MyInfo);
```

```html
<my-info name="Levine" height="170"></my-info>
```