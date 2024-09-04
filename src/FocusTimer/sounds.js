import appState from './state.js';

export function handleSounds(btnId) {
    if (appState.soundPlaying) {
        appState.soundPlaying.pause();

        if (appState.soundPlaying.src.includes(btnId)) {
            appState.soundPlaying = null;
            return;
        }
    }

    handleSoundPlaying(btnId);
}

/** 
    @param {string} soundSrc - Represents the source of the Sound
*/
export function playSound(soundSrc) {
    new Audio(`${soundSrc}`).play()
}

function handleSoundPlaying(btnId) {
    appState.soundPlaying = new Audio(`../assets/audios/${btnId}.wav`)
    appState.soundPlaying.loop = true;
    appState.soundPlaying.play();
}