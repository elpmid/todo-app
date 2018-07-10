import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-button/paper-button.js';

class TodoItem extends PolymerElement {

    static get properties() {
        return {
            todoId: String,
            name: String,
            description: String,
            due: String,
            status: String
        };
    }

    static get template() {
        return html`
      
        <style include="shared-styles">
         :host {
          display: block;
          padding: 10px;
        }
        .align-right {
            text-align: right;
        }
        .todo-header { @apply(--paper-font-headline); }
        .todo-light { color: var(--paper-grey-600); }
        </style>

        <todo-create-view id="todoCreateView" todo-id="{{todoId}}" name="{{name}}" description="{{description}}" status="{{status}}" due="{{due}}" creating="UPDATE"></todo-create-view>  
      
        <div class="card">
            <div class="todo-header"">Name: {{name}}</div>
            <p class="todo-light">{{todoId}}</p>
            <p class="todo-light">{{description}}</p>
            <p class="todo-light">{{status}}</p>
            <p class="todo-light">{{due}}</p>
            <div class="card-actions">
                <paper-button class="paper-button-indigo" on-click="toggleDialog">Edit</paper-button>
             </div>
        </div>
    `;
    }

    toggleDialog() {
        this.$.todoCreateView.toggleDialog();

    }
}

window.customElements.define('todo-item', TodoItem);