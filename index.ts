const log = console.log.bind(console)

log("Starting Red Badger Robot Challenge...")

export enum Orientation {
  north,
  south,
  east,
  west,
}

export const orientationNames = ['North', 'South', 'East', 'West']

enum Instruction {
  forward = "Forward",
  turnLeft = "TurnLeft",
  turnRight = "TurnRight",
}

class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Robot {
  position: Position;
  isAlive: boolean;
  orientation: Orientation
  identifier: string
  constructor(identifier: string, x: number, y: number, orientation: Orientation) {
    this.identifier = identifier
    this.position = new Position(x, y)
    this.orientation = orientation
    this.isAlive = true
    log(`Robot spawned at at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}. `)
  }

  handleInstruction(instruction: Instruction) {
    log(`Robot recieved instruction ${instruction}`)
    switch (instruction) { 
      case Instruction.forward: {
        this.move()
        break;
      }
      case Instruction.turnLeft: {
        // Clock math - stops us going to negative!
        if ( this.orientation === Orientation.north ) {
          this.orientation = Orientation.west
          break;
        }
        this.orientation++
        break;
      }
      case Instruction.turnRight: {
        // Clock math - stops us going to over 3!
        if ( this.orientation === Orientation.west ) {
          this.orientation = Orientation.north
          break;
        }
        this.orientation--
        break;
      }
    }
    log(`Robot is now at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}`)
  }

  move(){
    switch (this.orientation) {
      case Orientation.north: {
        this.position.y++  
        break;
      }
      case Orientation.south: {
        this.position.y--  
        break;
      }
      case Orientation.east: {
        this.position.x--  
        break;
      }
      case Orientation.west: {
        this.position.x++  
        break;
      }
    }
    // TODO check if out of world bounds 
  }
}

export class Mars {
  maxX: number
  maxY: number
  scentPositions: Position[]
  constructor(x: number, y: number, robots: Robot[]) {
    this.maxX = x
    this.maxY = y
    this.scentPositions = []
    log(`Starting game`)
    robots.forEach((robot) => {

    })
  }
}