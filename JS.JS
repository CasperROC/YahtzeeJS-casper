let selectedDice = [];
let countOnes = 0;
let countTwos = 0;
let countThrees = 0;
let countFours = 0;
let countFives = 0;
let countSixes = 0;
let totalPoints = 0;
let canRoll = true;
let rolls = 3;
let diceLeft = 5;
let chances = 13;


document.getElementById('btn').addEventListener('click', function () {
    if (rolls > 1) {
        rolls--;
        this.disabled = false;
    } else {
        rolls--;
        this.disabled = true;
    }

    document.getElementById('rollNumber').textContent = rolls;

    diceContainer.innerHTML = "";
    let diceValues = [];

    for (let i = 0; i < diceLeft; i++) {

        let value = Math.floor(Math.random() * 6) + 1;
        diceValues.push(value);
        let die = document.createElement("button");
        die.classList.add("dice");
        die.textContent = value;

        die.addEventListener('click', function () {
            if (selectedDice.length < 5) {
                selectedDice.push(value);
                console.log(selectedDice);
                heldDice.textContent = selectedDice.join(", ");
                this.disabled = true;
                diceLeft--;
            }

        });

        diceContainer.appendChild(die);
    }

})

function gameover() {
    if (chances == 0) {
        document.getElementById('total').textContent = "final score = " + totalPoints;
        document.getElementById('chanceDisplay').textContent = "No more attemps left.";
        document.getElementById('btn').disabled = true;
        document.getElementById('scoreNothing').disabled = true;
    }
}

function scoreEffects(idLinkAll) {
    document.getElementById('total').textContent = "total = " + totalPoints;
    document.getElementById(idLinkAll).style.background = "red";
    document.getElementById(idLinkAll).style.color = "black";
    this.disabled = true;
    rolls = 3;
    diceLeft = 5;
    chances -= 1;
    gameover();
    document.getElementById('rollNumber').textContent = rolls;
    document.getElementById('chanceDisplay').textContent = chances + " attemp(s) left";
    selectedDice = [];
    document.getElementById("btn").disabled = false;
    heldDice.textContent = "";
    diceContainer.innerHTML = "";
}

function scoreTop(idLink, count, numbo) {
    document.getElementById(idLink).addEventListener('click', function () {
        count = selectedDice.filter(num => num === numbo).length * numbo;
        document.getElementById('result').textContent = count + " points";
        totalPoints += count;
        scoreEffects(idLink);
    })
}

scoreTop("ones", countOnes, 1);
scoreTop("twos", countTwos, 2);
scoreTop("threes", countThrees, 3);
scoreTop("fours", countFours, 4);
scoreTop("fives", countFives, 5);
scoreTop("sixes", countSixes, 6);

function ofaKind(idlink2, numbo2) {
    document.getElementById(idlink2).addEventListener('click', function () {
        if ([1, 2, 3, 4, 5, 6].some(num => selectedDice.filter(die => die === num).length === numbo2)) {
            let totalz = selectedDice.reduce((sum, die) => sum + die, 0);
            document.getElementById('result').textContent = totalz + " points";
            totalPoints += totalz;
            scoreEffects(idlink2);
        }
    })

}
ofaKind('3oak', 3);
ofaKind('4oak', 4);

document.getElementById('yht').addEventListener('click', function () {
    if ([1, 2, 3, 4, 5, 6].some(num => selectedDice.filter(die => die === num).length === 5)) {
        document.getElementById('result').textContent = "50 points";
        totalPoints += 50;
        scoreEffects('yht');
    }
})

document.getElementById('fh').addEventListener('click', function () {
    let FHcounter = {};
    selectedDice.forEach(die => FHcounter[die] = (FHcounter[die] || 0) + 1);
    let FHvalues = Object.values(FHcounter);
    if (FHvalues.includes(3) && FHvalues.includes(2)) {
        document.getElementById('result').textContent = "25 points";
        totalPoints += 25;
        scoreEffects('fh');
    }
})

document.getElementById('sms').addEventListener('click', function () {
    if ((selectedDice.includes(1) && selectedDice.includes(2) && selectedDice.includes(3) && selectedDice.includes(4)) ||
        (selectedDice.includes(2) && selectedDice.includes(3) && selectedDice.includes(4) && selectedDice.includes(5)) ||
        (selectedDice.includes(3) && selectedDice.includes(4) && selectedDice.includes(5) && selectedDice.includes(6))) {
        document.getElementById('result').textContent = "30 points";
        totalPoints += 30;
        scoreEffects('sms');
    }
})

document.getElementById('lgs').addEventListener('click', function () {
    if (selectedDice.includes(1) && selectedDice.includes(2) && selectedDice.includes(3) && selectedDice.includes(4) && selectedDice.includes(5) ||
        selectedDice.includes(2) && selectedDice.includes(3) && selectedDice.includes(4) && selectedDice.includes(5) && selectedDice.includes(6)) {
        document.getElementById('result').textContent = "40 points";
        totalPoints += 40;
        scoreEffects('lgs');
    }
})


document.getElementById('scoreNothing').addEventListener('click', function () {
    rolls = 3;
    diceLeft = 5;
    chances -= 1;
    gameover();
    document.getElementById("btn").disabled = false;
    document.getElementById('rollNumber').textContent = rolls;
    document.getElementById('chanceDisplay').textContent = chances + " attemp(s) left";
    selectedDice = [];
    heldDice.textContent = "";
    diceContainer.innerHTML = "";
})





