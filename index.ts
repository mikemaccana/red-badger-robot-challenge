const log = console.log.bind(console)

log("Starting Red Badger Robot Challenge...")

enum Orientation {
  north,
  south,
  east,
  west,
}

const directionNames = ['North', 'South', 'East', 'West']

enum Instruction {
  forward = "Forward",
  turnLeft = "TurnLeft",
  turnRight = "TurnRight",
}
class Robot {
  x: number;
  y: number;
  isAlive: true;
  orientation: Orientation
  constructor(x: number, y: number, orientation: Orientation) {
    this.x = x
    this.y = y
    this.orientation = orientation
    this.isAlive = true
  }

  handleInstruction(instruction: Instruction) {
    log(`Robot was at ${this.x}, ${this.x} facing ${directionNames[this.orientation]}. Recieved instruction ${instruction}`)
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
    log(`Robot is now at ${this.x}, ${this.x} facing ${directionNames[this.orientation]}`)
  }

  move(){
    switch (this.orientation) {
      case Orientation.north: {
        this.y++  
        break;
      }
      case Orientation.south: {
        this.y--  
        break;
      }
      case Orientation.east: {
        this.x--  
        break;
      }
      case Orientation.west: {
        this.x++  
        break;
      }
    }
    // TODO check if out of world bounds 
  }
}