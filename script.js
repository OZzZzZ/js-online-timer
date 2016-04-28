var timer;
var minutes, seconds;
var phase;
var timeConstants = [5, 2, 3]
var interval;
var display = document.querySelector('#time');

function startTimer() {
    interval = setInterval(displayTime, 1000);
}

function stopTimer() {
    if (interval != null) clearInterval(interval);
}

function resetTimer() {
    phase = 0;
}

function displayTime() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
        if (++phase < timeConstants.length) {
            console.log(phase);
            console.log(timeConstants.length);
            timer = timeConstants[phase];
        } else {
            stopTimer();
        }
    }
}


// function startTimer(duration, display) {
//     timer = duration;
//     state = start;
    
//     startTimer();

//     var minutes, seconds;
//     interval = setInterval(function () {
        
//     }, 1000);
// }

window.onload = function () {
    phase = 0;
    timer = timeConstants[phase];


    var fiveMinutes = 60 * 5;
        
    
}

function myFunction() {
    alert('Hello');
}