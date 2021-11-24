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
      font-size: 20px;
  }

  table {
      width: 100%;
  }
   ol li {
       margin-left: 0;
       margin-bottom: 20px;
   }

</style>
<div id ="scoreboard">
    <h2>S C O R E B O A R D</h2>
<ol>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ol>
</div>

`

customElements.define('quiz-scoreboard', /**
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
      this.score = 0
      this.userName = ''
      this.name = 'scoreboard'
      this.scoreboard = this.shadowRoot.querySelector('#scoreboard')
    }

    /**
     *
     */
    static get observedAttributes () {
      return ['username', 'score', 'showscoreboard']
    }

    /**
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'username') {
        console.log('this is username ' + newValue)
        this.userName = newValue
      }
      if (name === 'score') {
        console.log('-------------------------------HEJ!!!!')
        this.score = newValue
        console.log(this.score + 'this is score')
      }
      if (name === 'showscoreboard') {
        this.scoreboard.style.display = 'block'
      }
    }
  })
