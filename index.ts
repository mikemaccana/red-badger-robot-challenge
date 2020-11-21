const log = console.log.bind(console);

log("Starting Red Badger Robot Challenge...");

export enum Orientation {
  north,
  east,
  south,
  west,
}

export const orientationNames = ["North", "East", "South", "West"];

export enum Instruction {
  forward = "Forward",
  turnLeft = "TurnLeft",
  turnRight = "TurnRight",
}

class Position {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  toString(){
    return `${this.x} ${this.y}`
  }
}

export function inRange(num: number, minimum: number, maximum: number) {
  return (num >= minimum && num <= maximum) 
}

export class Robot {
  position: Position;
  isAlive: boolean;
  orientation: Orientation;
  constructor(x: number, y: number, orientation: Orientation) {
    this.position = new Position(x, y);
    this.orientation = orientation;
    this.isAlive = true;
    log(`Robot spawned at at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}. `);
  }

  handleInstruction(instruction: Instruction) {
    log(`Robot recieved instruction ${instruction}`);
    switch (instruction) {
      case Instruction.forward: {
        this.move();
        break;
      }
      case Instruction.turnLeft: {
        // Clock math - stops us going to negative!
        if (this.orientation === Orientation.north) {
          this.orientation = Orientation.west;
          break;
        }
        this.orientation--
        break;
      }
      case Instruction.turnRight: {
        // Clock math - stops us going to over 3!
        if (this.orientation === Orientation.west) {
          this.orientation = Orientation.north;
          break;
        }
        this.orientation++;
        break;
      }
    }
    log(`Robot is now at ${this.position.x}, ${this.position.y} facing ${orientationNames[this.orientation]}`);
  }

  private move() {
    switch (this.orientation) {
      case Orientation.north: {
        // TODO: check for scent
        this.position.y++;
        break;
      }
      case Orientation.south: {
        this.position.y--;
        break;
      }
      case Orientation.east: {
        this.position.x++;
        break;
      }
      case Orientation.west: {
        this.position.x--;
        break;
      }
    }
  }
}

export class Mars {
  maxX: number;
  maxY: number;
  scentPositions: Position[];
  robots: Robot[];
  constructor(x: number, y: number) {
    this.maxX = x;
    this.maxY = y;
    this.scentPositions = [];
    this.robots = [];
  }
  addRobot(robot: Robot) {
    this.robots.push(robot);
  }
  isOnPlanet(position: Position) {
    return ( inRange(position.x, 0, this.maxX) && inRange(position.y, 0, this.maxY) ) 
  }
  moveRobot(index: number, instructions: Instruction[]) {
    const robot = this.robots[index]
    let moveCount = 0
    for (let instruction of instructions) {
      const previousPosition = new Position(robot.position.x, robot.position.y);
      log(`\nMove ${moveCount}`)
      moveCount++
      robot.handleInstruction(instruction)
      const newPosition = robot.position
      // If out of world bounds, the previous position stinks
      log(`IS ON PLANET`)
      if ( ! this.isOnPlanet(robot.position) ) {
        log(`Robot fell off world at ${newPosition}`)
        robot.isAlive = false
        log(`Saving scent at ${previousPosition}`)
        robot.position = previousPosition
        this.scentPositions.push(previousPosition)
        break;
      }      
    };
    
    log(`Robots final position is ${robot.position} ${robot.orientation}`)
  }
}

