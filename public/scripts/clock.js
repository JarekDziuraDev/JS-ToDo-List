export class Clock {
    constructor (element) { 
        //this.hour = hour;
        //this.minutes = minutes;
        this.element = element;
    }

    update() {
        const parts = this.getTimeParts();
        const hourFormatedd = parts.hour.toString().padStart(2, "0");
        const minutesFormatedd = parts.minutes.toString().padStart(2, "0");

        this.element.innerText = hourFormatedd + ':' + minutesFormatedd;
        return this.element;
    }
    
    getTimeParts() {
        const now = new Date();

        return {
            hour: now.getHours(),
            minutes: now.getMinutes()
        };
    }
}


export const setTimeMinutesInc = (clockMinutes) => {
    let minutes = clockMinutes.dataset.minutes;
    if (minutes < 59) {
        minutes++;
    }
    clockMinutes.innerText = "M:" + minutes;
    clockMinutes.setAttribute('data-minutes', minutes);
    
    return clockMinutes;
}

export const setTimeMinutesDec = (clockMinutes) => {
    let minutes = clockMinutes.dataset.minutes;
    let actualMinutes = new Date().getMinutes();
    
    if (minutes > actualMinutes || minutes === 0) {
        minutes--;
    }
    clockMinutes.innerText = "M:" + minutes;
    clockMinutes.setAttribute('data-minutes', minutes);
    return clockMinutes;
}

export const setTimeHourInc = (clockHour) => {    
    let hour = clockHour.dataset.hour;
    if (hour < 23) {
        hour++;
    }
    clockHour.innerText = "H:" + hour;
    clockHour.setAttribute('data-hour', hour);
    return clockHour;
}

export const setTimeHourDec = (clockHour) => {
    let hour = clockHour.dataset.hour;
    let actualHour = new Date().getHours();
    if (hour > actualHour || hour === 0) {
        hour--;
    }
    clockHour.innerText = "H:" + hour;
    clockHour.setAttribute('data-hour', hour);

    

    return clockHour;
}

