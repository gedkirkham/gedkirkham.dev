console.log('loader.js')

window.loadComponent = (function() {
    console.log('loadComponent')
    function fetchAndParse(URL) {
        return fetch( URL ).then( ( response ) => {
            return response.text();
          } ).then( ( html ) => {
            const parser = new DOMParser();
            const document = parser.parseFromString( html, 'text/html' );
            const head = document.head;
            const template = head.querySelector( 'template' );
            const style = head.querySelector( 'style' );
            const script = head.querySelector( 'script' );
          
            return {
              template,
              style,
              script
            };
          } );
        }
    
        function registerComponent( { template, style, script } ) {
            class UnityComponent extends HTMLElement {
              connectedCallback() {
                this._upcast();
              }
          
              _upcast() {
                const shadow = this.attachShadow( { mode: 'open' } );
          
                shadow.appendChild( style.cloneNode( true ) );
                shadow.appendChild( document.importNode( template.content, true ) );
              }
            }
            return customElements.define( 'g-header', UnityComponent );
          }
    
    function loadComponent(URL) {
        console.log('inside loadComponent')
        console.log('before return loadComponet')
        return fetchAndParse(URL).then(registerComponent)
    }
    return loadComponent
}())


// fetch( './components/header.wc' ).then( ( response ) => {
//     return response.text();
//   } )