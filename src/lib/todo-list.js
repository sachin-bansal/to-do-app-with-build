import styles from '../css/list.scss'

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <ul>
    <slot>
      <p>You have nothing to do, yay!</p>
    </slot>
  </ul>
  <input id="new-item"/>
  <button>Add</button>
`;

class TodoList extends HTMLElement {
    constructor() {
        super();

        // Add a shadow DOM
        const shadowDOM = this.attachShadow({ mode: 'open' });

        // Render the template in the shadow dom
        shadowDOM.appendChild(template.content.cloneNode(true));

        // Method binding
        this.addItem = this.addItem.bind(this);
    }

    // Called when the element is added to the DOM
    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        button.onclick = this.addItem;
    }

    addItem() {
        // Get the input
        const input = this.shadowRoot.querySelector('#new-item');

        // Create a new list item
        const item = document.createElement('list-item');
        item.innerHTML = input.value;

        // Add it to the light DOM
        this.appendChild(item);
    }
}

export default TodoList;