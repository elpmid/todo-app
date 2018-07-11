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
     
        .todo-header { @apply(--paper-font-headline); }
        .todo-light { color: var(--paper-grey-600); }
                
         .boxHoizonal {
            display: flex;
          }
      
          .boxVertical {
            display: flex;
            flex-direction: column;
          }
       
         .wrap div:last-child {
            margin-left: auto;
          }
        
      .colorbox {background: #ffcc00; }
        
        </style>

        <todo-create-view id="todoCreateView" todo-id="{{todoId}}" name="{{name}}" description="{{description}}" status="{{status}}" due="{{due}}" creating="UPDATE"></todo-create-view>  
      
        <div class="card">
            <div class="boxHoizonal wrap">
                <div class="todo-header">Name: {{name}}</div>
                <div class="todo-light">{{status}}</div>
             </div>
             
             
             <div class="boxVertical wrap">
                <div class="todo-light" style="margin-bottom:15px;">{{description}}</div>
           
                <div class="todo-light" style="" >
                   Date due: {{due}}
                </div>
              
                <div class="card-actions">
                    <paper-button class="paper-button-indigo" on-click="toggleDialog">Edit</paper-button>
                 </div>
             </div>
        </div>
    `;
    }

    toggleDialog() {
        this.$.todoCreateView.toggleDialog();

    }
}

window.customElements.define('todo-item', TodoItem);