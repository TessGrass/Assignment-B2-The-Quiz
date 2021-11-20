const template = document.createElement('template')
template.innerHTML = `
<style>
  div {
    
  }
    img {
      max-width: 75%;
      max-height: 75%;
    }

</style>
<img />
`
customElements.define('custom-quiz-logo', class extends HTMLElement {
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
