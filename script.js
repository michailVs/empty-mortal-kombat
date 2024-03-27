import { Game } from "./Game.js";

async function startNewGame() {
    const game = new Game()
    await game.init()
    document.querySelector('.loading').style.display = 'none'
}
startNewGame()