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
   *
   */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
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
     *
     */
    connectedCallback () {
      this.timerFunction()
    }

    /**
     * Terminates the time.
     *
     */
    stopTimer () {
      clearInterval(this.timer) /*
      const currentScoreboard = JSON.parse(localStorage.getItem('highscore')) || []
      const userName = localStorage.getItem('username')
      // const currentScoreboard = localStorage.getItem('highscore') && JSON.parse(localStorage.getItem('highscore')) // Ta bort, enbart för test.
      console.log(currentScoreboard)

      if (currentScoreboard) {
        currentScoreboard.push({ name: userName, score: this.highScore })
        console.log(currentScoreboard)
      } else {
        currentScoreboard.push({ name: userName, score: this.highScore })
        console.log(currentScoreboard)
      }
      localStorage.setItem('highscore', JSON.stringify(currentScoreboard)) */
    }

    /**
     * Sets userscore to localStorage. Dispatch a custom event with the score.
     */
    updateScoreboard () {
      console.log('TIMER:update Scoreboard')
      const score = localStorage.setItem('userscore', this.highScore)
      this.dispatchEvent(new CustomEvent('userscore', {
        detail: { score: score },
        bubbles: true,
        composed: true
      }))

      /* const currentScoreboard = JSON.parse(localStorage.getItem('highscore')) || []
      const userName = localStorage.getItem('username')
      // const currentScoreboard = localStorage.getItem('highscore') && JSON.parse(localStorage.getItem('highscore'))
      console.log(currentScoreboard)
      if (currentScoreboard) { // Jämföra poängen, sortera.
        currentScoreboard.push({ name: userName, score: this.highScore })
      } else {
        currentScoreboard.push({ name: 'Hans', score: this.highScore })
      }
      localStorage.setItem('highscore', JSON.stringify(currentScoreboard))
      // const currentScoreboard = JSON.parse(localStorage?.getItem('Highscore'))
      // console.log(currentScoreboard) */
    }

    /**
     * Starts the timer. When the timer reaches zero, quiz-scoreboard attribute sets to this.highscore.
     */
    timerFunction () {
      console.log('TIMER:timerfunction')
      this.timer = setInterval(() => {
        this.timerText.textContent = this.count -= 1
        this.highScore++
        if (this.count === 0) {
          clearInterval(this.timer)
          document.querySelector('quiz-application').showScoreboard()
          document.querySelector('quiz-scoreboard').setAttribute('score', this.highScore)
          this.timesUp.textContent = 'Times Up!'
        }
      }, 1000)
    }
  })
