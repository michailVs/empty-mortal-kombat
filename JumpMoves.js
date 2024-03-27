import { Move } from "./Moves.js";
import { MOVE_TYPES, PLAYER_BOTTOM, PLAYER_HEIGHT } from "./constants.js";

const DELTA_Y = 25

class JumpMove extends Move {
    start() {
        this.owner.height = PLAYER_HEIGHT / 2
        super.start()
    }

    action() {
        if (this.currentStep === 0) return
        if (this.currentStep === 1) {
            this.owner.y = PLAYER_BOTTOM - PLAYER_HEIGHT * 0.9
        } else if (this.currentStep < this.totalSteps / 2) {
            this.owner.y -= DELTA_Y
        } else {
            this.owner.y += DELTA_Y
        }
    }
}

export class Jump extends JumpMove {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.JUMP,
            stepDuration: 100
        })
    }
}
const DELTA_X = 23
export class ForwardJump extends JumpMove {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.FORWARD_JUMP,
            stepDuration: 100
        })
    }
    action() {
        super.action()
        this.owner.x += DELTA_X
    }
}
export class BackwardJump extends JumpMove {
    constructor(owner) {
        super({
            owner,
            type: MOVE_TYPES.BACKWARD_JUMP,
            stepDuration: 100
        })
    }
    action() {
        super.action()
        this.owner.x -= DELTA_X
    }
}