window.loadComponent = (function() {
    function fetchAndParse(URL) {
        return fetch( URL )
            .then(response => { return response.text() })
            .then(html => {
                const parser = new DOMParser()
                const document = parser.parseFromString( html, 'text/html' )
                const head = document.head
                const template = head.querySelector( 'template' )
                const style = head.querySelector( 'style' )
                const script = head.querySelector( 'script' )
          
                return {
                    template,
                    style,
                    script
                }
            })
        }
    
    function registerComponent({ template, style, script }) {
        class UnityComponent extends HTMLElement {
            connectedCallback() { // is called when (after) the element is attached to the DOM
                this._upcast()
            }
        
            _upcast() {
                const shadow = this.attachShadow({ mode: 'open' }) // open: Elements of the shadow root are accessible from JavaScript outside the root, for example using Element.shadowRoot returns shadowRoot obj
            
                shadow.appendChild( style.cloneNode(true ))
                shadow.appendChild( document.importNode(template.content, true ))
            }
        }
        return customElements.define( 'g-header', UnityComponent )
    }
    
    function loadComponent(URL) {
        return fetchAndParse(URL).then(registerComponent)
    }

    return loadComponent
}())
