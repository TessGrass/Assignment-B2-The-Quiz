/**
 * The main script file of the application.
 *
 * @Therese <tg222kv@student.lnu.se>
 * @version 1.1.0
 */

import './components/custom-submit-form/'
import './components/quiz-scoreboard/'
import './quiz-application.js'
import './components/countdown-timer/'

const formWrapper = document.querySelector('.formWrapper')
// const timerWrapper = document.querySelector('.timerWrapper')
const customSubmitForm = document.createElement('custom-submit-form')
// const quizApplication = document.createElement('fetch-question')
// const countdownTimer = document.createElement('countdown-timer')
const scoreboard = document.createElement('quiz-scoreboard')

// formWrapper.append(customSubmitForm, quizApplication, scoreboard)
formWrapper.append(customSubmitForm, scoreboard)
// formWrapper.appendChild(customSubmitForm)
