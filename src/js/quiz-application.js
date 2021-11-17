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

p {
    color: red;
}
</style>
<p id="idquestion"></p>
 <p id="question"></p>
 <form>
    <div id="inputbox">
        <input type="text" placeholder="YOUR ANSWER" class="name">
    </div>
    <div id="submitbox">
        <input type="Submit" value="NEXT QUESTION" class="submit">
    </div>
</form>`

customElements.define('fetch-question', class extends HTMLElement {
  /**
   *
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.question = this.shadowRoot.querySelector('#question')
    this.submitBox = this.shadowRoot.querySelector('#submitbox')
    this.inputBox = this.shadowRoot.querySelector('#inputbox')

    // this.nextUrl = 'https://courselab.lnu.se/quiz/answer/'
}

  /**
  *
  */
  connectedCallback () {
    this.fetchQuestion()
    this.submitBox.addEventListener('click', (event) => {
      const inputValue = this.inputBox.firstElementChild.value
      this.postQuestion(inputValue)
      console.log(inputValue)
      event.preventDefault()
    })
  }

  /**
  *
  */
  async fetchQuestion () {
    let resultGetQuestion = await window.fetch('https://courselab.lnu.se/quiz/question/1', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify()
    })
    resultGetQuestion = await resultGetQuestion.json()
    console.log(resultGetQuestion)
    this.generateQuestion(resultGetQuestion)
  }

    /**
     * @param data
     */
  generateQuestion (data) {
    this.question.textContent = data.question
  }

    /**
     *
     */
  async postQuestion () {
    const answerQuestion = await window.fetch('https://courselab.lnu.se/quiz/answer/1', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        answer: 2
      })
    })
    const resultAnswerQuestion = await answerQuestion.json()
    console.log(resultAnswerQuestion)
  }
})

// {id: 1, question: 'What is 1+1?', limit: '5', nextURL: 'https://courselab.lnu.se/quiz/answer/1', message: 'You got your   question! Now send me the answer via HTTP POST to the nextURL in JSON-format'}
