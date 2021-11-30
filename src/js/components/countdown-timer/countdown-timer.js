const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
    margin-bottom: 0px;
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

  #scoreboard {
    display: none;
  }

</style>
<div id="timerwrapper">
  <h2 id="timertext"></h2>
  <h3 id="timesup"></h3>
</div>
`
customElements.define('countdown-timer',
  /**
   * Terminates the time.
   */
  class extends HTMLElement {
  /**
   * Creates a instance of the current type.
   */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.timerWrapper = this.shadowRoot.querySelector('#timerwrapper')
      this.timerText = this.shadowRoot.querySelector('#timertext')
      this.timesUp = this.shadowRoot.querySelector('#timesup')
      this.timerFunction = this.timerFunction.bind(this)
      this.highScore = 0
      this.count = ''
      this.timer = ''

      addEventListener('limit', (event) => {
        this.count = event.detail.limit
        if (!this.count) {
          this.count = 20
        }
      })
    }

    /**
     * Calling this.timerFunction.
     */
    connectedCallback () {
      this.timerFunction()
    }

    /**
     * Terminates the time.
     */
    stopTimer () {
      clearInterval(this.timer)
    }

    /**
     * Sets userscore to localStorage. Dispatch a custom event with the score.
     */
    updateScoreboard () {
      const score = localStorage.setItem('userscore', this.highScore)
      this.dispatchEvent(new CustomEvent('userscore', {
        detail: { score: score },
        bubbles: true,
        composed: true
      }))
    }

    /**
     * Starts the timer. When the timer reaches zero, quiz-scoreboard attribute sets to this.highscore.
     */
    timerFunction () {
      this.timer = setTimeout(() => {
        if (this.count === 0) {
          clearTimeout(this.timer)
          this.timerWrapper.style.display = 'none'
          document.querySelector('quiz-application').showScoreboard() // KODA OM?! Custom Event?
          // document.querySelector('quiz-scoreboard').setAttribute('score', this.highScore) // Ta bort??
          this.timesUp.textContent = 'Times Up!'
          return
        }
        console.log(this.count)
        this.timerText.textContent = this.count--
        this.highScore++
        this.timerFunction()
      }, 1000)
    }
  })
