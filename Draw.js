import { ARENA, MOVE_TYPES, ORIENTATIONS } from "./constants.js";

export function draw(fighter1, fighter2, context, resourceManager) {
    context.clearRect(0, 0, ARENA.WIDTH, ARENA.HEIGHT)
    drawFighter(fighter1, context, resourceManager)
    drawFighter(fighter2, context, resourceManager)
    
    // for dev
    // context.strokeStyle = 'green'
    // context.strokeRect(fighter1.x - fighter1.width / 2, fighter1.y - fighter1.height, fighter1.width, fighter1.height)
    // context.strokeRect(fighter2.x - fighter2.width / 2, fighter2.y - fighter2.height, fighter2.width, fighter2.height)
    // context.strokeStyle = 'red'
    // fighter1.damage && context.strokeRect(
    //     fighter1.currentMove.damageX - fighter1.currentMove.damageWidth / 2,
    //     fighter1.currentMove.damageY - fighter1.currentMove.damageHeight,
    //     fighter1.currentMove.damageWidth,
    //     fighter1.currentMove.damageHeight
    // )
    // fighter2.damage && context.strokeRect(
    //     fighter2.currentMove.damageX - fighter2.currentMove.damageWidth / 2,
    //     fighter2.currentMove.damageY - fighter2.currentMove.damageHeight,
    //     fighter2.currentMove.damageWidth,
    //     fighter2.currentMove.damageHeight
    // )
}

function drawFighter(fighter, context, resourceManager) {
    const url = `./images/fighters/${fighter.name}/${fighter.orientation}/${fighter.moveType}/${fighter.currentMove.currentStep}.png`
    const currentImage = resourceManager.getImage(url)
    currentImage.src = url
    let x = fighter.orientation === ORIENTATIONS.LEFT 
        ? calculateXForLeftAlign(fighter, currentImage) 
        : calculateXForRightAlign(fighter, currentImage)
    
    if (fighter.moveType === MOVE_TYPES.FALL) {
        x = fighter.orientation === ORIENTATIONS.LEFT 
            ? calculateXForRightAlign(fighter, currentImage) 
            : calculateXForLeftAlign(fighter, currentImage)
    }

    if (fighter.moveType === MOVE_TYPES.WIN) {
        x = calculateXForCenterAlign(fighter, currentImage)
    }

    const y = fighter.y - currentImage.height
    context.drawImage(currentImage, x, y)
}

function calculateXForLeftAlign(fighter, currentImage) {
    return fighter.x - fighter.width / 2
}

function calculateXForRightAlign(fighter, currentImage) {
    return fighter.x + fighter.width / 2 - currentImage.width
}

function calculateXForCenterAlign(fighter, currentImage) {
    return fighter.x - currentImage.width / 2
}