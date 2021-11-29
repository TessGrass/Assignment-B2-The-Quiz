const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
      display: none;
      box-sizing: border-box;
      background-color: black;
      width: 240px;
      height: 260px;
      border-radius: 30px;
      border: solid 2px #f61e61;
      color: white;
      font-size: 16px;
      font-family: helvetica;
      padding-left: 5px;
      padding-right: 5px;
  }

  h2 {
      text-align: center;
      font-size: 16px;
  }

  table {
      width: 100%;
  }
   ol li {
       margin-left: 0;
       margin-bottom: 20px;
   }
   h1 {
       color: white;
       text-align: center;
       font-size: 36px;
   }

</style>
<h1></h1>
<div id ="scoreboard">
    <h2>S C O R E B O A R D</h2>
<ol>
</ol>
</div>
`
customElements.define('quiz-scoreboard',

  /**
   *
   */
  class extends HTMLElement {
    /**
     * Creates a instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.scoreboard = this.shadowRoot.querySelector('#scoreboard')
      this.h1Tag = this.shadowRoot.querySelector('h1')
      this.sortedList = this.shadowRoot.querySelector('ol')
      this.name = 'scoreboard'
      this.score = 0
      this.userName = ''

      addEventListener('userscore', (event) => {
        console.log('eventlyssnaren i scoreboard')
        const currentScoreboard = JSON.parse(localStorage.getItem('highscore')) || []
        const userName = localStorage.getItem('username')
        const userScore = localStorage.getItem('userscore')
        currentScoreboard.push({ name: userName, score: userScore })
        localStorage.setItem('highscore', JSON.stringify(currentScoreboard))
        currentScoreboard.sort((a, b) => a.score - b.score)
        currentScoreboard.splice(5)
        console.log(currentScoreboard)
        for (const key of Object.values(currentScoreboard)) {
          const listEl = document.createElement('li')
          listEl.innerText = `${key.name} : ${key.score}`
          this.sortedList.appendChild(listEl)
        }
      })
    }

    /**
     * The observed attributes.
     *
     * @returns {string} - the observed attributes.
     */
    static get observedAttributes () {
      return ['username', 'score', 'showscoreboard']
    }

    /**
     * Executes code depended of which name equals attribute.
     *
     * @param {string} name - attribute.
     * @param {string} oldValue - oldValue.
     * @param {string} newValue - newValue.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'username') {
        console.log('this is username ' + newValue)
        this.userName = newValue
      }
      if (name === 'score') {
        this.score = newValue
        console.log(this.score + 'this is score')
      }
      if (name === 'showscoreboard') {
        this.scoreboard.style.display = 'block'
        this.h1Tag.textContent = 'GAME OVER'
      }
    }
  })
