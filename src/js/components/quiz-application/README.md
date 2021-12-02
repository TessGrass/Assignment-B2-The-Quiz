# &lt;quiz-application&gt;

A web component that represents a quiz application.

## Methods

### fetchQuestion ()

Fetching the question from server.

###  displayQuestionInBrowser ()

Parameter - data from server.
Displays the question in the browser. 
Fires an customEvent with the question limit.

###  postAnswerFromUser ()

Post the answer from the user to the server.
Fires an customEvent.

###  generateNextQuestionUrl ()

 Parameter - data from the server.
 Fetching the next url from the server.
 Empties the radio button.

 ###  checkTypeOfAnswer ()
    
Checks if the question should display input field or radio buttons.


## Attributes

 When a radiobutton is created it sets an attribute to the radio button.


## Events

| Event Name | Fired When |
|------------|------------|
| `click`| The answer when the button is clicked.

| Event Name | Fired When |
|------------|------------|
| `hidequizapp`| when the the timer components fires a customEvent.


| Event Name | Fired When |
|------------|------------|
| `displayscoreboard`| when the user choses the wrong answer or when the user beats the quiz.



## Example

```html
<quiz-application><quiz-application></>
```
