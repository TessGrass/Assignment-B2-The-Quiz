import '../quiz-application/quiz-application.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
form input {
    display: block;
    height: 80px:
    border: 0;
    border-radius: 13px;
    font-family: tahoma;
    text-align: center;
    background-color: white;
    color: black;
}

#inputbox {
    margin: 30px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;    
}
#submitbox {
    margin: 30px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;    
}

.name {
    padding: 10px;
    color: black;   
}

.submit {
    width: 190px;
    height: 80px;
    box-shadow: inset 0 0 5px;
    color: black;    
}
</style>
<form>
    <div id="inputbox">
        <input type="text" placeholder="YOUR AWESOME NAME!" class="name">
    </div>
    <div id="submitbox">
        <input type="submit" value="START GAME" class="submit">
    </div>
</form>
`

customElements.define('custom-submit-form',
  /**
   * Creates a instance of the current type.
   */
  class extends HTMLElement {
    /**
     * Creates a instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.submitBox = this.shadowRoot.querySelector('#submitbox')
      this.inputBox = this.shadowRoot.querySelector('#inputbox')
      this.form = this.shadowRoot.querySelector('form')
      this.form.style.display = 'block'
      this.userName = ''

      this.submitBox.addEventListener('click', (event) => {
        event.preventDefault()
        this.userName = this.inputBox.firstElementChild.value
        localStorage.setItem('quiz_username', this.userName)
        document.querySelector('.formWrapper').appendChild(document.createElement('quiz-application'))
        this.form.style.display = 'none'
      })
    }

    /**
     * Assigning the input value to variable.
     */
    connectedCallback () {
      this.inputBox.firstElementChild.value = localStorage.getItem('quiz_username') // The last used nickname starts as a default name.
    }
  })
