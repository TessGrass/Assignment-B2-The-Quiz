const template = document.createElement('template')
template.innerHTML = `
<style>

  #game {
    text-align: center;
    align-content: center;
  }

 
form {
        color: red;
    }
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

#radiobutton {
    display: none;    
}

p {
  font-family: verdana;
    color: white;
    font-size: 18px;
}
</style>
<div id="game">
<p id="idquestion"></p>
 <p id="question"></p>
 <form>
    <div id="inputbox">
        <input type="text" placeholder="YOUR ANSWER" class="name">
    </div>
    <div id="radiobutton">
    </div>
    <div id="submitbox">
        <input type="Submit" value="NEXT QUESTION" class="submit">
    </div>
</div>
</form>
`
customElements.define('fetch-question', class extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.question = this.shadowRoot.querySelector('#question')
    this.submitBox = this.shadowRoot.querySelector('#submitbox')
    this.inputBox = this.shadowRoot.querySelector('#inputbox')
    this.radioButton = this.shadowRoot.querySelector('#radiobutton')
    this.answerContainer = ''
    this.getQuestionUrl = 'https://courselab.lnu.se/quiz/question/1'
    this.getAnswerUrl = 'https://courselab.lnu.se/quiz/answer/1'
  }

  /**
   *
   *
   */
  connectedCallback () {
    this.fetchQuestion()
    this.submitBox.addEventListener('click', (event) => {
      // this.answerContainer = this.inputBox.firstElementChild.value 
      //this.checkValueOfRadioButton()
      this.checkTypeOfAnswer()
      this.postAnswerFromUser(this.answerContainer)
      event.preventDefault()
    })
  }

  /**
   * Fetching question from server.
   *
   */
  async fetchQuestion () {
    console.log(this.getQuestionUrl + ' fetchQuestion')
    let getQuestion = await window.fetch(this.getQuestionUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify()
    })
    getQuestion = await getQuestion.json()
    console.log(getQuestion)
    this.displayQuestionSetAnswer(getQuestion)
  }

  /**
   *
   * @param {*} data
   */
  displayQuestionSetAnswer (data) {
    this.question.textContent = data.question.toUpperCase() // Fråga visas i webbläsaren
    this.getAnswerUrl = data.nextURL

    console.log('getAnswerUrl: ' + this.getAnswerUrl)

    if (data.alternatives) {
      for (const [key, value] of Object.entries(data.alternatives)) {
        const inputRadioEl = document.createElement('input')
        const labelRadioEl = document.createElement('label')

        inputRadioEl.setAttribute('type', 'radio')
        inputRadioEl.setAttribute('name', 'answer')

        labelRadioEl.innerText = value
        inputRadioEl.id = key

        this.radioButton.append(inputRadioEl, labelRadioEl)
        console.log(this.radioButton + 'hej jag är en radioknapp')
        this.inputBox.style.display = 'none'
        this.radioButton.style.display = 'flex'
      }
    } else {
      this.inputBox.style.display = 'block'
      this.radioButton.style.display = 'none'
    }
  }

  /**
  * 
  * 
  */
  async postAnswerFromUser () {
    let receiveAnswerOfQuestion = await window.fetch(this.getAnswerUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ answer: this.answerContainer })
    })
    receiveAnswerOfQuestion = await receiveAnswerOfQuestion.json()
    console.log('postAnswerFromUser: ' + receiveAnswerOfQuestion.nextURL)
    this.generateNextQuestionUrl(receiveAnswerOfQuestion)
  }

  generateNextQuestionUrl (data) {
    this.getQuestionUrl = data.nextURL
    this.shadowRoot.querySelector('form').reset()
    this.radioButton.innerHTML = ''
    this.fetchQuestion()
   //this.connectedCallback()
  }

  checkTypeOfAnswer () {
    if (this.radioButton.children.length > 0) {
      this.answerContainer = this.shadowRoot.querySelector('input[name="answer"]:checked').id.toLowerCase()
    } else {
      this.answerContainer = this.inputBox.firstElementChild.value
    }
  }
  
  // en funktion som kollar om det är radio eller inputvärde som ska hämtas, den kallar då´´på antingen checkValeOfRadiobutton eller checkValueOfInputField

 /*   this.radioButton = this.shadowRoot.querySelectorAll('#inputbox')
    if (this.checkForChecked.children.length > 0) {
      const buttons = this.checkForChecked.querySelectorAll('input')
      for (const button of buttons) {
        if (button.checked) {
          this.answerContainer = button.id.toLowerCase()
        }
      }
    }
}

  /*checkTypeOfQuestion () {
    console.log('hej')
    this.radioButton.forEach((word) => {
      console.log(word)
    })
  }

  /**
   *
   *
   */
   /*testForButton () {
    this.radioButton.style.display = 'flex'
    for (const [key, value] of Object.entries(this.dataAlternatives)) {
      console.log(key, value + 'key valuesss') // Skriv ut alternativen som ska länkas till radioknapparna
      const inputRadioEl = document.createElement('input')
      inputRadioEl.setAttribute('type', 'radio')
      inputRadioEl.textContent = value
      const labelRadioEl = document.CreateElement('label')
      labelRadioEl.setAttribute('for', 'radio')
      labelRadioEl.id = key

      this.radioButton.append(inputRadioEl, labelRadioEl)
    }
    return this.radioButton
  }

  checkTypeOfQuestion () {
    this.inputBox.style.display = 'none'
    this.radioButton.style.display = 'flex'
  }

  // <input type="radio" id="radio"><label for="radio">ALT 1</label>
  /*testForButton () {
    console.log('testforbutton')
    if (this.radioButton.style.display === 'none') {
      this.radioButton.style.display = 'flex'
      console.log('etta')
    } else {
      this.radioButton.style.display = 'none'
      console.log('tvåa')
    }
  }*/
})
