import * as sounds from './sounds.js'
import * as el from './elements.js'
import appState from './state.js'

export function handleTimerControllerClick(btnClicked) {
    if (btnClicked === 'playBtn' && !appState.isRunning) {
        appState.isRunning = true;
        handleCountdownStatus();
    }
    if (btnClicked === 'pauseBtn' && appState.isRunning) {
        appState.isRunning = false;
        handleCountdownStatus();
    }
}

function updateCountdownOnInterface() {
    minutes.textContent = appState.minutes.toString().padStart(2, '0')
    seconds.textContent = appState.seconds.toString().padStart(2, '0')
    document.title = `FocusTime: ${minutes.textContent}:${seconds.textContent}`
}

function handleCountdownStatus() {
    sounds.playSound('../../assets/audios/button-press.wav');

    if (appState.isRunning) countdown(appState.totalTimeInSeconds);
    else clearInterval(appState.countdownId)
}

function countdown() {
    appState.countdownId = setInterval(() => {
        if (appState.totalTimeInSeconds <= 0) {
            sounds.playSound('../../assets/audios/kitchen-timer.mp3');
            if (appState.soundPlaying) {
                appState.soundPlaying.pause();
            }

            clearInterval(appState.countdownId);
            resetTimerToDefault();
            return;
        }

        appState.minutes = Math.floor(appState.totalTimeInSeconds / 60);
        appState.seconds = Math.floor(appState.totalTimeInSeconds % 60);
        appState.totalTimeInSeconds--;

        updateCountdownOnInterface();
    }, 1000);
}

function resetTimerToDefault() {
    appState.minutes = 25;
    appState.seconds = 0;
    appState.totalTimeInSeconds = 25 * 60;
    appState.isRunning = false;
    appState.soundPlaying = null;
    appState.countdownId = null;

    el.allSoundBtn.forEach(btn => btn.classList.remove('active'))
    updateCountdownOnInterface();
}

export function handleOperatorButtonClicked(btnId) {
    const increment = 5, decrement = -5, maxMinutes = 60, minMinutes = 0;

    if (btnId === 'plus' && appState.minutes + increment > maxMinutes) return;
    if (btnId === 'minus' && appState.minutes + decrement <= minMinutes) return;

    const change = btnId === 'plus' ? increment : decrement;

    appState.minutes += change;
    appState.totalTimeInSeconds += change * 60;

    updateCountdownOnInterface();
}

