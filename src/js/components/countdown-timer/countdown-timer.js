const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
    font-family: helvetica;
    background-color: black;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: solid 2px #f61e61;
    color: white;
  }

  h2 {
    padding-top: 15px;
    text-align: center;
    font-size: 35px;
    margin: 0;
  }

  h3 {
    margin: 0;
    text-align: center;
    font-size: 16px;
  }
</style>
<div id="timer">
  <h2 id="timertext"></h2>
  <h3 id="timesup"></h3>
</div>
`
customElements.define('countdown-timer', /**
ccccccccccccccccccccccccccccccccccccccccc *
ccccccccccccccccccccccccccccccccccccccccc */
  class extends HTMLElement {
  /**
   *
   */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.timerText = this.shadowRoot.querySelector('#timertext')
      this.timesUp = this.shadowRoot.querySelector('#timesup')
      this.highScore = ''
      this.count = ''
      this.timer = ''
      this.timerFunction = this.timerFunction.bind(this)
    }

    /**
     *
     *
     */
    connectedCallback () {
      addEventListener('limit', (event) => {
        this.count = event.detail.limit
        if (!this.count) {
          this.count = 20
        }
      })
      this.timerFunction()
      // document.querySelector('quiz-scoreboard').setAttribute('score', this.highScore)

    /* this.dispatchEvent(new CustomEvent('timerScore', {
      detail: { detail: this.highScore },
      bubbles: true,
      composed: true
    })) */
    }

    /**
     *
     */
    timerFunction () {
      this.timer = setInterval(() => {
        this.timerText.textContent = this.count -= 1
        this.highScore++
        if (this.count === 0) {
          clearInterval(this.timer)
          document.querySelector('quiz-scoreboard').setAttribute('score', this.highScore)
          this.timesUp.textContent = 'Times Up!'
        }
      }, 1000)
    }
  })

/*
*/
