import { Attack } from "./Attacks.js";
import { MOVE_TYPES, PLAYER_BOTTOM, PLAYER_HEIGHT } from "./constants.js";

const DELTA_Y = 25
const DELTA_X = 23

class JumpAttack extends Attack {
    start(jumpCurrentStep, jumpTotalSteps) {
        this.owner.height = PLAYER_HEIGHT / 2
        this.jumpCurrentStep = jumpCurrentStep
        this.jumpTotalSteps = jumpTotalSteps
        super.start()
    }

    shouldStop() {
        return this.jumpCurrentStep >= this.jumpTotalSteps
    }

    action(deltaX) {
        super.action()
        if (this.jumpCurrentStep === 0) {
            this.owner.y = PLAYER_BOTTOM - PLAYER_HEIGHT * 0.9
        } else if (this.jumpCurrentStep < this.jumpTotalSteps / 2) {
            this.owner.y -= DELTA_Y
        } else {
            this.owner.y += DELTA_Y
        }

        this.owner.x += deltaX
        this.updateDamageRectangle()
    }

    calculateNextStep() {
        this.currentStep += 1
        if (this.currentStep >= this.totalSteps) {
            this.currentStep = this.totalSteps - 1
        }
        this.jumpCurrentStep += 1
    }
}

export class ForwardJumpKick extends JumpAttack {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.FORWARD_JUMP_KICK,
            damage: 10,
            stepDuration: 80
        })
    }
    
    action() {
        super.action(DELTA_X)
    }
}

export class BackwardJumpKick extends JumpAttack {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.BACKWARD_JUMP_KICK,
            damage: 10,
            stepDuration: 80
        })
    }
    
    action() {
        super.action(-1 * DELTA_X)
    }
}

export class ForwardJumpPunch extends JumpAttack {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.FORWARD_JUMP_PUNCH,
            damage: 8,
            stepDuration: 80
        })
    }
    
    action() {
        super.action(DELTA_X)
    }
}

export class BackwardJumpPunch extends JumpAttack {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.BACKWARD_JUMP_PUNCH,
            damage: 8,
            stepDuration: 80
        })
    }
    
    action() {
        super.action(-1 * DELTA_X)
    }
}