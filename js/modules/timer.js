function timer() {

    const deadline = '2023-11-01';

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60), 
        seconds = Math.floor((t / 1000) % 60);
    }   
        return {t, days, hours, minutes, seconds};
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimeRemaining() {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timerId = setInterval(updateTimer, 1000);
        
        function updateTimer() {
            const  date = getTimeRemaining(deadline);

            days.textContent = getZero(date.days);
            hours.textContent = getZero(date.hours);
            minutes.textContent = getZero(date.minutes);
            seconds.textContent = getZero(date.seconds);

            if (date.t <= 0) {
                clearInterval(timerId);
            }
        }

        updateTimer();
        
    }

    setTimeRemaining();

}

export default timer;