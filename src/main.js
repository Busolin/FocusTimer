const applicationState = {
    minutes: 25,
    seconds: 0,
    totalTimeInSeconds: 25 * 60,
    isRunning: false,
    soundPlaying: null,
    countdownId: null
}

// CONTROLLER FOR BUTTONS ON CLICK
const allSoundBtn = document.querySelectorAll('.sound-btn')

allSoundBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        handleSounds(btn.id)

        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            return;
        }


        allSoundBtn.forEach(btn => btn.classList.remove('active'))
        btn.classList.add('active');
    })
})

function handleSounds(btnId) {
    if (applicationState.soundPlaying) {
        if (applicationState.soundPlaying.src.includes(btnId)) {
            applicationState.soundPlaying.pause();
            applicationState.soundPlaying = null;
            return;
        }

        applicationState.soundPlaying.pause();
    }

    applicationState.soundPlaying = new Audio(`../assets/audios/${btnId}.wav`);
    applicationState.soundPlaying.loop = true;
    applicationState.soundPlaying.play();
}

// COUNTDOWN HANDLER

const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')

playBtn.addEventListener('click', () => handleTimerControllerClick('playBtn'))
pauseBtn.addEventListener('click', () => handleTimerControllerClick('pauseBtn'))

function handleTimerControllerClick(btnClicked) {
    if (btnClicked === 'playBtn' && !applicationState.isRunning) {
        applicationState.isRunning = true;
        handleCountdownStatus();
    }
    if (btnClicked === 'pauseBtn' && applicationState.isRunning) {
        applicationState.isRunning = false;
        handleCountdownStatus();
    }
}
function handleCountdownStatus() {
    new Audio('../assets/audios/button-press.wav').play()

    if (applicationState.isRunning) {
        applicationState.lastDateRegistered = new Date();
        countdown(applicationState.totalTimeInSeconds)
    }
    else clearInterval(applicationState.countdownId)
}

function countdown() {
    applicationState.countdownId = setInterval(() => {
        if (applicationState.totalTimeInSeconds < 0) {
            new Audio('../assets/audios/kitchen-timer.mp3').play();
            clearInterval(applicationState.countdownId);
            resetTimerToDefault();
            return;
        }

        applicationState.minutes = Math.floor(applicationState.totalTimeInSeconds / 60);
        applicationState.seconds = Math.floor(applicationState.totalTimeInSeconds % 60);
        applicationState.totalTimeInSeconds--;

        updateCountdownOnInterface();
    }, 1000);
}

function updateCountdownOnInterface() {
    minutes.textContent = applicationState.minutes.toString().padStart(2, '0')
    seconds.textContent = applicationState.seconds.toString().padStart(2, '0')
    document.title = `FocusTime: ${minutes.textContent}:${seconds.textContent}`
}

function resetTimerToDefault() {
    applicationState.minutes = 25;
    applicationState.seconds = 0;
    applicationState.totalTimeInSeconds = 25 * 60;
    applicationState.isRunning = false;
    applicationState.soundPlaying = null;
    applicationState.countdownId = null;
    updateCountdownOnInterface();
}