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
function generatePetrolLog(petrolPumps) {
    var petrolLog = [];
    for (i = 0; i < petrolPumps.length; i++) {
        petrolLog.push('<span class="petrol">' + petrolPumps[i] + '</span>')
    }
    return petrolLog;
}

function generateLogResult(petrolPumps, logMessage, result) {
    var heading = $("<h1>Journey started !!!</h1><h3 class='text-center text-white'><i class='fa fa-gas-pump'></i> Petrol Pumps</h3>")
    $('.log').append(heading);
    var petrolLog = generatePetrolLog(petrolPumps);
    $('.log').append(petrolLog.join('\n'));

    $('.log').append(logMessage.join('\n'));
    if (result === true) {
        $('.log').append("<h1>Wohhaa!!! You Won...</h1>");
    }
    else {
        $('.log').append("<h1>Game Over! Bad Luck...</h1>")
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
            logMessage.push("<li><i class='fas fa-running'></i> Move " + step + " - Car at " + 100 + ", petrol remaining " + (petrol - remainingDistance) + " </li>")
            result = true;
            return { logMessage, result };
        }
        else if (petrol < currentSpeed) {
            logMessage.push("<li><i class='fas fa-running'></i> Move " + step + " - Car at " + (distance + petrol) + ", petrol remaining " + 0 + " </li>")
            result = false;
            return { logMessage, result };
        }
        else {
            distance = distance + currentSpeed;
            remainingDistance = 100 - distance;
            if (petrolPumps.indexOf(distance) !== -1) {
                petrol = petrol + 20;
            }
            petrol = petrol - currentSpeed;
            var randomColor = '#7F' + Math.floor(Math.random() * 16777215).toString(16);
            logMessage.push('<li style="background-color:' + randomColor + ';"><i class="fas fa-running"></i> Move ' + step + ' - Car at ' + distance + ', petrol remaining ' + petrol + '</li>');
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
        startBtn.innerHTML = "<i class='fa fa-times-circle'></i> Exit";
        startBtn.value = 'end';
        var petrolPumps = generatePetrolPumps();
        var { logMessage, result } = startCar(petrolPumps);
        generateLogResult(petrolPumps, logMessage, result);
    }
    else {
        $('.log').html("<h3><i class='fas fa-arrow-alt-circle-up'></i> Press ! <i class='fas fa-arrow-alt-circle-up'></i></h3>");
        startBtn.classList.toggle('btnToggler');
        startBtn.innerHTML = "<i class='fa fa-car'></i> Start Car";
        startBtn.value = 'start';
    }
    //console.log('game started.')

}
startBtn.onclick = startGame;
/*
    <i class="fa fa-car text-primary"></i><i
            class="fa fa-car text-warning"></i><i class="fa fa-car text-success"></i> Crazy
        Car <i class="fa fa-car text-success"></i><i class="fa fa-car text-warning"></i><i
            class="fa fa-car text-primary"></i>
*/