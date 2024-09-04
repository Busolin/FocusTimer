import * as el from './elements.js'
import * as sounds from './sounds.js';
import { handleTimerControllerClick, handleOperatorButtonClicked } from './timer.js';

export function initiateEventListeners() {
    el.allSoundBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            sounds.handleSounds(btn.id);

            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                return;
            }


            el.allSoundBtn.forEach(btn => btn.classList.remove('active'))
            btn.classList.add('active');
        })
    })

    el.playBtn.addEventListener('click', () => handleTimerControllerClick('playBtn'))
    el.pauseBtn.addEventListener('click', () => handleTimerControllerClick('pauseBtn'))

    el.allOperatorsBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            handleOperatorButtonClicked(btn.id);
        })
    })

}
