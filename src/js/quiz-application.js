const template = document.createElement('template')
template.innerHTML = `
<style>

div {
  
}
form input {
    word-break: break-all;
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
  word-break: break-all;
    width: 190px;
    height: 80px;
    box-shadow: inset 0 0 5px;
    color: black;    
}

#radiobutton {
  word-break: break-all;
    display: none;
    text-align: center;
    color: white;
}

p {
  word-break: break-all;
  text-align: center;
  font-family: verdana;
    color: white;
    font-size: 14px;
}

h1 {
  color: white;
  text-align: center;
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
<countdown-timer />
</div>
</form>
`
customElements.define('quiz-application',

  /**
   * Represents the quiz-application.
   */
  class extends HTMLElement {
    /**
     * Creates a instance of the current type.
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
      this.countdownTimer = this.shadowRoot.querySelector('countdown-timer')
      this.fetchQuestionUrl = 'https://courselab.lnu.se/quiz/question/1'
      this.getAnswerUrl = 'https://courselab.lnu.se/quiz/answer/1'
      this.answerContainer = ''
      // this.checkLimit = ''
      // this.timerScore = ''

      this.submitBox.addEventListener('click', (event) => {
        event.preventDefault()
        this.checkTypeOfAnswer()
        this.postAnswerFromUser(this.answerContainer)
      })

      addEventListener('hidequizapp', (event) => { // From a customEvent in timer
        this.wrapper.style.display = 'none'
      })
    }

    /**
     * Observing the attribute display.
     *
     * @returns {string} display.
     */
    static get observedAttributes () {
      return ['display']
    }

    /**
     * Fetching the question, post answer from user.
     */
    connectedCallback () {
      this.fetchQuestion()
    }

    /**
     * Fetching question from server.
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
      this.displayQuestionInBrowser(fetchQuestion)
    }

    /**
     * Displays the question in the browser, checks wether to use input field or radio button.
     *
     * @param {object} data - the retrieved data from server.
     */
    displayQuestionInBrowser (data) {
      this.question.textContent = data.question.toUpperCase() // Frågan visas i webbläsaren
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
    }

    /**
     * Post answer from user to the server.
     *
     */
    async postAnswerFromUser () {
      const receiveAnswer = await window.fetch(this.getAnswerUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ answer: this.answerContainer })
      })
      const answer = await receiveAnswer.json()
      console.log(receiveAnswer.status)
      if (receiveAnswer.status === 400) {
        this.countdownTimer.style.display = 'none'
        this.wrapper.style.display = 'none'
        this.countdownTimer.stopTimer()
        this.dispatchEvent(new CustomEvent('displayscoreboard', {
          bubbles: true,
          composed: true
        }))
      } else if (receiveAnswer.status === 200 && !answer.nextURL) {
        this.countdownTimer.style.display = 'none'
        this.wrapper.style.display = 'none'
        this.countdownTimer.stopTimer()
        this.countdownTimer.updateScoreboard()
        this.dispatchEvent(new CustomEvent('displayscoreboard', {
          bubbles: true,
          composed: true
        }))
      } else {
        this.generateNextQuestionUrl(answer)
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
     * Displays the scoreboard when the player chose the wrong answer.
     *
     */
    /*showScoreboard () {
      this.scoreBoard = document.querySelector('quiz-scoreboard').setAttribute('showscoreboard', 0) // KODA OM?!
      this.wrapper.style.display = 'none'
    }*/

    /**
     * Switch wrapper to style display block when the attribute name === 'display'.
     *
     * @param {string} name - attribute.
     * @param {string} oldValue - oldValue.
     * @param {string} newValue - newValue.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'display') {
        this.wrapper.style.display = 'block'
      }
    }
  })
