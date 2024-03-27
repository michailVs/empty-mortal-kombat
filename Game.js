import { checkAttacks } from './CheckAttacks.js'
import { checkLifes } from './CheckLifes.js'
import { draw } from './Draw.js'
import { Fighter } from './Fighters.js'
import { recalculatePosition } from './RecalculatePosition.js'
import { ResourceManager } from './ResourceManager.js'
import { setHoldMovements } from './SetHoldMovements.js'
import { setMovements } from './SetMovements.js'
import { updateLifeBars } from './UpdateLifeBars.js'
import { ARENA, IMAGE_COUNT_BY_MOVE_TYPE, MOVE_TYPES, ORIENTATIONS } from './constants.js'

export class Game {
    pressed = []
    fighters = []
    resourceManager = new ResourceManager()

    async init() {
        this.initCanvas()
        this.addHandlers()
        await this.inirializeFighters()
        this.animate()
    }

    initCanvas() {
        const canvas = document.querySelector('.canvas')
        canvas.width = ARENA.WIDTH
        canvas.height = ARENA.HEIGHT
        this.context = canvas.getContext('2d')
    }

    async inirializeFighters() {
        this.fighters[0] = new Fighter('subzero', ORIENTATIONS.LEFT)
        this.fighters[1] = new Fighter('kano', ORIENTATIONS.RIGHT)
        await this.loadFighterImages()
    }

    async loadFighterImages() {
        const urls = []
        for (let moveKey in MOVE_TYPES) {
            const moveType = MOVE_TYPES[moveKey]
            for (let i = 0; i < IMAGE_COUNT_BY_MOVE_TYPE[moveType]; i++) {
                urls.push(`./images/fighters/${this.fighters[0].name}/${ORIENTATIONS.LEFT}/${moveType}/${i}.png`)
                urls.push(`./images/fighters/${this.fighters[0].name}/${ORIENTATIONS.RIGHT}/${moveType}/${i}.png`)
                urls.push(`./images/fighters/${this.fighters[1].name}/${ORIENTATIONS.LEFT}/${moveType}/${i}.png`)
                urls.push(`./images/fighters/${this.fighters[1].name}/${ORIENTATIONS.RIGHT}/${moveType}/${i}.png`)
            }
        }

        await this.resourceManager.loadImages(urls)
    }

    addHandlers() {
        document.addEventListener('keydown', e => {
            e.preventDefault()
            if (e.code === 'F5') return location.reload()
            if (!this.pressed[e.code]) {
                this.pressed[e.code] = true
                setMovements(...this.fighters, this.pressed)
            }
        })
        document.addEventListener('keyup', e => {
            e.preventDefault()
            delete this.pressed[e.code]
            setMovements(...this.fighters, this.pressed)
        })
    }

    animate() {
        setHoldMovements(...this.fighters, this.pressed)
        recalculatePosition(...this.fighters)
        checkAttacks(...this.fighters)
        updateLifeBars(...this.fighters)
        checkLifes(...this.fighters)
        draw(...this.fighters, this.context, this.resourceManager)
        requestAnimationFrame(() => this.animate())
    }
}