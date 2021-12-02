# &lt;countdown-timer&gt;

A web component that represents a countdown timer.

## Methods

### stopTimer ()

Stops the timer.

###  updateScoreboard ()

Fetching the users score and store it in the localStorage.

###  timerFunction ()

Starts the countdown timer and when it reaches zero the timer stops.


## Events

| Event Name | Fired When |
|------------|------------|
| `limit`| timer starts and sets a limit.

| Event Name | Fired When |
|------------|------------|
| `userscore`| when the user completes the quiz and gets a score.


| Event Name | Fired When |
|------------|------------|
| `displayscoreboard`| when the timer reaches zero.

| Event Name | Fired When |
|------------|------------|
| `hidequizapp`| when the timer reaches zero.


## Example

```html
<countdown-timer><countdown-timer></>
```

