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
      border: solid 2px white;
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

   .submit {
       margin-left: 65px;
       border-radius: 13px;
       margin-top: 10px;
       display: flex;
       display: none;
       color: black;
       width: 100px;
       height: 50px;
       color: #f61e61;
       background: black;
   }

   .submit:hover {
    color: black;
       background: #f61e61;

   }

</style>
<h1></h1>
<div id ="scoreboard">
    <h2>S C O R E B O A R D</h2>
<ol></ol>
</div>
<form>
     <input type="submit" value="PLAY AGAIN!" class="submit">
</form>
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
      this.olEl = this.shadowRoot.querySelector('ol')
      this.restartGame = this.shadowRoot.querySelector('.submit')

      addEventListener('quiz_userscore', (event) => { // CustomEvent found in countdown-timer.
        this.olEl.textContent = ''
        const currentScoreboard = JSON.parse(localStorage.getItem('quiz_highscore')) || []
        const userName = localStorage.getItem('quiz_username')
        const userScore = localStorage.getItem('quiz_userscore')
        currentScoreboard.push({ name: userName, score: userScore })
        localStorage.setItem('quiz_highscore', JSON.stringify(currentScoreboard))
        this.displayScoreboard()
      })

      addEventListener('displayscoreboard', (event) => { // CustomEvent found in quiz-application.
        this.scoreboard.style.display = 'block'
        this.restartGame.style.display = 'block'
        this.h1Tag.textContent = 'GAME OVER!'
        this.displayScoreboard()
      })

      this.restartGame.addEventListener('click', (event) => {
      })
    }

    /**
     * Displays the scoreboard for the player.
     *
     */
    displayScoreboard () {
      this.olEl.textContent = ''
      const displayHighscore = JSON.parse(localStorage.getItem('quiz_highscore'))
      displayHighscore.sort((a, b) => a.score - b.score)
      displayHighscore.splice(5)

      for (const key of Object.values(displayHighscore)) {
        const listEl = document.createElement('li')
        listEl.innerText = `${key.name} : ${key.score}`
        this.olEl.appendChild(listEl)
      }
    }
  })
