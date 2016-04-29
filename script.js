var timer, timerDescription, minutes, seconds;
var exercise, cycle;
var cycleCount;
var pauseTime;
var timeConstants;
var descriptions;
var interval;
var display = document.querySelector('#time');
var text = document.querySelector('#text');
var displayCycle = document.querySelector('#cycle');
var playTimer;
var nowIsPause;
var runner = document.querySelector('#runner');
var editor = document.querySelector('#editor');
var startStopButton = document.querySelector('#startStopButton');

function activateRunner() {
    updateTimer();
    startTimer();
    runner.style.display = ''
    editor.style.display = 'none';
}

function activateEditor() {
    stopTimer();
    runner.style.display = 'none'
    editor.style.display = '';
}

function startStopTimer() {
    if (playTimer) stopTimer();
    else startTimer();
}

function startTimer() {
    playTimer = true;
    interval = setInterval(displayTime, 1000);
    startStopButton.text = 'Stop';
}

function stopTimer() {
    playTimer = false;
    if (interval != null) clearInterval(interval);
    startStopButton.text = 'Start';
}

function updateTimer() {
    updateSettings();
    resetAll();
}

function displayTime() {
    if (timer < 0) {
        if (!nowIsPause) {
            makePause();
        } else {
            nowIsPause = false;

            if (++exercise < timeConstants.length) {
                resetExercise(exercise);
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

    updateTime();

    timer--;
}

function updateTime() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
}

function resetAll() {
    cycle = 1;
    nowIsPause = false;
    resetCycle();
    updateTime();
}

function resetCycle() {
    exercise = 0;
    updateCycleText(cycle);
    resetExercise(exercise);
}

function updateCycleText(cycleText) {
    displayCycle.textContent = "Cycle " + cycleText;
}

function resetExercise(exerciseNumber) {
    timer = timeConstants[exerciseNumber];
    timerDescription = descriptions[exerciseNumber];
    updateText(descriptions[exerciseNumber]);
}

function updateText(selectedText) {
    text.textContent = selectedText;
}

function makePause() {
    nowIsPause = true;
    timer = pauseTime;
    if (pauseTime == 0) return;
    updateText("Make pause, bro");
}


function updateSettings() {
    var pauseValue = document.querySelector('#pauseTime');
    pauseTime = pauseValue.valueAsNumber;

    var cycleValue = document.querySelector('#cycleCount');
    cycleCount = cycleValue.valueAsNumber;

    timeConstants = [];
    descriptions = [];
    var container = document.getElementById("fieldsContainer");
    var times = container.getElementsByClassName("exerciseTime");
    for (var i = 0; i < times.length; i++) {
        timeConstants.push(times[i].valueAsNumber);
    }

    var timesDesc = container.getElementsByClassName("exerciseDescription");
    for (var i = 0; i < timesDesc.length; i++) {
        descriptions.push(timesDesc[i].value);
    }
}

window.onload = function () {
    playTimer = false;

    addField();
    
    updateSettings();

    resetAll();

    activateEditor();
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
    input.className = "exerciseDescription"
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