var startBtn = document.querySelector('.access-button');
var noOfPatrolPumps = 5;
function generatePetrolPumps() {
    var petrolPumps = new Set();
    while (petrolPumps.size !== 5) {
        petrolPumps.add(Math.floor(Math.random() * 100) + 1);
    }
    petrolPumps = Array.from(petrolPumps).sort();
    return petrolPumps;
}

function generateLogResult(logMessage, result) {
    var heading = $("<h1>Journey started !!</h1>")
    $('.log').append(heading);
    $('.log').append(logMessage.join('\n'));
    if (result === true) {
        $('.log').append("<h1>Wohhaa!!! You Won...</h1>");
    }
    else {
        $('.log').append("<h1>Game Over! Better Luck Next Time...</h1>")
    }
}
function startCar(petrolPumps) {
    var petrol = 30;
    var distance = 0;
    var remainingDistance = 100;
    var logMessage = [];
    var step = 1;
    var result = false;
    while (petrol > 0) {
        var currentSpeed = Math.floor(Math.random() * 6) + 1;
        if (distance + currentSpeed >= 100 && petrol >= remainingDistance) {
            logMessage.push("<li>Move " + step + " - Car at " + 100 + ", petrol remaining " + (petrol - remainingDistance) + " -reached.</li>")
            result = true;
            return { logMessage, result };
        }
        else if (distance + currentSpeed >= 100 && petrol < remainingDistance) {
            logMessage.push("<li>Move " + step + " - Car at " + (distance + petrol) + ", petrol remaining " + 0 + "</li>")
            result = false;
            return { logMessage, result }
        }
        else {
            distance = distance + currentSpeed;
            remainingDistance = 100 - distance;
            if (petrolPumps.indexOf(distance) !== -1) {
                petrol = petrol + 20;
            }
            petrol = petrol - currentSpeed;
            logMessage.push("<li>Move " + step + " - Car at " + distance + ", petrol remaining " + petrol + "</li>");
            console.log("Move " + step + " - Car at " + distance + ", petrol remaining " + petrol);
            step++;
        }
    }
    if (distance >= 100) {
        result = true;
    }
    return { logMessage, result };
}
function startGame() {
    if (startBtn.value === 'start') {
        $('.log').html(" ");
        startBtn.classList.toggle('btnToggler');
        startBtn.innerHTML = "Stop Car";
        startBtn.value = 'end';
        var petrolPumps = generatePetrolPumps();
        var { logMessage, result } = startCar(petrolPumps);
        generateLogResult(logMessage, result);
    }
    else {
        $('.log').html(" ");
        startBtn.classList.toggle('btnToggler');
        startBtn.innerHTML = "Start Car";
        startBtn.value = 'start';
    }
    //console.log('game started.')

}
startBtn.onclick = startGame;
