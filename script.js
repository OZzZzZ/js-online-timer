var timer, minutes, seconds;
var exercise;
var cycle;
var cycleCount;
var pauseTime;
var timeConstants;
var interval;
var display = document.querySelector('#time');


function startTimer() {
    interval = setInterval(displayTime, 1000);
}

function stopTimer() {
    if (interval != null) clearInterval(interval);
}

function updateTimer() {
    updateSettings();
    exercise = 0;
    timer = timeConstants[exercise];
}

function displayTime() {
    
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    timer--;
    
    if (timer < 0) {
        if (++exercise < timeConstants.length) {
            console.log(exercise);
            console.log(timeConstants.length);
            timer = timeConstants[exercise];
        } else {
            if (++cycle <= cycleCount) {
                resetCycle();        
            } else {
                resetAll();
                stopTimer();
            }
        }
    }

}

function resetAll() {
    resetCycle();
    cycle = 1;
}

function resetCycle() {
    exercise = 0;
    timer = timeConstants[exercise]; 
}

function updateSettings() {
    var pauseValue = document.querySelector('#pauseTime');
    console.log(pauseValue.valueAsNumber);
    pauseTime = pauseValue.valueAsNumber;

    var cycleValue = document.querySelector('#cycleCount');
    console.log(cycleValue.valueAsNumber);
    cycleCount = cycleValue.valueAsNumber;

    timeConstants = [];
    var container = document.getElementById("fieldsContainer");
    var times = container.getElementsByClassName("exerciseTime");
    for (var i = 0; i < times.length; i++) {
        timeConstants.push(times[i].valueAsNumber);
    }

    console.log(timeConstants);
}

window.onload = function () {
    addField();
    
    updateSettings();

    resetAll();
}

function addField() {
    var container = document.getElementById("fieldsContainer");
    var size = container.childElementCount;
    var div = container.appendChild(document.createElement("div"));
    div.className = "exercise";
    div.innerHTML = ++size + ":";
    
    var input = document.createElement("input");
    input.type = "text";
    input.value = "Exercise " + size;
    input.id = "exerciseDescription"
    div.appendChild(input);
    
    var input = document.createElement("input");
    input.type = "number";
    input.className = "exerciseTime"
    input.value = 15;
    input.min = 1;
    input.max = 65532;
    div.appendChild(input);
}

function removeField() {
    var container = document.getElementById("fieldsContainer");
    var size = container.childElementCount;
    if (size > 1) {
        container.removeChild(container.lastChild);
    }
}