import { fighters, weapons, robot } from "./data.js";

const startBtn = document.getElementById("start");
const title = document.getElementById("title");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const winnersList = document.getElementById("winners");
const phase1Btn = document.getElementById("phase1");
const phase2Btn = document.getElementById("phase2");
const phase3Btn = document.getElementById("phase3");
const phase4Btn = document.getElementById("phase4");
const phasesBtns = document.querySelectorAll(".phases");

let tempFighters;
let tempWeapons;

function disableAllButOneBtn(phase) {
    phasesBtns.forEach(btn => {
        if (btn.id === phase) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    })
}

startBtn.addEventListener("click", () => {
    startGame(fighters, weapons);
    disableAllButOneBtn("phase1");
    startBtn.innerText = "RESTART";
})

phase1Btn.addEventListener("click", () => {
    weaponsChoice(tempFighters, tempWeapons);
    disableAllButOneBtn("phase2");
})

phase2Btn.addEventListener("click", () => {
    training(tempFighters);
    disableAllButOneBtn("phase3");
})

phase3Btn.addEventListener("click", () => {
    qualification(tempFighters);
    disableAllButOneBtn("phase4")
})

phase4Btn.addEventListener("click", () => {
    fighting(tempFighters);
    disableAllButOneBtn("");
})

// START
function startGame(fightersArr, wepaonsArr) {
    tempFighters = JSON.parse(JSON.stringify(fightersArr));
    tempWeapons = JSON.parse(JSON.stringify(wepaonsArr));
    console.log(`Ecco i partecipanti al torneo Boolkaichi:`);
    title.innerHTML = "";
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    winnersList.innerHTML = "";
    title.innerHTML += "<h3>Ecco i partecipanti al torneo Boolkaichi: </h3>";

    tableHead.innerHTML += `<th>Nome</th><th>Potere</th>`
    fightersArr.forEach(fighter => {
        tableBody.innerHTML += `<td>${fighter.name}</td><td>${fighter.power}</td>`
    })
    console.log(tempFighters);
}

// Fase 1 - 🔥 Scelta dell'Arma: ogni combattente sceglierà casualmente un'arma dalla relativa lista. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.
function weaponsChoice(fightersArr, weaponsArr) {
    console.log("I combattenti scelgono un'arma!");
    tournament.innerHTML = "";
    tournament.innerHTML += "<h3>Ogni combattente sceglie un'arma: </h3>";
    fightersArr.forEach(fighter => {
        const randomIndex = Math.floor(Math.random() * weaponsArr.length);
        const randomWeapon = weaponsArr[randomIndex];
        fighter.weapon = randomWeapon.name;
        fighter.power += randomWeapon.power;
        weaponsArr.splice(randomIndex, 1);
        console.log(`${fighter.name} sceglie ${fighter.weapon} portando il suo potere a ${fighter.power}!`)
        tournament.innerHTML += `<li>${fighter.name} sceglie ${fighter.weapon} portando il suo potere a ${fighter.power}!</li>`;
    });
    console.log(fightersArr);
}

// Fase 2 - 💪 Allenamento: ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.
function training(fightersArr) {
    console.log("I combattenti si allenano!");
    tournament.innerHTML = "";
    tournament.innerHTML += "<h3>I combattenti si allenano: </h3>";
    fightersArr.forEach(fighter => {
        fighter.power *= Math.floor(Math.random() * 101);
        console.log(`La potenza di ${fighter.name} arriva a ${fighter.power}!`)
        tournament.innerHTML += `<li>La potenza di ${fighter.name} arriva a ${fighter.power}!</li>`;
    })
}

// Fase 3 -  🎯 Qualificazione: escludiamo dal torneo chi, dopo l'allenamento non è riuscito a raggiungere una potenza di almeno 2000.
function qualification(fightersArr) {
    console.log("I combattenti che non hanno raggiunto una potenza di 2000 sono stati esclusi, ecco quindi la lista finale: ")
    tournament.innerHTML = "";
    tournament.innerHTML += "<h3>I combattenti che non hanno raggiunto una potenza di 2000 sono stati esclusi, ecco quindi la lista finale: </h3>";
    fightersArr = fightersArr.filter(fighter => fighter.power > 2000);
    if (fightersArr.length % 2 != 0) fightersArr.push(robot);
    console.log(fightersArr);
    fightersArr.forEach(fighter => tournament.innerHTML += `<li>${fighter.name}, potere: ${fighter.power}</li>`);
}

// Fase 4 - ⚔️ Combattimento: i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta. 
function fighting(fightersArr) {
    let winners = [];
    console.log("I combattenti si sfidano!");
    tournament.innerHTML = "";
    tournament.innerHTML += "<h3>I combattenti si sfidano: </h3>";
    for (let i = 0; i < fightersArr.length - 1; i = i + 2) {
        console.log(`${fightersArr[i].name} e ${fightersArr[i + 1].name} si sfidano!`);
        if ((fightersArr[i].power > fightersArr[i + 1].power) || fightersArr[i].power === fightersArr[i + 1].power) {
            console.log(`Vince ${fightersArr[i].name}!`);
            tournament.innerHTML += `<li>${fightersArr[i].name} e ${fightersArr[i + 1].name} si sfidano! <str>Vince ${fightersArr[i].name}!</str></li>`
            winners.push(fightersArr[i]);
        } else if (fightersArr[i].power < fightersArr[i + 1].power) {
            console.log(`Vince ${fightersArr[i + 1].name}!`);
            tournament.innerHTML += `<li>${fightersArr[i].name} e ${fightersArr[i + 1].name} si sfidano! <str>Vince ${fightersArr[i + 1].name}!</str></li>`
            winners.push(fightersArr[i + 1]);
        }
    }

    console.log(winners)
    winners.sort((a, b) => b.power - a.power)
    winners = winners.filter((winner, index) => index < 3);
    winnersList.innerHTML += "<h3>I vincitori del torneo sono: </h3>"
    winners.forEach(winner => {
        winnersList.innerHTML += `<li>${winner.name}</li>`
    })
}






