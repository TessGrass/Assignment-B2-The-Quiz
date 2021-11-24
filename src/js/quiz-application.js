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
  color: black;
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
    text-align: center;
    color: white;
}

p {
  text-align: center;
  font-family: verdana;
    color: white;
    font-size: 14px;
}
</style>
<div id="wrapper">
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
customElements.define('fetch-question',

  /**
   *
   */
  class extends HTMLElement {
    /**
     * The quiz application.
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.question = this.shadowRoot.querySelector('#question')
      this.submitBox = this.shadowRoot.querySelector('#submitbox')
      this.inputBox = this.shadowRoot.querySelector('#inputbox')
      this.radioButton = this.shadowRoot.querySelector('#radiobutton')
      this.wrapper = this.shadowRoot.querySelector('#wrapper')
      this.fetchQuestionUrl = 'https://courselab.lnu.se/quiz/question/1'
      this.getAnswerUrl = 'https://courselab.lnu.se/quiz/answer/1'
      this.wrapper.style.display = 'none'
      this.answerContainer = ''
      this.checkLimit = ''
      this.timerScore = ''

      this.addEventListener('timerScore', (event) => {
        console.log('Ho ho ho från rad 90')
        this.timerScore = event
      })
    }

    /**
     * Observing display attribute.
     *
     * @returns display.
     */
    static get observedAttributes () {
      return ['display']
    }

    /**
     * Fetching the question, post answer from user.
     *
     */
    connectedCallback () {
      this.fetchQuestion()
      this.submitBox.addEventListener('click', (event) => {
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
      console.log(this.fetchQuestionUrl + ' fetchQuestion')
      let fetchQuestion = await window.fetch(this.fetchQuestionUrl, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify()
      })
      fetchQuestion = await fetchQuestion.json()
      console.log(fetchQuestion)
      this.displayQuestionSetAnswer(fetchQuestion)
    }

    /**
     * Displays the question in the browser, checks wether to use input field or radio button.
     *
     * @param {object} data - the retrieved data from server.
     */
    displayQuestionSetAnswer (data) {
      this.question.textContent = data.question.toUpperCase() // Fråga visas i webbläsaren
      this.dispatchEvent(new CustomEvent('limit', {
        detail: { limit: data.limit },
        bubbles: true
      }))
      this.getAnswerUrl = data.nextURL
      console.log(this.getAnswerUrl)
      if (data.alternatives) {
        for (const [key, value] of Object.entries(data.alternatives)) {
          const inputRadioEl = document.createElement('input')
          const labelRadioEl = document.createElement('label')

          inputRadioEl.setAttribute('type', 'radio')
          inputRadioEl.setAttribute('name', 'answer')

          labelRadioEl.innerText = value
          inputRadioEl.id = key

          this.radioButton.append(inputRadioEl, labelRadioEl)
          this.inputBox.style.display = 'none'
          this.radioButton.style.display = 'flex'
        }
      } else {
        this.inputBox.style.display = 'block'
        this.radioButton.style.display = 'none'
      }
      if (data.limit) {
        console.log('limit: ' + data.limit)
      } else {
        console.log('no limit')
      }
    }

    /**
     * Post answer from user to the server.
     *
     */
    async postAnswerFromUser () {
      console.log('177')
      let receiveAnswer = await window.fetch(this.getAnswerUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ answer: this.answerContainer })
      })
      if (receiveAnswer.status === 400 || !receiveAnswer.nextURL) {
        console.log('400 bitches')
        this.showScoreboard()
      } else {
        receiveAnswer = await receiveAnswer.json()
        console.log('postAnswerFromUser: ' + receiveAnswer.nextURL)
        this.generateNextQuestionUrl(receiveAnswer)
      }
    }

    /**
     * Generates new question.
     *
     * @param {object} data from server.
     */
    generateNextQuestionUrl (data) {
      console.log(data)
      this.fetchQuestionUrl = data.nextURL
      this.shadowRoot.querySelector('form').reset()
      this.radioButton.innerHTML = ''
      this.fetchQuestion()
    }

    /**
     * Check if the answer has been entered in a field or radio button.
     *
     */
    checkTypeOfAnswer () {
      if (this.radioButton.children.length > 0) {
        this.answerContainer = this.shadowRoot.querySelector('input[name="answer"]:checked').id.toLowerCase()
      } else {
        this.answerContainer = this.inputBox.firstElementChild.value
      }
    }

    /**
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'display') {
        this.wrapper.style.display = 'block'
      }
    }

    showScoreboard () {
    this.scoreBoard = document.querySelector('quiz-scoreboard').setAttribute('showscoreboard', 0)
    this.wrapper.style.display = 'none'
    }
  })
