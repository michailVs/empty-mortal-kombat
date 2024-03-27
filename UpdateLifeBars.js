export function updateLifeBars(fighter1, fighter2) {
    document.querySelector('#player1Life').style.width = fighter1.life + '%'
    document.querySelector('#player2Life').style.width = fighter2.life + '%'
}