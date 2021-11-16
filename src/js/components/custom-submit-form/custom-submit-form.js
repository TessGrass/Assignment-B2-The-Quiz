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

.inputbox {
    margin: 30px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #000000;    
}

.name {
    padding: 10px;
    color: white;    
}

.submit {
    width: 190px;
    height: 80px;
    box-shadow: inset 0 0 5px;
    color: black;    
}

</style>
<form>
 <div class="wrapper">
    <div class="inputbox">
        <input type="text" placeholder="YOUR AWESOME NAME!" class="name">
    </div>
    <div class="inputbox">
        <input type="Submit" value="START GAME" class="submit">
    </div>
 </div>
</form>
`

customElements.define('custom-submit-form', class extends HTMLElement {
   constructor() {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
  }
})
