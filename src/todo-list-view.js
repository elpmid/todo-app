import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-button/paper-button.js';
import './todo-item.js';
import './todo-filter-refresh.js';
import './todo-create-view.js';
import './get-todo-service.js';

class TodoListView extends PolymerElement {
    static get properties() {
        return {
            todoList: {
                type: Array
            },
            loading: {
                type: Boolean,
                readOnly: true,
                notify: true,
                value: false
            }
        };
    }

    static get template() {
        return html`
      
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
                
      </style>
      
      <get-todo-service id="getTodoService" todo-list="{{todoList}}" loading="{{loading}}"></get-todo-service>
      <todo-create-view id="todoCreateView" selectedStatusIndex="-1" creating="CREATE"></todo-create-view>  

      <h1> Todo list: </h1>    
          
      <div class="card">
 
            <todo-filter-refresh todo-list="{{todoList}}"></todo-filter-refresh>

            <paper-button class="paper-button-indigo" on-click="toggleDialog">Create</paper-button>
            
            <template is="dom-repeat" items="{{todoList}}">
                <div>
                    <todo-item todo-id="{{item.id}}" due="{{item.dueDate}}" name="{{item.name}}" description="{{item.description}}" status="{{item.status}}"></todo-item>
                </div>
            </template>
   
      
            <template is="dom-if" if="{{!todoList}}">
                <p>No todos to do!</p>
            </template>
        </div>

          
    `;

    }

    ready() {
        super.ready();
        window.addEventListener('todo-saved', e => {
            this.$.getTodoService.refreshTodoList();
        });
        this.$.getTodoService.refreshTodoList();
    }

    toggleDialog() {
        this.$.todoCreateView.toggleDialog();

    }
}
window.customElements.define('todo-list-view', TodoListView);