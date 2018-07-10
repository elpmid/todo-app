import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

class GetTodoService extends PolymerElement {
    static get properties() {
        return {
            todoList: {
                type: Array, value: [], notify: true
            },
            filterByStatus: {type: String, value: "ALL"}
        };
    }

    static get template() {
        return html`
      
     <iron-ajax
        id="getTodosAjax"
        method="get"
        url = "http://localhost:8080/api/todo/"
        content-type="application/json"
        handle-as="json"
        last-response="{{todoList}}"
     </iron-ajax>
     
    `;

    }

    refreshTodoList(page) {
        this.$.getTodosAjax.set('params', {"status": this.filterByStatus});
        this.$.getTodosAjax.generateRequest();
    }

}
window.customElements.define('get-todo-service', GetTodoService);