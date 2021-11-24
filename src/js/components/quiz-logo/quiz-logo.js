const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
    
  }
    img {
      max-width: 25%;
      max-height: 25%;
    }

</style>
<img />
`

customElements.define('custom-quiz-logo', /**
cccccccccccccccccccccccccccccccccccccccccc *
cccccccccccccccccccccccccccccccccccccccccc */
  class extends HTMLElement {
  /**
   *
   */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.shadowRoot.querySelector('img').src = this.getAttribute('imagepath')
    }
  })
