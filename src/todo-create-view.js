import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/paper-styles.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';


export class TodoCreateView extends PolymerElement {

    static get properties() {
        return {
            todoId: String,
            name: String,
            description: String,
            due: String,
            status: String,
            creating: { type: String, value: "CREATE"}
        };
    }

    static get template() {
        return html`
    
        <style include="shared-styles">
         :host {
           display: block;
           padding: 10px;
         }
         .paper-toast {
           z-index: 9999;
           width: 100%;
           text-align: center;
        }
        </style>

        <paper-dialog id="todoCreateUpdateModal" modal on-iron-overlay-opened="patchOverlay">
            <div>
                <iron-form id="formSave">
                <form>
                <paper-input floatingLabel autofocus label="Name" id="name" value="{{name}}" maxlength="20" required error-message="Name must be entered."></paper-input>
                <br>
                <paper-textarea floatingLabel label="Description" id="description" value="{{description}}" maxlength="1000" required error-message="Description must be entered."></paper-textarea>
                <br>
                <paper-dropdown-menu label="Status" vertical-align="top" horizontal-align="left" required error-message="Status must be entered.">
                    <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="name" selected="{{status}}">
                        <paper-item name="PENDING">Pending</paper-item>
                        <paper-item name="DONE">Done</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br>
                <vaadin-date-picker label="Date Due" placeholder="Pick a date" value="{{due}}" required auto-validate error-message="Date Due must be entered."</vaadin-date-picker>
                <br>
            </div>
            </form>
            </iron-form>
            <paper-button id="btnSave" affirmative on-click="clickSave">Save</paper-button>
            <paper-button id="btnCancel" affirmative  dialog-confirm autofocus>Cancel</paper-button>
        </paper-dialog>
        
        <paper-toast id = "toast" class = "paper-toast fit-bottom" text = "Todo has been saved!">
 
         <iron-ajax
            id="createTodosAjax"
            method="POST"
            url = "http://localhost:8080/api/todo/"
            content-type="application/json"
            handle-as="json"
         </iron-ajax>
        
         <iron-ajax
            id="updateTodosAjax"
            method="PUT"
            url = "http://localhost:8080/api/todo/"
            content-type="application/json"
            handle-as="json"
         </iron-ajax>
 
        `;
    }

    patchOverlay(e) {
        if (e.target.withBackdrop) {
            e.target.parentNode.insertBefore(e.target.backdropElement, e.target);
        }
    }

    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    toggleDialog() {
        this.$.todoCreateUpdateModal.toggle()
    }

    clickSave(event) {
        let self = this;
        let validated = self.$.formSave.validate();
        if (!validated) {
            return;
        }
        let todoRequest = {
            "name": self.name,
            "description": self.description,
            "dueDate": self.due,
            "status": self.status
        };

        let request;
        if (self.creating === "CREATE") {
            todoRequest.id = self.uuidv4();
            self.$.createTodosAjax.url = "http://localhost:8080/api/todo/";
            self.$.createTodosAjax.body = todoRequest;
            request = self.$.createTodosAjax.generateRequest();

        } else {
            self.$.updateTodosAjax.url = "http://localhost:8080/api/todo/" + self.todoId;
            self.$.updateTodosAjax.body = todoRequest;
            request = self.$.updateTodosAjax.generateRequest();
        }

        request.completes.then( function (req) {
            if (self.creating === "CREATE") {
                self.name = undefined;
                self.description = undefined;
                self.due = undefined;
                self.description = undefined;
                self.status = undefined;
            }
            self.$.toast.duration = 3000;
            self.$.toast.open();
            self.$.todoCreateUpdateModal.toggle();
            window.dispatchEvent(new CustomEvent('todo-saved', {
                detail: 'todo-saved'
            }))
        })

    }
}

window.customElements.define('todo-create-view', TodoCreateView);