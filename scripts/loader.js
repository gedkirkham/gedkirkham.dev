console.log('loader.js')

window.loadComponent = (function() {
    console.log('loadComponent')
    // function loadComponent(URL) {
    //     console.log('inside loadComponent')
        // const parser = new DOMParser()
    //     let stringitem = `<div id="ribbon-wrapper">
    //     <div id="ribbon"></div>
    // </div>
    
    // <header id="grid-header">
    //     <h1><a href="/">Ged Kirkhamaaaaaaaaaaa</a></h1>
    // </header>
    
    // <style>
    
    // </style>
    
    // <script>
    
    // </script>`
        // return parser.parseFromString(URL, 'text/html')

        return fetch( URL ).then( ( response ) => {
            console.log(response.text())
            return response.text();
          } )
          .then( ( html ) => {
            const parser = new DOMParser(); // 1
          
            return parser.parseFromString( html, 'text/html' ); // 2
          } );
    // }
    // console.log('before return loadComponet')
    // return loadComponent
}())


// fetch( './components/header.wc' ).then( ( response ) => {
//     return response.text();
//   } )