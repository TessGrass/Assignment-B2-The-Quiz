const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
      box-sizing: border-box;
      background-color: black;
      width: 240px;
      height: 260px;
      border-radius: 30px;
      border: solid 2px #C11A72;
      color: white;
      font-size: 18px;
      font-family: helvetica;
      padding-left: 20px;
      padding-right: 20px;    
  }

  h2 {
      text-align: center;
      font-size: 20px;
  }
  p {
      margin: 3px;
  }

  table {
      width: 100%;
  }

</style>
<div id ="scoreboard">
    <h2>S C O R E B O A R D</h2>
    <table>
    <tr>
    <td>Emil</td><td>10</td>
</tr>
</table>
</div>

`

customElements.define('quiz-scoreboard', class extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
