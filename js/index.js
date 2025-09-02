import { fighters, weapons } from "./data.js";

console.log(`Ecco i partecipanti al torneo Boolkaichi:`);
console.log(fighters);

// Fase 1 - 🔥 Scelta dell'Arma: ogni combattente sceglierà casualmente un'arma dalla relativa lista. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.
function weaponsChoice(fighters, weapons) {
    fighters.forEach(fighter => {
       const randomIndex = Math.floor(Math.random() * weapons.length); 
       const randomWeapon = weapons[randomIndex];
       fighter.weapon = randomWeapon.name;
       fighter.power += randomWeapon.power;
       weapons.splice(randomIndex, 1);
       console.log(`${fighter.name} sceglie ${fighter.weapon} portando il suo potere a ${fighter.power}!`)
    });
}

weaponsChoice(fighters, weapons)