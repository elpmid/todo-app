import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

export class TodoFilterRefresh extends PolymerElement {

    static get properties() {
        return {
            todoList: {
                type: Array, notify: true, value: []
            },
            selectedFilterStatus: {type: String, value: 'ALL'}
        };
    }

    static get template() {
        return html`
      
      <style include="shared-styles">
      </style>

        <get-todo-service id="getTodoService" todo-list="{{todoList}}" filter-by-status="{{selectedFilterStatus}}"></get-todo-service>

       <div>
             <paper-dropdown-menu label="Status" vertical-align="bottom" horizontal-align="left">
              <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="name" selected="{{selectedFilterStatus}}">
                <paper-item name="ALL">All</paper-item>
                <paper-item name="PENDING">Pending</paper-item>
                <paper-item name="DONE">Done</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
 
          <paper-button class="paper-button-indigo" on-click="refreshTodoList">Refresh</paper-button>
        </div>
        </div>

    `;
    }

    refreshTodoList() {
        console.log("refreshing list by refresh button. Status is: " + this.selectedFilterStatus);
        this.$.getTodoService.refreshTodoList();
    }

}

window.customElements.define('todo-filter-refresh', TodoFilterRefresh);