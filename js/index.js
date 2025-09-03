import { fighters, weapons, robot } from "./data.js";

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
    startGame(fighters, weapons, robot)
});

function startGame(fighters, weapons, robot) {
    const tempFighters = JSON.parse(JSON.stringify(fighters));
    const tempWeapons = JSON.parse(JSON.stringify(weapons));

    console.log(`Ecco i partecipanti al torneo Boolkaichi:`);
    console.log(tempFighters);

    // Fase 1 - 🔥 Scelta dell'Arma: ogni combattente sceglierà casualmente un'arma dalla relativa lista. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.

    function weaponsChoice(tempFighters, tempWeapons) {
        console.log("I combattenti scelgono un'arma!");
        tempFighters.forEach(fighter => {
            const randomIndex = Math.floor(Math.random() * tempWeapons.length);
            const randomWeapon = tempWeapons[randomIndex];
            fighter.weapon = randomWeapon.name;
            fighter.power += randomWeapon.power;
            tempWeapons.splice(randomIndex, 1);
            console.log(`${fighter.name} sceglie ${fighter.weapon} portando il suo potere a ${fighter.power}!`)
        });
    }

    weaponsChoice(tempFighters, tempWeapons);

    // Fase 2 - 💪 Allenamento: ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.

    function training(tempFighters) {
        console.log("I combattenti si allenano!");
        tempFighters.forEach(fighter => {
            fighter.power *= Math.floor(Math.random() * 101);
            console.log(`La potenza di ${fighter.name} arriva a ${fighter.power}!`)
        })
    }

    training(tempFighters);

    // Fase 3 -  🎯 Qualificazione: escludiamo dal torneo chi, dopo l'allenamento non è riuscito a raggiungere una potenza di almeno 2000.
    console.log("I combattenti che non hanno raggiunto una potenza di 2000 sono stati esclusi, ecco quindi la lista finale: ")

    let qualifiedFighters = [];
    function filterWeakFighters(fighters) {
        qualifiedFighters = tempFighters.filter(fighter => fighter.power > 2000);
    }
    filterWeakFighters(tempFighters);

    console.log(qualifiedFighters);

    // Fase 4 - ⚔️ Combattimento: i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta. 
    console.log("I combattenti si sfidano!");
    const winners = [];
    function fightingPhase(qualifiedFighters) {
        if (qualifiedFighters.length % 2 != 0) qualifiedFighters.push(robot);

        for (let i = 0; i < qualifiedFighters.length - 1; i = i + 2) {
            console.log(`${qualifiedFighters[i].name} e ${qualifiedFighters[i + 1].name} si sfidano!`)
            if ((qualifiedFighters[i].power > qualifiedFighters[i + 1].power) || qualifiedFighters[i].power === qualifiedFighters[i + 1].power) {
                console.log(`Vince ${qualifiedFighters[i].name}!`);
                winners.push(qualifiedFighters[i]);
            } else if (qualifiedFighters[i].power < qualifiedFighters[i + 1].power) {
                console.log(`Vince ${qualifiedFighters[i + 1].name}!`);
                winners.push(qualifiedFighters[i + 1]);
            }
        }

        winners.sort((a, b) => b.power - a.power)
        return winners.filter((winner, index) => index < 3);
    }

    console.log(fightingPhase(qualifiedFighters))
}

