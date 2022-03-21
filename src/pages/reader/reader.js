import { LitElement, css, html } from "lit";

class Reader extends LitElement {
  //registering styles
  static get styles() {
     return [css`
     /* Side Navigation Menu V2, RWD
         ===================
          Author: https://github.com/pablorgarcia
    */
   @charset "UTF-8";
   @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
   body {
     font-family: 'Open Sans', sans-serif;
     font-weight: 300;
     line-height: 1.42em;
     color:#A7A1AE;
     background-color:#1F2739;
   }
 h1 {
  font-size:3em; 
  font-weight: 300;
  line-height:1em;
  text-align: center;
  color: #4DC3FA;
 }
 h2 {
  font-size:1em; 
  font-weight: 300;
  text-align: center;
  display: block;
  line-height:1em;
  padding-bottom: 2em;
  color: #FB667A;
 }
 h2 a {
  font-weight: 700;
  text-transform: uppercase;
  color: #FB667A;
  text-decoration: none;
 }
 .blue { color: #185875; }
 .yellow { color: #FFF842; }
 .container th h1 {
    font-weight: bold;
    font-size: 1em;
    text-align: left;
    color: #185875;
  }
.container td {
    font-weight: normal;
    font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0E1119;
     -moz-box-shadow: 0 2px 2px -2px #0E1119;
          box-shadow: 0 2px 2px -2px #0E1119;
}
.container {
    text-align: left;
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
}
.container td, .container th {
    padding-bottom: 2%;
    padding-top: 2%;
  padding-left:2%;  
}
/* Background-color of the odd rows */
.container tr:nth-child(odd) {
    background-color: #323C50;
}
/* Background-color of the even rows */
.container tr:nth-child(even) {
    background-color: #2C3446;
}

.container th {
    background-color: #1F2739;
}
.container td:first-child { color: #FB667A; }
.container tr:hover {
   background-color: #464A52;
-webkit-box-shadow: 0 6px 6px -6px #0E1119;
     -moz-box-shadow: 0 6px 6px -6px #0E1119;
          box-shadow: 0 6px 6px -6px #0E1119;
}
.container td:hover {
  background-color: #FFF842;
  color: #403E10;
  font-weight: bold;
  
  box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
  transform: translate3d(6px, -6px, 0);
  
  transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
.container td:nth-child(4),
.container th:nth-child(4) { display: none; }
}
     `];
  }
  //registering data
  static get properties() {
    return {
      data: Object
    }
 }

 constructor() {
  super();
}

connectedCallback() {
  super.connectedCallback();
  this.fetchData();

}
   
fetchData() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 0a85f0126790d4f1f65a226bce0141381878ad14f9e14df033ba84b61fadc575");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://gorest.co.in/public/v2/users", requestOptions)
    .then(response => response.json())
    .then(data =>{
          this.data = data
        })
    .catch(error => console.log('error', error));
}

render() {
    if (!this.data) {
        return html` 
            <h4>Loading...</h4>
        `;
    }
    return html`
        <link rel="stylesheet" href="/node_modules/@material/data-table/data-table/">
           <div>
            <h1>Esta es la lista de todos los usuarios</h1>
            <table class="container">
                <thead>
                  <tr>
                    <th><h1>User</h1></th>
                    <th><h1>Email</h1></th>
                    <th><h1>Gender</h1></th>
                    <th><h1>Estatus</h1></th>
                    </tr>
                </thead>
            <tbody>
                ${this.data.map((user) => (html`  
                                                 <tr>
                                                   <td>${user.name}</td>
                                                   <td>${user.email}</td>
                                                   <td>${user.gender}</td>
                                                   <td>${user.status}</td>
                                                 </tr>     
                                            `)
                 )}
            </tbody>
          </table>        
        </div>
        
    `;
}

}
customElements.define("reader-page", Reader);