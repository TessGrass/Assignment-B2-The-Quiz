/**
 * The main script file of the application.
 *
 * @Therese Grass <tg222kv@student.lnu.se>
 * @version 1.1.0
 */

// import './components/quiz-logo/index.js'
import './components/custom-submit-form/index.js'
import './components/quiz-scoreboard/index.js'
import './quiz-application.js'
import './components/countdown-timer/index.js'


const formWrapper = document.querySelector('.formWrapper')
const customSubmitForm = document.createElement('custom-submit-form')
const quizApplication = document.createElement('fetch-question')

formWrapper.append(customSubmitForm, quizApplication)

// quizApplication.style.display = 'none'



/* under formWrapper i html
<custom-submit-form />
      <fetch-question />*/